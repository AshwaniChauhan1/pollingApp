<template>
  <div>
    <b-modal ref="modal-title" id="bv-modal-title" hide-footer @hide="clearModal">
      <template v-slot>
        <b-form v-on:submit.prevent>
          <b-form-group v-if="modalTitle" label="Title :">
            <b-form-input type="text" required placeholder="Enter Title" v-model="form.question"></b-form-input>
          </b-form-group>
          <b-form-group v-if="!modalTitle" label="Option :">
            <b-form-input type="text" required placeholder="Enter Option" v-model="form.opt1"></b-form-input>
          </b-form-group>
        </b-form>
        <b-button
          v-if="modalTitle"
          class="mt-3"
          @click="update();$bvModal.hide('bv-modal-title');"
        >Update</b-button>
        <b-button
          v-if="!modalTitle"
          class="mt-3"
          @click="addOption();$bvModal.hide('bv-modal-title');"
        >Add</b-button>
      </template>
    </b-modal>
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
          <b-form-group label="Options:">
            <b-form-radio
              class="py-2"
              :name="index.toString()"
              value="rta"
              v-for="(option,indexs) in poll.options"
              :key="indexs"
              @change="clicked({index: index,indexs:indexs})"
            >
              {{setValue(indexs)}}) {{option.option}}
              <div>
                <b-link @click="deleteOpt({index: index,indexs:indexs})">Delete</b-link>
              </div>
            </b-form-radio>
          </b-form-group>
          <hr class="mt-0" />
          <b-link class="px-4" @click="deletePoll(index)">Delete Poll</b-link>
          <b-link @click="openModalTitle(index);$bvModal.show('bv-modal-title');">Edit Title</b-link>
          <b-link
            class="pl-4"
            @click="openModalOpt(index);$bvModal.show('bv-modal-title');"
          >New Option</b-link>
        </b-col>
        <b-col lg="8" class="px-0">
          <b-button type="submit" variant="info">Submit</b-button>
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
    this.viewPoll();
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
      viewPoll: "pollData/getPoll",
      clicked: "pollData/click",
      deletePoll: "pollData/delete_poll",
      deleteOpt: "pollData/delete_opt",
      update: "pollData/updateTitle",
      openModalTitle: "pollData/openModal_title",
      openModalOpt: "pollData/openModal_opt",
      addOption:"pollData/add_option",
      clearModal: "pollData/clear_modal"
    })
  },
  computed: {
    ...mapState("pollData", ["pollData", "form","modalTitle"])
  }
};
</script>