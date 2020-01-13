import router from "../router";
import axios from "axios";
const state = {
    form: { question: "", opt1: "", opt2: "", opt3: "", opt4: "" },
    poll: {},
    errors: "",
    pollData: [],
    editIndex: "",
    optIndex: "",
    modalTitle: true,
    deleteOptModal: false
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
                    // eslint-disable-next-line
                    console.log(response, "create");
                    router.push("/view");
                    state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
                    state.errors = "";
                }
            }).catch(function (error) {
                // eslint-disable-next-line
                console.log(error, "error");
                state.signupErrors = "* Account already exists ";
            });
        }
    },
    getPoll() {
        axios
            .get("https://secure-refuge-14993.herokuapp.com/list_polls")
            .then(response => {
                state.pollData = response.data.data;
            })
            .catch(function (error) {
                // eslint-disable-next-line
                console.log(error, "error");
            });
    },
    click({ state }, payload) {
        let axiosConfig = {
            headers: {
                'access_token': localStorage.token
            }
        };
        axios.post(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${state.pollData[payload.index]._id}&option_text=${state.pollData[payload.index].options[payload.indexs].option}`, payload, axiosConfig).then(response => {
            if (response.status === 200) {
                // eslint-disable-next-line
                console.log(state.pollData[payload.index].options[payload.indexs].vote);
            }
        }).catch(function (error) {
            // eslint-disable-next-line
            console.log(error, "error");
        });
    },
    delete_poll({ state, dispatch }, index) {
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${state.pollData[index]._id}`).then(response => {
            if (response.status === 200) {
                // eslint-disable-next-line
                console.log(response, "delete Poll");
                dispatch('getPoll');
            }
        }).catch(function (error) {
            // eslint-disable-next-line
            console.log(error, "error");
        });
    },
    delete_opt({ state, dispatch }) {
        axios.delete(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${state.pollData[state.editIndex]._id}&option_text=${state.pollData[state.editIndex].options[state.optIndex].option}`).then(response => {
            if (response.status === 200) {
                // eslint-disable-next-line
                console.log(response, "delete opt");
                dispatch('getPoll');
            }
        }).catch(function (error) {
            // eslint-disable-next-line
            console.log(error, "error");
        });
    },
    updateTitle({ state, dispatch }) {
        axios.post(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${state.pollData[state.editIndex]._id}&title=${state.form.question}`).then(response => {
            if (response.status === 200) {
                // eslint-disable-next-line
                console.log(response, "update title");
                dispatch('getPoll');
                state.form.question = "";
            }
        }).catch(function (error) {
            // eslint-disable-next-line
            console.log(error, "error");
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
                // eslint-disable-next-line
                console.log(response, "add option");
                dispatch('getPoll');
                state.form.opt1 = "";
            }
        }).catch(function (error) {
            // eslint-disable-next-line
            console.log(error, "error");
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