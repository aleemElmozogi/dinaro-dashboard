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
      path: "index/",
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
    {
      path: "show/:id",
      component: () => import("@/features/users/pages/show.vue"),
      name: ERoutesName.USERS_SHOW,
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
          {
            text: "عرض المستخدم",
            router_name: ERoutesName.USERS_SHOW,
          },
        ],
      },
    },
  ],
};

export default routes;
