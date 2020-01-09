import router from "../router";
const state = {
    form: { question: "", opt1: "", opt2: "", opt3: "", opt4: "" },
    poll: {},
    pollData: [],
    errors:""
}

const mutations = {
    submit(state) {
        if (state.form.question == "" || state.form.opt1 == "" || state.form.opt2 == "" || state.form.opt3 == "" || state.form.opt4 == "") {
            state.errors = "* Details Required";
        } else {
            state.poll = {
                question: state.form.question,
                opt1: state.form.opt1,
                opt2: state.form.opt2,
                opt3: state.form.opt3,
                opt4: state.form.opt4
            }
            state.pollData.push(state.poll)
            router.push("/view");
            state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
            state.errors ="";
        }
    }
}

const actions = {
    submit({ commit }) {
        commit('submit')
    },
    view() {
        router.push("/view")
    },
    create() {
        router.push("/create")
    },
    index() {
        router.push("/")
    },
    login(){
        router.push("/login")
    }
}


export default ({
    namespaced: true,
    state, actions, mutations
})