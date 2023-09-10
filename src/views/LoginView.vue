<template>
  <div class="generator">
    <h1 style="text-align: center">Login</h1>
    <form @submit.prevent="login" class="auth-form">
      <input
        type="email"
        placeholder="Email"
        required
        v-model="loginForm.email"
        class="auth-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        required
        v-model="loginForm.password"
        class="auth-input"
      />
      <br />
      <button type="submit" class="auth-btn">Login</button>
    </form>
    <div class="alphabet">
      <button @click="loginWithGoogle" class="google-sign-in-button">
        Login With Google
      </button> 
    </div>
    <p style="text-align: center;">
      Don't have an account?
      <span @click="this.$router.push({ name: 'register' })">Register</span>
    </p>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { eventBus } from "../main.js";
import { ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
      loginForm: ref({}),
      store: useStore(),
    };
  },
  methods: {
    login() {
      this.store.dispatch("login", this.loginForm);
    },
    loginWithGoogle() {
      this.store.dispatch("loginWithGoogle");
    },
  },
  beforeUpdate() {
    if (auth.currentUser) {
      router.push({ name: "main" });
    }
  },
};
</script>

<style scoped>
span {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

span:hover {
  color: rgb(55, 196, 201);
}
</style>
