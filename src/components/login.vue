<template>
  <div>
    <div class="p-5 bg-secondary text-white text-center">
      <h1>LOGIN</h1>
    </div>
    <b-container>
      <b-row  class="justify-content-lg-center">
          <b-col lg="6">
        <b-form class="p-5">
            <p class="text-danger">{{errors}}</p>
          <b-form-group label="Username:">
            <b-form-input type="text" required placeholder="Enter Username" ></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input type="password" required placeholder="Enter Password"></b-form-input>
          </b-form-group>
          <b-button type="submit" @click="submitFunction" variant="primary">login</b-button>
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
        ...mapState('pollData',["form","errors"])
    },
    methods:{
        ...mapActions({
            submitFunction: "pollData/submit"
        })
    }
}
</script>