import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import Layout from "@/core/layout/Layout.vue";
import authRoute from "@/features/Auth/routes";
import homeRoutes from "@/features/dashboard/routes";
import usersRoutes from "@/features/users/routes";
import walletRoutes from "@/features/wallet/routes";
import transactionsRoutes from "@/features/transactions/routes";

import { ERoutesName } from "./core/constant/ERoutesName";
import { navigationGuards } from "./core/middleware/navigationGuards";

export const dashboardRoutes: RouteRecordRaw = {
  path: "/",
  component: Layout,
  name: ERoutesName.MAIN,
  redirect: { name: ERoutesName.DASHBOARD },
  children: [homeRoutes, usersRoutes, walletRoutes, transactionsRoutes],
  meta: {
    breadcrumb: [
      {
        text: "الرئيسية",
        router_name: ERoutesName.MAIN,
      },
    ],
  },
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [authRoute, dashboardRoutes],
});

router.beforeEach(async (to, from, next) => navigationGuards(to, from, next));

export default router;
