<template>
  <div>
    <div class="p-5 bg-secondary text-white text-center">
      <h1>LOGIN</h1>
    </div>
    <b-container>
      <b-row  class="justify-content-lg-center">
          <b-col lg="6">
        <b-form class="p-5">
            <p class="text-danger">{{loginError}}</p>
          <b-form-group label="Username:">
            <b-form-input type="text" required placeholder="Enter Username" v-model="login.username" ></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input type="password" required placeholder="Enter Password"  v-model="login.password"></b-form-input>
          </b-form-group>
          <b-button type="submit" @click="loginUser" variant="info">
            <b-spinner small v-if="loginLoading"></b-spinner>
            <span v-if="!loginLoading">login</span></b-button>
        </b-form>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapActions} from "vuex"
export default {
    name:"create",
    computed:{
        ...mapState('loginData',["login","loginError","loginLoading"])
    },
    methods:{
        ...mapActions({
            loginUser: "loginData/loginUser"
        })
    }
}
</script>