<template>
  <div class="input-icons">
    <i class="uil uil-search icon" style="color: black;"></i>
    <input
      type="text"
      name="searchBar"
      id="searchBar"
      placeholder="search for a folder"
      v-model="searchItem"
    />
  </div>

  <div id="file-list">
    <FileItem
      :key="file"
      v-for="file in displayedFolders"
      :file="file"
      @delete-file="$emit('delete-file', file)"
      @add-active="$emit('add-active', file)"
      @edit-folder="editFolder"
    />
  </div>
</template>
<script>
import FileItem from "./FileItem.vue";
import { mapState } from "vuex";

export default {
  emits: ["add-active", "delete-file", "edit-folder"],
  props: {
    files: Array,
    userFiles: Array,
  },
  components: {
    FileItem,
  },
  computed: {
    displayedFolders() {
      if (this.searchItem.trim() === "") {
        return this.userFiles;
      } else {
        return this.userFiles.filter((folder) =>
          folder.name.toLowerCase().includes(this.searchItem.toLowerCase())
        );
      }
    },
  },
  data() {
    return {
      searchItem: "",
    };
  },
  methods: {
    editFolder(folder) {
      this.$emit("edit-folder", folder);
    },
  },
};
</script>
<style scoped>
input {
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #000000fa;
  font-size: 15px;
  max-width: 200px;
}
</style>
