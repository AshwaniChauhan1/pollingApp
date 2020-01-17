import router from "../router";
import axios from "axios";
const state = {
    form: { question: "", opt1: "", opt2: "", opt3: "", opt4: "" },
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
}

const actions = {
    routeTake() {
        router.push("/take")
    },
    routeCreate() {
        state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
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
    create_poll() {
        if (state.form.question == "" || state.form.opt1 == "" || state.form.opt2 == "" || state.form.opt3 == "" || state.form.opt4 == "") {
            state.errors = "*Fill Required Details";
        } else {
            var payload = {
                title: state.form.question,
                opt1: state.form.opt1,
                opt2: state.form.opt2,
                opt3: state.form.opt3,
                opt4: state.form.opt4
            }
            state.createLoading = true;
            axios.post(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.opt1}____${payload.opt2}____${payload.opt3}____${payload.opt4}`, payload).then(response => {
                if (response.status === 200) {
                    router.push("/view");
                    state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
                    state.createError = "";
                    state.createLoading = false;
                }
            }).catch(function (error) {
                state.createError = error;
                state.createLoading = false;
            });
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
    delete_poll({ state, dispatch }, index) {
        state.deletePollLoading = true;
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${state.pollData[index]._id}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.takeError = "";
                state.deletePollLoading = false;
            }
        }).catch(function (error) {
            state.takeError = error;
            state.deletePollLoading = false;
        });
    },
    delete_opt({ state, dispatch }) {
        state.deleteOptLoading = true;
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.pollData[state.editIndex].options[state.optIndex].option}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.takeError = "";
                state.deleteOptLoading = false;
            }
        }).catch(function (error) {
            state.takeError = error;
            state.deleteOptLoading = false;
        });
    },
    updateTitle({ state, dispatch }) {
        state.updateTitleLoading = true;
        axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${state.pollData[state.editIndex]._id}&title=${state.form.question}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.form.question = "";
                state.takeError = "";
                state.updateTitleLoading = false;
            }
        }).catch(function (error) {
            state.takeError = error;
            state.updateTitleLoading = false;
        });
    },
    openModal_title({ state }, index) {
        state.modalTitle = true;
        state.form.question = state.pollData[index].title;
        state.editIndex = index;
    },
    openModal_opt({ state }, index) {
        state.modalTitle = false;
        state.editIndex = index;
    },
    openModal_deleteOpt({ state }, index) {
        state.deleteOptModal = true;
        state.editIndex = index;
    },
    add_option({ state, dispatch }) {
        state.addOptLoading = true;
        axios.post(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.form.opt1}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.form.opt1 = "";
                state.takeError = "";
                state.addOptLoading = false;
            }
        }).catch(function (error) {
            state.takeError = error;
            state.addOptLoading = false;
        });
    },
    select_radio({ state }, optIndexs) {
        state.optIndex = optIndexs;
    },
    clear_modal() {
        state.form.question = "";
        state.form.opt1 = "";
        state.deleteOptModal = false;
    }

}


export default ({
    namespaced: true,
    state, actions
})