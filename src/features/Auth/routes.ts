import { ERoutesName } from "@/core/constant/ERoutesName";
import { RouteRecordRaw } from "vue-router";
import Layout from "./components/Layout.vue";

const routes: RouteRecordRaw = {
  path: "/auth/",
  component: Layout,
  name: ERoutesName.AUTH,
  redirect: { name: ERoutesName.LOGIN },
  meta: {
    guest: true,
  },
  children: [
    {
      path: "login",
      name: ERoutesName.LOGIN,
      component: () => import("@/features/Auth/pages/Login.vue"),
      meta: {
        guest: true,
      },
    },
    {
      path: "activate",
      name: ERoutesName.ACTIVATE_ACCOUNT,
      component: () => import("@/features/Auth/pages/Activate.vue"),
      meta: {
        guest: true,
      },
    },
  ],
};

export default routes;
