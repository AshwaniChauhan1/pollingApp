import router from "../router";
import axios from "axios";
const state = {
    login: {
        username: "",
        password: "",
    },
    loginError: "",
    loginLoading: false,
    loginRole: ""
}
const actions = {
    async loginUser({ dispatch }) {
        let res = await dispatch('validUsername')
        if (state.login.username === "" || state.login.password === "") {
            state.loginError = "* Fill Required Details";
        } else if (!res) {
            state.loginError = "*Invalid Username";
        }
        else {
            state.loginLoading = true;
            await axios.post(`https://secure-refuge-14993.herokuapp.com/login?username=${state.login.username}&password=${state.login.password}`).then(response => {
                if (response.status === 200 && response.data.error === 0) {
                    router.push("/take");
                    state.loginError = "";
                    localStorage.token = response.data.token;
                    dispatch('decodeToken');
                    localStorage.loginRole = state.loginRole;
                }
                if (response.status === 200 && response.data.error === 1) {
                    state.loginError = "* User not exists ";
                }
                state.login.username = "";
                state.login.password = "";
            }).catch(function (error) {
                state.loginError = error;
            });
            state.loginLoading = false;
        }
    },
    decodeToken() {
        var base64Url = localStorage.token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        state.loginRole = JSON.parse(jsonPayload).role;
    },
    routeLogin() {
        state.loginError = "";
        router.push("/login");
    },
    logout() {
        localStorage.token = "";
        localStorage.vote = "";
        localStorage.loginRole = "";
        router.push("/login");
    },
    validUsername({ state }) {
        //eslint-disable-next-line
        var re = /^[a-zA-Z0-9]+$/;
        return re.test(state.login.username);
    },
}

export default ({
    namespaced: true,
    state, actions
})