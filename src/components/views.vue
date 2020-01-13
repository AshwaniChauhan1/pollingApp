<template>
  <div>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>View Poll</h1>
    </div>
    <b-container class="p-5">
      <b-row class="justify-content-lg-center">
        <b-col lg="8" class="mb-5 shadow p-3" v-for="(poll,index) in pollData" :key="index">
          <p>
            Title :
            <span class="text-danger">{{poll.title}}</span>
          </p>
          <p>Options:</p>
          <div
            class="py-2"
            :name="index.toString()"
            v-for="(option,indexs) in poll.options"
            :key="indexs"
          >{{setValue(indexs)}}) {{option.option}}</div>
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
      if (index === 0) return "a";
      if (index === 1) return "b";
      if (index === 2) return "c";
      if (index === 3) return "d";
      if (index === 4) return "e";
    },
    ...mapActions({
    GetPoll: "pollData/getPoll"
  })
  },
  
  computed: {
    ...mapState("pollData", ["pollData","loginRole"])
  }
};
</script>