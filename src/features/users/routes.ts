import { ERoutesName } from "@/core/constant/ERoutesName";
import { RouteRecordRaw, RouterView } from "vue-router";

const routes: RouteRecordRaw = {
  path: "/users/",
  component: RouterView,
  name: ERoutesName.USERS,
  redirect: { name: ERoutesName.USERS_INDEX },
  meta: {
    breadcrumb: [
      {
        text: "المستخدمين",
        router_name: ERoutesName.USERS,
      },
    ],
  },
  children: [
    {
      path: "/index/",
      component: () => import("@/features/users/pages/index.vue"),
      name: ERoutesName.USERS_INDEX,
      meta: {
        breadcrumb: [
          {
            text: "المستخدمين",
            router_name: ERoutesName.USERS,
          },
          {
            text: "قائمة المستخدمين",
            router_name: ERoutesName.USERS_INDEX,
          },
        ],
      },
    },
  ],
};

export default routes;
