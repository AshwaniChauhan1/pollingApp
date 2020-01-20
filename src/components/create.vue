<template>
  <div>
    <div class="p-5 bg-secondary text-white text-center">
      <h1>Create Poll</h1>
    </div>
    <b-container>
      <b-row class="justify-content-lg-center">
        <b-col lg="8">
          <b-form class="p-5" @submit.prevent>
            <p class="text-danger">{{createError}}</p>
            <b-form-group label="Question :">
              <b-form-input
                type="text"
                required
                placeholder="Enter Your Question"
                v-model="form.question"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Option 1 :">
              <b-form-input type="text" required placeholder="Enter Option 1" v-model="form.opt1"></b-form-input>
            </b-form-group>
            <b-form-group label="Option 2 :">
              <b-form-input type="text" required placeholder="Enter Option 2" v-model="form.opt2"></b-form-input>
            </b-form-group>
            <b-form-group label="Option 3 :">
              <b-form-input type="text" required placeholder="Enter Option 3" v-model="form.opt3"></b-form-input>
            </b-form-group>
            <b-form-group label="Option 4 :">
              <b-form-input type="text" required placeholder="Enter Option 4" v-model="form.opt4"></b-form-input>
            </b-form-group>
            <b-button type="submit" @click="createPoll" variant="info">
              <b-spinner class="mx-3" small v-if="createLoading"></b-spinner>
              <span v-if="!createLoading">Submit</span>
            </b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "create",
  computed: {
    ...mapState("pollData", ["form", "createError", "createLoading"])
  },
  methods: {
    ...mapActions({
      createPoll: "pollData/create_poll"
    })
  }
};
</script>