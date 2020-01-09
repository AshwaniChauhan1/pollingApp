import router from "../router";
import axios from "axios";
const state = {
    signup: {
        username: "",
        password: "",
        role: "Enter Role"
    },
    signUpError: ""
}

const actions = {
    addUser() {
        if (state.signup.username == "" || state.signup.password == "" || state.signup.role == "") {
            state.signUpError = "* Fill Required Details";
        } else {
            var payload = {
                username: state.signup.username,
                password: state.signup.password,
                role: state.signup.role
            };
            axios.post("https://secure-refuge-14993.herokuapp.com/add_user?username=admin&password=admin&role=admin", payload).then(response => {
                if (response.status === 200) {
                    // eslint-disable-next-line
                    console.log(response, "signup");
                    router.push("/");
                    state.signup.username = "";
                    state.signup.password = "";
                    state.signup.role = "";
                }
            }).catch(function (error) {
                // eslint-disable-next-line
                console.log(error, "error");
                state.signupErrors = "* Account already exists ";
            });

        }
    },
    routeSignup() {
        router.push("/signup");
    }
}

export default ({
    namespaced: true,
    state, actions
})