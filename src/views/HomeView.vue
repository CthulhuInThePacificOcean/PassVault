<template>
  <div class="home">
    <img alt="Passvault logo" src="../assets/passvault2.png" style="margin-left: 400px;"/>
    <button
      @click="this.$router.push({ name: 'login' })"
      class="auth-btn"
      style="font-size: 30px; margin-bottom: 5px;"
    >
      Get Started
    </button>
  </div>
  <h2 style="font-size: 60px;">What is PassVault?</h2>
  <p style="font-size: 40px;">
    PassVault was created to provide users with a safe place to store one's
    passwords and important information. PassVault allows you to store groups of passwords in folders allowing for simple navigation. 
  </p>
  <span style="font-size: 30px; background-color: rgb(243, 247, 2); font-weight: bold;">Keep in mind that this was a project
    made for fun to learn vue. Use at your own risk.</span>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.home {
  
  background-color: rgb(122, 140, 255);
}
</style>
