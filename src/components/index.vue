<template>
  <div>
    <b-navbar variant="info" class="shadow">
      <b-navbar-brand class="text-white" @click="openHome">
        <a>VUE</a>
      </b-navbar-brand>
      <b-navbar-nav v-if="token !==''">
        <b-nav-item v-if="loginRoles==='admin'">
          <button class="btn btn-light" @click="openCreate">Create</button>
        </b-nav-item>
        <b-nav-item>
          <button class="btn btn-light" @click="openView">View</button>
        </b-nav-item>
        <b-nav-item v-if="loginRoles==='guest'">
          <button class="btn btn-light" @click="openTake">Take</button>
        </b-nav-item>
        <b-nav-item v-if="loginRoles==='admin'">
          <button class="btn btn-light" @click="openTake">Edit</button>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="token=='' && this.$route.path.indexOf('/login')">
          <button class="btn btn-dark" @click="openLogin">LogIn</button>
        </b-nav-item>
        <b-nav-item v-if="token !==''">
          <button class="btn btn-dark" @click="userLogout">LogOut</button>
        </b-nav-item>
        <b-nav-item v-if="token=='' && this.$route.path.indexOf('/signup')">
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
      token: "",
      loginRoles: ""
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.token;
    } else {
      localStorage.setItem("token", this.token);
    }
  },
  updated() {
    this.token = localStorage.token;
    this.loginRoles = localStorage.loginRole;
  },
  methods: {
    ...mapActions({
      openTake: "pollData/routeTake",
      openCreate: "pollData/routeCreate",
      openView: "pollData/routeView",
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
