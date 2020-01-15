import router from "../router";
import axios from "axios";
const state = {
    signup: {
        username: "",
        password: "",
        role: "Enter Role"
    },
    signUpError: "",
    signupLoading: false
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
            state.signupLoading = true;
            axios.post(`https://secure-refuge-14993.herokuapp.com/add_user?username=${state.signup.username}&password=${state.signup.password}&role=${state.signup.role}`, payload).then(response => {
                if (response.status === 200 && response.data.error === 0) {
                    router.push("/login");
                    state.signUpError = ""
                }
                if (response.status === 200 && response.data.error === 1) {
                    state.signUpError = "* Account already exists ";
                }
                state.signup.username = "";
                state.signup.password = "";
                state.signup.role = "";
                state.signupLoading = false;

            }).catch(function (error) {
                state.signUpError = error;

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