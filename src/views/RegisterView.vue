<template>
  <div class="generator">
    <h1 style="text-align: center">Register an Account</h1>
    <form @submit.prevent="signUp" class="auth-form">
      <input
        type="text"
        placeholder="Display Name"
        required
        v-model="registerForm.username"
        class="auth-input"
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        required
        v-model="registerForm.email"
        class="auth-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        required
        v-model="registerForm.password"
        class="auth-input"
      />
      <br />
      <button type="submit" class="auth-btn">Create Account</button>
    </form>
    <div class="alphabet">
      <button @click="registerWithGoogle" class="google-sign-in-button">
        Register With Google
      </button>
    </div>
    <p style="text-align: center;">
      Already have an account?
      <span @click="this.$router.push({ name: 'login' })">Login</span>
    </p>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { eventBus } from "../main.js";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      registerForm: ref({}),
      store: useStore(),
    };
  },
  methods: {
    signUp() {
      this.store.dispatch("register", this.registerForm);
    },
    registerWithGoogle() {
      this.store.dispatch("registerWithGoogle");
    },
  },
};
</script>

<style scoped>
span {
  color: blue;
  text-decoration: underline;
}

span:hover {
  color: rgb(55, 196, 201);
}
</style>
