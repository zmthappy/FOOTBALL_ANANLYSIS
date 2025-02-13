import { RouteRecordRaw } from "vue-router";

const routeres: Array<RouteRecordRaw> = [
  {
    path: "/AIChat/DeepSeekChat",
    name: "deepSeekChat",
    component: () => import("@/views/AIChat/DeepSeekChat.vue"),
    meta: {
      title: "deepseekChat",
    },
  },
];

export default routeres;
