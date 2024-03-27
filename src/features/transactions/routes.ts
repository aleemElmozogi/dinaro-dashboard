import { ERoutesName } from "@/core/constant/ERoutesName";
import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
  path: "/transaction/",
  component: RouterView,
  name: ERoutesName.TRANSACTIONS,
  redirect: { name: ERoutesName.TRANSACTIONS_INDEX },
  meta: {
    breadcrumb: [
      {
        text: "المعاملات",
        router_name: ERoutesName.TRANSACTIONS_INDEX,
      },
    ],
  },
  children: [
    {
      path: "index/",
      component: () => import("@/features/transactions/pages/index.vue"),
      name: ERoutesName.TRANSACTIONS_INDEX,
      meta: {
        breadcrumb: [
          {
            text: "المعاملات",
            router_name: ERoutesName.TRANSACTIONS,
          },
          {
            text: "قائمة المعاملات",
            router_name: ERoutesName.TRANSACTIONS_INDEX,
          },
        ],
      },
    },
  ],
};

export default routes;
