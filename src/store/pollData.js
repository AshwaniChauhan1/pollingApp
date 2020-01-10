import router from "../router";
import axios from "axios";
const state = {
    form: { question: "", opt1: "", opt2: "", opt3: "", opt4: "" },
    poll: {},
    errors: "",
    pollData:[]
}



const actions = {
    submit() {
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
            // state.pollData.push(state.poll)
            // router.push("/view");
            state.form = { question: "", opt1: "", opt2: "", opt3: "", opt4: "" };
            state.errors = "";

            axios.post(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.opt1}____${payload.opt2}____${payload.opt3}____${payload.opt4}`, payload).then(response => {
                if (response.status === 200) {
                    // eslint-disable-next-line
                    console.log(response, "create");
                    router.push("/view");

                }
            }).catch(function (error) {
                // eslint-disable-next-line
                console.log(error, "error");
                state.signupErrors = "* Account already exists ";
            });
        }
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
    login() {
        router.push("/login")
    },
    getPoll() {
        axios
          .get("https://secure-refuge-14993.herokuapp.com/list_polls")
          .then(response => {
            state.pollData = response.data.data;
          })
          .catch(function(error) {
            // eslint-disable-next-line
            console.log(error, "error");
          });
      },
      click({state},poll, indexs) {
        // eslint-disable-next-line
        console.log(poll._id);
        // eslint-disable-next-line
        console.log(poll.options[indexs].option);
         // eslint-disable-next-line
         console.log(state);
      }
}


export default ({
    namespaced: true,
    state, actions
})