<template>
  <div>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>View Poll</h1>
    </div>
    <b-container class="p-5">
        <b-row class="justify-content-lg-center">
      <b-col lg="8" class="mb-3" v-for="(poll,index) in pollData" :key="index">
        <p>Question:{{poll.question}}</p>
        <b-form-group label="Options:">
          <b-form-radio name="opt"  value="opt1">a) {{poll.opt1}}</b-form-radio>
          <b-form-radio name="opt"  value="opt2">b) {{poll.opt2}}</b-form-radio>
          <b-form-radio name="opt"  value="opt3">c) {{poll.opt3}}</b-form-radio>
          <b-form-radio name="opt"  value="opt4">d) {{poll.opt4}}</b-form-radio>
        </b-form-group>
      </b-col>
        </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "views",
  computed: {
    ...mapState("pollData", ["pollData"])
  }
};
</script>