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
            <div v-for="(createOption,index) in createOptions" :key="index">
              <b-form-group label="Option">
                <b-form-input
                  type="text"
                  required
                  placeholder="Enter Option"
                  v-model="createOption.opt"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="d-flex justify-content-end">
              <b-button
                type="submit"
                @click="createPoll"
                v-if="!createLoading"
                variant="info"
                class="mx-2"
              >
                <span>Submit</span>
              </b-button>
              <b-button type="submit" variant="info" class="mx-2" v-if="createLoading">
                <b-spinner class="mx-3" small></b-spinner>
              </b-button>
              <b-button
                class="mx-2"
                v-if="createOptions.length !== 1"
                @click="deleteCreateOption"
                variant="danger"
              >
                <span>Delete Option</span>
              </b-button>
              <b-button @click="addCreateOption" variant="info">
                <span>Add Option</span>
              </b-button>
            </div>
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
  data() {
    return {};
  },
  computed: {
    ...mapState("pollData", [
      "form",
      "createError",
      "createLoading",
      "createOptions"
    ])
  },
  methods: {
    ...mapActions({
      createPoll: "pollData/create_poll",
      addCreateOption: "pollData/addCreate_poll",
      deleteCreateOption: "pollData/deleteCreate_poll"
    })
  }
};
</script>