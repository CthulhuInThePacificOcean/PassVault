<template>
  <div class="form-parent">
    <button
      type="button"
      id="close-button"
      @click="closeForm"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 1024 1024"
        height="1.5em"
        width="1.5em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM676.1 657.9c4.4 5.2.7 13.1-6.1 13.1h-58.9c-4.7 0-9.2-2.1-12.3-5.7L512 561.8l-86.8 103.5c-3 3.6-7.5 5.7-12.3 5.7H354c-6.8 0-10.5-7.9-6.1-13.1L470.2 512 347.9 366.1A7.95 7.95 0 0 1 354 353h58.9c4.7 0 9.2 2.1 12.3 5.7L512 462.2l86.8-103.5c3-3.6 7.5-5.7 12.3-5.7H670c6.8 0 10.5 7.9 6.1 13.1L553.8 512l122.3 145.9z"
        ></path>
      </svg>
    </button>
    <div id="fileForm">
      <br />
      <label class="file-label" for="file-name" v-if="isUpdate"
        >What would you like to change about this folder?</label
      >
      <label for="file-name" class="file-label" v-else
        >What would you like to call this folder?</label
      >
      <input
        type="text"
        name="file-name"
        class="file-name"
        v-model="name"
        input="file-name"
      />
      <br />
      <label for="file-color" class="file-color">Folder Color: </label>
      <input
        type="color"
        class="color-input"
        name="file-color"
        id="file-color"
        v-model="color"
        input="file-color"
      />
      <br />
      <label for="file-color" class="file-color">Hover Folder Color: </label>
      <input
        type="color"
        class="color-input"
        name="file-hover"
        id="file-hover"
        v-model="hoverColor"
        input="file-hover"
      />
      <br />
      <button
        type="button"
        class="auth-btn"
        @click="onSubmit"
        v-if="isUpdate"
      >
        Update Folder.
      </button>
      <button
        type="button"
        id="create-folder"
        @click="onSubmit"
        class="auth-btn"
        v-else
      >
        Create Folder.
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileForm",
  data() {
    return {
      name: "",
      //isActive: false,
      tempFile: {},
      isUpdate: false,
      color: "#0000ff",
      hoverColor: "#0000ff",
    };
  },
  created() {
    // Set isUpdate to false when the component is created (page is first loaded).
    this.isUpdate = false;
  },
  props: {
    fileFormUpdate: Boolean,
    folderToUpdate: Object,
  },
  emits: [
    "toggle-file-creation",
    "add-file",
    "close-file-creation",
    "update-file",
  ],
  watch: {
    folderToUpdate: {
      immediate: true,
      handler(newValue) {
        if(newValue){
          this.name = newValue.name || "";
        this.color = newValue.color || "#0000ff";
        this.hoverColor = newValue.hoverColor || "#0000ff";
        this.isUpdate = true; // Set to true when folderToUpdate is provided.
        } else {
          // Reset form data when folderToUpdate is not provided (e.g., adding mode).
          this.name = "";
          this.color = "#0000ff";
          this.hoverColor = "#0000ff";
          this.isUpdate = false;
        }  
      },
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.name) {
        alert("Please enter a name for the file.");
        return;
      }
      if (this.isUpdate) {
        this.folderToUpdate.name = this.name;
        this.folderToUpdate.color = this.color;
        this.folderToUpdate.hoverColor = this.hoverColor;
        console.log(this.folderToUpdate);
        this.$emit("update-file", this.folderToUpdate);
      } else {
        const item = {
          name: this.name,
          isActive: false,
          color: this.color,
          hoverColor: this.hoverColor,
          content: {
            name: this.name,
            passCardList: [],
          },
        };
        this.$emit("add-file", item);
      }

      this.resetData(); // Reset the form data
      this.$emit("close-file-creation");
    },
    emitForm(){
      this.$emit('show-popup')
      this.popupBoxUpdate = false
      this.resetData(); // Call resetData() when closing the popup
    },
    resetData() {
      this.name = "";
      this.color = '#0000ff';
      this.hoverColor = '#0000ff'
    },
    closeForm(){
      //this.isUpdate = false;
      //this.resetData()
      this.$emit('close-file-creation')
    }
  },
};
</script>
