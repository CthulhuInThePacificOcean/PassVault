<template>
  <div class="input-icons">
    <i class="uil uil-search icon" style="color: black;"></i>
    <input
      type="text"
      name="searchBar"
      id="searchBar"
      placeholder="search for a card"
      v-model="searchItem"
    />
  </div>

  <ContentView
    v-for="file in userFiles"
    :userFiles="userFiles"
    :key="file.content.name"
    :file="file"
    :searchItem="searchItem"
    @show-popup="$emit('show-popup')"
    @edit-card="editCard"
    @save-file="$emit('save-file')"
    @log-folder="logFolder"
  />
</template>

<script>
import ContentView from "./ContentView.vue";
import { mapState } from "vuex";

export default {
  components: {
    ContentView,
  },
  data() {
    return {
      searchItem: "",
    };
  },
  props: {
    files: Array,
    userFiles: Array,
    fileContents: Array,
    userFileContents: Array,
  },
  emits: ["show-popup", "save-file", "edit-card", "log-folder"],
  methods: {
    editCard(card) {
      this.$emit("edit-card", card);
    },
    logFolder() {
      console.log(this.userFiles);
    },
  },
};
</script>

<style scoped>
input {
  max-height: 35px;
  width: 200px;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #000000fa;
}
</style>
