<template>
  <div>
    <b-navbar variant="info">
      <b-navbar-brand class="text-white" @click="openHome">
        <a>VUE</a>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item v-if="token !== ''">
          <button class="btn btn-light" @click="openCreate">Create</button>
        </b-nav-item>
        <b-nav-item v-if="token !==''">
          <button class="btn btn-light" @click="openView">View</button>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="token==''">
          <button class="btn btn-dark" @click="openLogin">LogIn</button>
        </b-nav-item>
        <b-nav-item v-if="token !==''">
          <button class="btn btn-dark" @click="userLogout">LogOut</button>
        </b-nav-item>
        <b-nav-item v-if="token==''">
          <button class="btn btn-dark" @click="openSignup">SignUp</button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "index",
  data() {
    return {
      token: ""
    };
  },
  mounted() {
    if (localStorage.token !== "") {
      this.token = localStorage.token;
    }
  },
  updated(){
    this.token = localStorage.token;
  },
  methods: {
    ...mapActions({
      openView: "pollData/view",
      openCreate: "pollData/create",
      openHome: "pollData/index",
      openLogin: "loginData/routeLogin",
      openSignup: "signupData/routeSignup",
      userLogout: "loginData/logout"
    })
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
