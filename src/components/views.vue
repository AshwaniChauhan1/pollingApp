<template>
  <div>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>View Poll</h1>
    </div>
    <b-container class="p-5">
      <p class="text-danger">{{viewError}}</p>
      <b-row class="justify-content-lg-center">
        <b-col lg="8" class="mb-5 shadow p-3" v-for="(poll,index) in pollData" :key="index">
          <div class="d-flex pt-2 pb-4">
            <div class="mr-1">
              <span>Title:</span>
            </div>
            <div>
              <span class="text-danger text-break">{{poll.title}}</span>
            </div>
          </div>
          <p>Options:</p>
          <div
            class="py-2 d-flex justify-content-between"
            :name="index.toString()"
            v-for="(option,optIndex) in poll.options"
            :key="optIndex"
          >
            <div class="d-flex">
              <div class="mr-1">{{setValue(optIndex)}})</div>
              <div>
                <span class="text-break">{{option.option}}</span>
              </div>
            </div>
            <div class="px-3">
              <span class="text-danger text-nowrap">vote :</span>
              <span>{{option.vote}}</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "views",
  mounted() {
    this.GetPoll();
  },
  methods: {
    setValue(index) {
      var alphabet = String.fromCharCode(97 + index);
      return alphabet;
    },
    ...mapActions({
      GetPoll: "pollData/getPoll"
    })
  },

  computed: {
    ...mapState("pollData", ["pollData", "loginRole", "viewError"])
  }
};
</script>