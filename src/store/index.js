import Vue from "vue";
import Vuex from "vuex";

import pollData from "./pollData";
import signupData from "./signupData";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        pollData,signupData
    }
})