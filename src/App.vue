<template>
    <nav>
      <img src="./assets/passvault2.png" width="80" height="80" />
      <router-link to="/">Home</router-link> 
      <router-link to="/main">Dashboard</router-link> 
      <router-link to="/generator">Password Generator</router-link> 
      <router-link to="/login">Login</router-link> 
      <router-link to="/register">Register</router-link> 
    </nav>
  <router-view />
</template>
<script>
import { eventBus } from "./main.js";

export default {
  components: {},
  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
<style scoped>
nav {
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  gap: 15px;
  background-color: #ffffff;
  margin-bottom: 10px;
}

nav a {
  text-decoration: none;
  color: #000000;
  margin-top: 20px;
  font-weight: 10px;
  height: 35px;
  transition: padding-top 0.5s ease;
}

nav a:hover{
  color: #3f3939;
  border-radius: 5px;
  padding-top: 20px;
  background-color: aliceblue;
}
</style>
