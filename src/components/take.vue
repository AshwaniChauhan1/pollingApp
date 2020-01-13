<template>
  <div>
    <b-modal ref="modal-title" id="bv-modal-title" hide-footer @hide="clearModal">
      <template v-slot>
        <b-form v-on:submit.prevent>
          <div v-if="!deleteOptModal">
            <b-form-group v-if="modalTitle" label="Title :">
              <b-form-input type="text" required placeholder="Enter Title" v-model="form.question"></b-form-input>
            </b-form-group>
            <b-form-group v-if="!modalTitle" label="Option :">
              <b-form-input type="text" required placeholder="Enter Option" v-model="form.opt1"></b-form-input>
            </b-form-group>
          </div>
          <div v-if="deleteOptModal">
            <p>
              Title :
              <span class="text-danger">{{pollData[editIndex].title}}</span>
            </p>
            <div v-for="(option,optIndex) in pollData[editIndex].options" :key="optIndex">
              <b-form-radio
                :name="editIndex.toString()"
                @change="selectRadio(optIndex)"
                class="py-2"
              >{{option.option}}</b-form-radio>
            </div>
            <b-button class="mt-3" @click="deleteOpt">Delete</b-button>
          </div>
        </b-form>
        <div v-if="!deleteOptModal">
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
        </div>
      </template>
    </b-modal>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>Take Poll</h1>
    </div>
    <b-container class="p-5">
      <b-row class="justify-content-lg-center">
        <b-col lg="8" class="mb-5 shadow p-3" v-for="(poll,index) in pollData" :key="index">
          <p>
            Title :
            <span class="text-danger">{{poll.title}}</span>
          </p>
          <b-form-group label="Options:">
            <div v-if="loginRoles==='admin'">
              <div
                class="py-2"
                :name="index.toString()"
                v-for="(option,indexs) in poll.options"
                :key="indexs"
              >{{setValue(indexs)}}) {{option.option}}</div>
            </div>
            <div v-if="loginRoles==='guest'">
              <b-form-radio
                class="py-2"
                :name="index.toString()"
                value="rta"
                v-for="(option,indexs) in poll.options"
                :key="indexs"
                @change="clicked({index: index,indexs:indexs})"
              >{{setValue(indexs)}}) {{option.option}}</b-form-radio>
            </div>
          </b-form-group>
          <hr class="mt-0" />
          <div v-if="loginRoles==='admin'">
            <b-link @click="openModalTitle(index);$bvModal.show('bv-modal-title');">Edit Title</b-link>
            <b-link
              class="ml-4"
              @click="openModalOpt(index);$bvModal.show('bv-modal-title');"
            >New Option</b-link>
            <b-link
              class="ml-4"
              @click="openModalDeleteOpt(index);$bvModal.show('bv-modal-title');"
            >Delete Option</b-link>
            <b-link class="ml-4" @click="deletePoll(index)">Delete Poll</b-link>
          </div>
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
  name: "take",
  data(){
    return{
      loginRoles:""
    }
  },
  mounted() {
    this.viewPoll();
    this.loginRoles=localStorage.loginRole;
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
      openModalDeleteOpt: "pollData/openModal_deleteOpt",
      addOption: "pollData/add_option",
      clearModal: "pollData/clear_modal",
      selectRadio: "pollData/select_radio"
    })
  },
  computed: {
    ...mapState("pollData", [
      "pollData",
      "form",
      "modalTitle",
      "deleteOptModal",
      "editIndex"
    ]),
    ...mapState("loginData", ["loginRole"])
  }
};
</script>