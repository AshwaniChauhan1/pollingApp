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
    createError: ""
}

const actions = {
    routeTake() {
        router.push("/take")
    },
    routeCreate() {
        router.push("/create")
    },
    routeView() {
        router.push("/view")
    },
    index() {
        router.push("/")
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
            axios.post(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.opt1}____${payload.opt2}____${payload.opt3}____${payload.opt4}`, payload).then(response => {
                if (response.status === 200) {
                    router.push("/view");
                    state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
                    state.createError = "";
                }
            }).catch(function (error) {
                state.createError = error;

            });
        }
    },
    getPoll() {
        axios
            .get("https://secure-refuge-14993.herokuapp.com/list_polls")
            .then(response => {
                state.pollData = response.data.data;
                state.takeError = "";
                state.viewError = "";
            })
            .catch(function (error) {
                state.takeError = error;
                state.viewError = error;
            });
    },
    async vote({ state, dispatch }, payload) {
        let responseToSend = null
        let axiosConfig = {
            headers: {
                'access_token': localStorage.token
            }
        };
        await axios.post(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${state.pollData[payload.index]._id}&option_text=${state.pollData[payload.index].options[payload.indexs].option}`, payload, axiosConfig).then(response => {
            if (response.status === 200) {
                state.voteObj = {
                    id: state.pollData[payload.index]._id,
                    title: state.pollData[payload.index].title
                };
                responseToSend = true
                dispatch('getPoll');

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
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${state.pollData[index]._id}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.takeError = "";
            }
        }).catch(function (error) {
            state.takeError = error;
        });
    },
    delete_opt({ state, dispatch }) {
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.pollData[state.editIndex].options[state.optIndex].option}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.takeError = "";
            }
        }).catch(function (error) {
            state.takeError = error;
        });
    },
    updateTitle({ state, dispatch }) {
        axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${state.pollData[state.editIndex]._id}&title=${state.form.question}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.form.question = "";
                state.takeError = "";
            }
        }).catch(function (error) {
            state.takeError = error;
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
        axios.post(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.form.opt1}`).then(response => {
            if (response.status === 200) {
                dispatch('getPoll');
                state.form.opt1 = "";
                state.takeError = "";
            }
        }).catch(function (error) {
            state.takeError = error;
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