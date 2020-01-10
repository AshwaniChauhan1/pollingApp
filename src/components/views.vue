<template>
  <div>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>View Poll</h1>
    </div>
    <b-container class="p-5">
      <b-row class="justify-content-lg-center">
        <b-col lg="8" class="mb-5 shadow p-3" v-for="(poll,index) in pollData" :key="index">
          <p>
            <span class="text-danger">Question:</span>
            {{poll.title}} ?
          </p>
          <b-form-group label="Options:">
            <b-form-radio
              :name="index.toString()"
              value="rta"
              v-for="(option,indexs) in poll.options"
              :key="indexs"
              @change="clicked({poll:poll,indexs:indexs})"
            >{{setValue(indexs)}}) {{option.option}}</b-form-radio>
          </b-form-group>
        </b-col>
        <b-col lg="8" class="px-0">
          <b-button type="submit" variant="info">Submit</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions , mapState} from "vuex";
export default {
  name: "views",
  mounted() {
    this.viewPoll();
  },
  methods: {
    setValue(index) {
      if (index === 0) return "a";
      if (index === 1) return "b";
      if (index === 2) return "c";
      if (index === 3) return "d";
    },
    ...mapActions({
      viewPoll: "pollData/getPoll",
      clicked:"pollData/click"
    })
  },
  computed: {
    ...mapState("pollData", ["pollData"])
  }
};
</script>