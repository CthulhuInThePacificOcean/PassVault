<template>
  <PopupBox
    v-if="cardCreationVisible"
    @show-popup="showPopup"
    @close-popup="closePopup"
    :activeId="this.activeId"
    :files="files"
    :cardToUpdate="cardToUpdate"
    :popupBoxUpdate="popupBoxUpdate"
    @save-file="saveFilesToFirestore"
    :userFiles="userFiles"
  />
  <h1 v-if="displayName">Welcome {{ displayName }}</h1>
  <div class="button-parent">
    <button @click="signOut" class="auth-btn">Sign Out</button>
  </div>
  <div class="flex-container">
    <div class="flex-item flex-item-1">
      <button id="new-folder-button" @click="emitAddFolder">
        Create New Folder
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 -200 1024 1024"
          height="1.5em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM632 577c0 3.8-3.4 7-7.5 7H540v84.9c0 3.9-3.2 7.1-7 7.1h-42c-3.8 0-7-3.2-7-7.1V584h-84.5c-4.1 0-7.5-3.2-7.5-7v-42c0-3.8 3.4-7 7.5-7H484v-84.9c0-3.9 3.2-7.1 7-7.1h42c3.8 0 7 3.2 7 7.1V528h84.5c4.1 0 7.5 3.2 7.5 7v42z"
          ></path>
        </svg>
      </button>
      <div id="box-1" v-show="fileCreationVisbile">
        <FileForm
          @toggle-file-creation="toggleFileCreation"
          @add-file="addFile"
          :fileFormUpdate="fileFormUpdate"
          :folderToUpdate="folderToUpdate"
          @close-file-creation="closeFileCreation"
          @update-file="updateFile"
        />
      </div>
      <FileList
        :files="this.files"
        :userFiles="userFiles"
        :fileContents="fileContents"
        @delete-file="deleteFile"
        @add-active="addActive"
        @edit-folder="emitUpdateFolder"
        id="file-list"
      />
    </div>
    <div class="flex-item flex-item-2" id="box-2">
      <ContentList
        :files="files"
        :userFiles="userFiles"
        @show-popup="showPopup"
        @edit-card="emitUpdateCard"
        @save-file="saveFilesToFirestore"
        :fileContents="fileContents"
        :userFileContents="userFileContents"
      />
    </div>
  </div>
</template>

<script>
import ContentList from "@/components/ContentList.vue";
import FileList from "@/components/FileList.vue";
import FileForm from "@/components/FileForm.vue";
import PopupBox from "@/components/PopupBox.vue";
import { auth, db } from "../firebase/init.js";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import { useStore } from "vuex";


export default {
  name: "Main",
  components: {
    ContentList,
    FileList,
    FileForm,
    PopupBox,
    Login,
    Register,
  },
  data() {
    return {
      fileCreationVisbile: false,
      files: [],
      fileContents: [],
      cardCreationVisible: false,
      activeId: "",
      cardToUpdate: {},
      folderToUpdate: {},
      popupBoxUpdate: false,
      fileFormUpdate: false,
      displayName: "",
      email: "",
      password: "",
      userId: "",
      username: "",
      store: useStore(),
      userFiles: this.$store.state.userFiles,
      userFileContents: this.$store.state.fileContents
    };
  },
  computed: {
    userFiles() {
      return this.$store.state.userFiles;
    },
    displayName() {
      return this.$store.state.user && this.$store.state.user.displayName;
    },
  // ... other computed properties
    userFileContents(){
      return this.$store.state.fileContents;
    }
  },
  beforeCreate() {
    if (auth.currentUser) {
      this.userId = auth.currentUser.uid;
      this.$store.dispatch("fetchUser", this.userId);
      this.$store.dispatch("loadFiles", this.userId);
    }
  },
  methods: {
    emitUpdateCard(targetCard) {
      this.cardToUpdate = targetCard;
      this.popupBoxUpdate = true;
      this.showPopup();
    },
    emitUpdateFolder(targetFolder) {
      this.folderToUpdate = targetFolder;
      this.fileFormUpdate = true;
      this.toggleFileCreation();
    },
    emitAddFolder(){
      this.folderToUpdate = null;
      this.toggleFileCreation()
    },
    updateNote(noteId, name, site, user, pass) {
      isUpdate = true;
      updateId = noteId;
      addButtons[noteId].click();
      nameTag.value = name;
      siteTag.value = site;
      userTag.value = user;
      passTag.value = pass;
      addBox.innerText = "Update Note";
      popupTitle.innerText = "Update a Note";
    },

    toggleFileCreation() {
      this.fileCreationVisbile = true;
    },

    closeFileCreation() {
      this.fileCreationVisbile = false;
      this.fileFormUpdate = false;
    },

    showPopup() {
      this.cardCreationVisible = true;
    },
    closePopup() {
      this.cardCreationVisible = false;
      this.popupBoxUpdate = false;
    },
    async addFile(file) {
      this.store.commit("ADD_USER_FILE", file);
      this.store.commit("ADD_FILE_CONTENT", file.content);
      this.saveFilesToFirestore(this.userId);
    },
    updateFile(file) {
      const fileIndex = this.userFiles.indexOf(file);
      this.userFiles.splice(fileIndex, 1, file);
      this.addActive(file);
      this.saveFilesToFirestore(this.userId);
    },
    deleteFile(file) {
      if (confirm("Are you sure you want to delete this file")) {
        this.store.dispatch("deleteFile", file);
      }
    },

    addActive(id) {
      const userFiles = this.$store.state.userFiles;
      const fileContents = this.$store.state.fileContents;
      console.log(id)

      userFiles.forEach((file) => {
        file.isActive = false;
      });
      console.log(fileContents)
      fileContents.forEach((fileContent) => {
        fileContent.isActive = false;
      });
      const fileIndex = userFiles.findIndex((file) => file.name === id.name);
      console.log(fileIndex)
      if (fileIndex !== -1) {
        userFiles[fileIndex].isActive = true;
        console.log(userFiles[fileIndex].isActive)
      }
      this.$store.commit("SET_USER_FILES", userFiles);
      this.$store.commit("SET_FILE_CONTENTS", fileContents);
    },
    signOut() {
      this.store.dispatch("logout");
    },
    async saveFilesToFirestore(userId) {
      console.log(userId)
      this.store.dispatch("saveFilesToFirestore", userId);
    },
  },
  emits: ["add-file", "add-active", "show-popup", "save-file"],
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: blue;
}

.link:hover {
  text-decoration: underline;
}

.button-parent{
  text-align: right;
}
.auth-btn {
  position: relative;
  display: inline-block;
  margin-right: 1.2em;
  top: -15px;
}
</style>
