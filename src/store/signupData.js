import router from "../router";
import axios from "axios";
const state = {
    signup: {
        username: "",
        password: "",
        role: null
    },
    signUpError: "",
    signupLoading: false
}

const actions = {
    async addUser({ dispatch }) {
        let res = await dispatch('validUsername')
        if (state.signup.username == "" || state.signup.password == "" || state.signup.role == null) {
            state.signUpError = "* Fill Required Details";
        } else if (!res) {
            state.signUpError = "*Invalid Username";
        } else {
            var payload = {
                username: state.signup.username,
                password: state.signup.password,
                role: state.signup.role
            };
            state.signupLoading = true;
            await axios.post(`https://secure-refuge-14993.herokuapp.com/add_user?username=${state.signup.username}&password=${state.signup.password}&role=${state.signup.role}`, payload).then(response => {
                if (response.status === 200 && response.data.error === 0) {
                    router.push("/login");
                    state.signUpError = ""
                }
                if (response.status === 200 && response.data.error === 1) {
                    state.signUpError = "* Account already exists ";
                }
                state.signup.username = "";
                state.signup.password = "";
                state.signup.role = null;
            }).catch(function (error) {
                state.signUpError = error;
            });
            state.signupLoading = false;

        }
    },
    routeSignup() {
        state.signup.username = "";
        state.signup.password = "";
        state.signUpError = "";
        router.push("/signup");
    },
    validUsername({ state }) {
        //eslint-disable-next-line
        var re = /^[a-zA-Z0-9]+$/;
        return re.test(state.signup.username);
    }
}

export default ({
    namespaced: true,
    state, actions
})