import router from "../router";
import axios from "axios";
const state = {
    login: {
        username: "",
        password: "",
    },
    loginError: "",
    loginLoading: false
}

const actions = {
    loginUser() {
        if (state.login.username === "" || state.login.password === "") {
            state.loginError = "* Fill Required Details";
        } else {
            state.loginLoading = true;
            axios.post(`https://secure-refuge-14993.herokuapp.com/login?username=${state.login.username}&password=${state.login.password}`).then(response => {
                if (response.status === 200) {
                    router.push("/create");
                    state.login.username = "";
                    state.login.password = "";
                    state.loginError = "";
                    localStorage.token = response.data.token;   
                    state.loginLoading = false;     
                }
            }).catch(function (error) {
                // eslint-disable-next-line
                console.log(error, "error");
                state.loginErrors = "* User not exists ";
            });

        }
    },
    routeLogin() {
        router.push("/login");
    },
    logout(){
        localStorage.token = "";
        router.push("/");
        
    }
}

export default ({
    namespaced: true,
    state, actions
})