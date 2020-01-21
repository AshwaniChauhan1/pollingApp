import router from "../router";
import axios from "axios";
const state = {
    form: { question: "", opt1: "" },
    poll: {},
    pollData: [],
    editIndex: "",
    optIndex: "",
    modalTitle: true,
    deleteOptModal: false,
    voteArr: [],
    voteObj: {},
    arrayToset: [],
    takeError: "",
    viewError: "",
    createError: "",
    createLoading: false,
    updateTitleLoading: false,
    deletePollLoading: false,
    deleteOptLoading: false,
    addOptLoading: false,
    modalError: "",
    modalShow: false,
    createOptions: [{ opt: "" }],
    option: {}
}

const actions = {
    routeTake() {
        router.push("/take")
    },
    routeCreate() {
        for (let i = 0; i < state.createOptions.length; i++) {
            state.createOptions[i].opt = "";
        }
        state.form = { question: "" };
        router.push("/create")
    },
    routeView() {
        router.push("/view")
    },
    index() {
        if (localStorage.token !== "") {
            router.push("/")
        }
    },
    addCreate_poll() {
        state.option = {
            opt: ""
        };
        state.createOptions.push(state.option);
    },
    deleteCreate_poll() {
        state.createOptions.pop();
    },
    async create_poll({ state }) {
        if (state.form.question === "") {
            state.createError = "*Fill Title";
        } else {
            for (let i = 0; i < state.createOptions.length; i++) {
                if (state.createOptions[i].opt === "") {
                    state.createError = "*Fill Option"
                }
                else {
                    state.createError = ""
                }
            }
            if (state.createError === "") {
                var concatOpt = ""
                for (let a = 0; a < state.createOptions.length; a++) {
                    if (a > 0) {
                        var apiOpt = "____" + state.createOptions[a].opt;
                    } else {
                        apiOpt = state.createOptions[a].opt
                    }
                    concatOpt = concatOpt.concat(apiOpt);
                }
                var addPollUrl = 'https://secure-refuge-14993.herokuapp.com/add_poll?title=' + state.form.question + ' &options=' + concatOpt
                state.createLoading = true;
                state.createError = "";
                await axios.post(addPollUrl).then(response => {
                    if (response.status === 200) {
                        router.push("/view");
                        state.form = { question: "" };
                        state.createError = "";
                        for (let i = 0; i < state.createOptions.length; i++) {
                            state.createOptions[i].opt = "";
                        }
                    }
                }).catch(function (error) {
                    state.createError = error;
                });
                state.createLoading = false;
            }

        }
    },
    getPoll() {
        axios
            .get("https://secure-refuge-14993.herokuapp.com/list_polls")
            .then(response => {
                state.pollData = response.data.data.reverse();
                state.takeError = "";
                state.viewError = "";
            })
            .catch(function (error) {
                state.takeError = error;
                state.viewError = error;
            });
    },
    async vote({ state }, payload) {
        let responseToSend = null
        let axiosConfig = {
            headers: {
                'access_token': localStorage.token
            }
        };
        await axios.post(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${state.pollData[payload.index]._id}&option_text=${state.pollData[payload.index].options[payload.optIndex].option}`, payload, axiosConfig).then(response => {
            if (response.status === 200) {
                state.voteObj = {
                    id: state.pollData[payload.index]._id,
                    title: state.pollData[payload.index].title
                };
                responseToSend = true
                if (localStorage.getItem('vote')) {
                    var arrayFromLocal = JSON.parse(localStorage.getItem('vote'));
                    arrayFromLocal.push(state.voteObj);
                    localStorage.setItem('vote', JSON.stringify(arrayFromLocal));
                } else {
                    state.arrayToset.push(state.voteObj);
                    localStorage.setItem('vote', JSON.stringify(state.arrayToset));
                }
                state.takeError = "";
            }
        }).catch(function (error) {
            responseToSend = false
            state.takeError = error;
        });
        return responseToSend
    },
    async delete_poll({ state, dispatch }, index) {
        state.deletePollLoading = true;
        await axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${state.pollData[index]._id}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.takeError = "";
            }
        }).catch(function (error) {
            state.takeError = error;
        });
        state.deletePollLoading = false;
    },
    async delete_opt({ state, dispatch }) {
        if (state.optIndex === "") {
            state.modalError = "*Select option"
        } else {
            state.deleteOptLoading = true;
            await axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.pollData[state.editIndex].options[state.optIndex].option}`).then(response => {
                if (response.status === 200) {
                    dispatch('getPoll');
                    state.takeError = "";
                    state.modalError = ""
                }
            }).catch(function (error) {
                state.takeError = error;
            });
            state.deleteOptLoading = false;
            state.optIndex = "";
        }
    },
    async updateTitle({ state, dispatch }) {
        if (state.form.question === "") {
            state.modalError = "* Title can't be empty"
        }
        else {
            state.updateTitleLoading = true;
            await axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${state.pollData[state.editIndex]._id}&title=${state.form.question}`).then(response => {
                if (response.status === 200) {
                    dispatch('getPoll');
                    state.form.question = "";
                    state.takeError = "";
                }
            }).catch(function (error) {
                state.takeError = error;
            });
            state.updateTitleLoading = false;
            state.modalShow = false;
        }
    },
    openModal_title({ state }, index) {
        state.modalTitle = true;
        state.form.question = state.pollData[index].title;
        state.editIndex = index;
        state.modalShow = true;
        state.modalError = "";
    },
    openModal_opt({ state }, index) {
        state.modalTitle = false;
        state.editIndex = index;
        state.modalShow = true;
        state.modalError = "";
    },
    openModal_deleteOpt({ state }, index) {
        state.deleteOptModal = true;
        state.editIndex = index;
        state.modalShow = true;
        state.modalError = "";
    },
    async add_option({ state, dispatch }) {
        if (state.form.opt1 === "") {
            state.modalError = "*Option cann't be empty"
            state.addOptLoading = false;
        } else {
            state.addOptLoading = true;
            await axios.post(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.form.opt1}`).then(response => {
                if (response.status === 200) {
                    dispatch('getPoll');
                    state.form.opt1 = "";
                    state.takeError = "";
                }
            }).catch(function (error) {
                state.takeError = error;
            });
            state.addOptLoading = false;
            state.modalShow = false;
        }
    },
    select_radio({ state }, optIndexs) {
        state.optIndex = optIndexs;
    },
    clear_modal({ state }, value) {
        state.form.question = "";
        state.form.opt1 = "";
        state.deleteOptModal = false;
        state.modalShow = value;
        state.modalError = "";
    },
    validEmail(email) {
        //eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

}


export default ({
    namespaced: true,
    state, actions
})