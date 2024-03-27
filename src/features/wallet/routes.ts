import { ERoutesName } from "@/core/constant/ERoutesName";
import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
  path: "/wallet/",
  component: RouterView,
  name: ERoutesName.WALLET,
  redirect: { name: ERoutesName.WALLET_INDEX },
  meta: {
    breadcrumb: [
      {
        text: "المحافظ",
        router_name: ERoutesName.WALLET,
      },
    ],
  },
  children: [
    {
      path: "index/",
      component: () => import("@/features/wallet/pages/index.vue"),
      name: ERoutesName.WALLET_INDEX,
      meta: {
        breadcrumb: [
          {
            text: "المحافظ",
            router_name: ERoutesName.WALLET,
          },
          {
            text: "قائمة المحافظ",
            router_name: ERoutesName.WALLET_INDEX,
          },
        ],
      },
    },
   
  ],
};

export default routes;
