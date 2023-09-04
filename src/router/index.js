import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PassGen from "../views/PassGen.vue";
import MainView from "../views/MainView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import { auth } from "../firebase/init.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/generator",
    name: "generator",
    component: PassGen,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let initialAuthChecked = false;

router.beforeEach(async (to, from, next) => {
  if (!initialAuthChecked) {
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        initialAuthChecked = true;
        resolve();
      });
    });
  }

  if (to.path === "/login" && auth.currentUser) {
    next("/main");
    return;
  }

  if (to.path === "/register" && auth.currentUser) {
    next("/main");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
