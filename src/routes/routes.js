import { createRouter, createWebHistory } from "vue-router";
import dashboard from "../views/dashboard.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Signin,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    redirect: dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
