<template>
  <div>
    <b-modal ref="modal-title" id="bv-modal-title" hide-footer @hide="clearModal">
      <template v-slot>
        <b-form v-on:submit.prevent>
          <div v-if="!deleteOptModal">
            <b-form-group v-if="modalTitle" label="Title :">
              <b-form-input
                v-on:keyup.enter="update();$bvModal.hide('bv-modal-title');"
                type="text"
                required
                placeholder="Enter Title"
                v-model="form.question"
              ></b-form-input>
            </b-form-group>
            <b-form-group v-if="!modalTitle" label="Option :">
              <b-form-input
                v-on:keyup.enter="addOption();$bvModal.hide('bv-modal-title');"
                type="text"
                required
                placeholder="Enter Option"
                v-model="form.opt1"
              ></b-form-input>
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
            <b-button variant="info" class="mt-3" @click="deleteOpt">
              <b-spinner small v-if="deleteOptLoading"></b-spinner>
              <span v-if="!deleteOptLoading">Delete</span>
            </b-button>
          </div>
        </b-form>
        <div v-if="!deleteOptModal">
          <b-button
            v-if="modalTitle"
            variant="info"
            class="mt-3"
            @click="update();$bvModal.hide('bv-modal-title');"
          >
            <b-spinner small v-if="updateTitleLoading"></b-spinner>
            <span v-if="!updateTitleLoading">Update</span>
          </b-button>
          <b-button
            v-if="!modalTitle"
            variant="info"
            class="mt-3"
            @click="addOption();$bvModal.hide('bv-modal-title');"
          >
            <b-spinner small v-if="addOptLoading"></b-spinner>
            <span v-if="!addOptLoading">Add</span>
          </b-button>
        </div>
      </template>
    </b-modal>
    <div class="p-5 bg-secondary text-center text-white">
      <h1>Take Poll</h1>
    </div>
    <b-container class="p-5">
      <p class="text-danger text-center">{{takeError}}</p>
      <b-row class="justify-content-lg-center">
        <b-col lg="8" class="mb-5 shadow px-3 py-3" v-for="(poll,index) in pollData" :key="index">
          <div class="d-flex pt-2 pb-4">
            <div class="mr-1">
              <span>Title:</span>
            </div>
            <div>
              <span class="text-danger text-break">{{poll.title}}</span>
            </div>
          </div>
          <b-form-group label="Options:">
            <div v-if="loginRoles==='admin'">
              <div
                class="py-2 d-flex"
                :name="index.toString()"
                v-for="(option,optIndex) in poll.options"
                :key="optIndex"
              >
                <div class="mr-1">{{setValue(optIndex)}})</div>
                <div>
                  <span class="text-break">{{option.option}}</span>
                </div>
              </div>
            </div>
            <div v-if="loginRoles==='guest'">
              <b-form-radio
                class="py-2 d-flex"
                :name="index.toString()"
                value="options"
                v-for="(option,optIndex) in poll.options"
                :key="optIndex"
                :disabled="disabled(poll.title)"
                @change="setVote({index: index,optIndex:optIndex})"
              >
                <span>{{setValue(optIndex)}})</span>
                <span class="text-break ml-1">{{option.option}}</span>
              </b-form-radio>
            </div>
          </b-form-group>
          <hr class="mt-0" />
          <div v-if="loginRoles==='admin'" class="d-flex justify-content-end">
            <b-button
              variant="outline-primary"
              @click="openModalTitle(index);$bvModal.show('bv-modal-title')"
              class="mx-2"
            >Edit Title</b-button>
            <b-button
              variant="outline-primary"
              @click="openModalOpt(index);$bvModal.show('bv-modal-title')"
              class="mx-2"
              v-if="poll.options.length <4"
            >New Option</b-button>
            <b-button
              variant="outline-danger"
              @click="openModalDeleteOpt(index);$bvModal.show('bv-modal-title')"
              class="mx-2"
            >Delete Option</b-button>
            <b-button variant="outline-danger" Button @click="deletePoll(index)">
              <b-spinner small v-if="deletePollLoading"></b-spinner>
              <span v-if="!deletePollLoading">Delete Poll</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "take",
  data() {
    return {
      loginRoles: "",
      votes: []
    };
  },
  mounted() {
    this.viewPoll();
    this.loginRoles = localStorage.loginRole;
    this.voteLocalStorage();
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
      vote: "pollData/vote",
      deletePoll: "pollData/delete_poll",
      deleteOpt: "pollData/delete_opt",
      update: "pollData/updateTitle",
      openModalTitle: "pollData/openModal_title",
      openModalOpt: "pollData/openModal_opt",
      openModalDeleteOpt: "pollData/openModal_deleteOpt",
      addOption: "pollData/add_option",
      clearModal: "pollData/clear_modal",
      selectRadio: "pollData/select_radio"
    }),
    voteLocalStorage() {
      if (localStorage.getItem("vote")) {
        this.votes = JSON.parse(localStorage.getItem("vote"));
      } else {
        localStorage.setItem("vote", JSON.stringify(this.arrayToset));
      }
    },
    async setVote(payload) {
      let response = await this.vote(payload);
      if (response === true) {
        this.voteLocalStorage();
      }
    },
    disabled(title) {
      if (this.votes.length !== null) {
        for (let i = 0; i < this.votes.length; i++) {
          if (this.votes[i].title === title) {
            return true;
          }
        }
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState("pollData", [
      "pollData",
      "form",
      "modalTitle",
      "deleteOptModal",
      "editIndex",
      "voteArr",
      "arrayToset",
      "takeError",
      "updateTitleLoading",
      "deletePollLoading",
      "deleteOptLoading",
      "addOptLoading"
    ])
  }
};
</script>