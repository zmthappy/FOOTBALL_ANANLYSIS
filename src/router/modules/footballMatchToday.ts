import { RouteRecordRaw } from "vue-router";

const routeres: Array<RouteRecordRaw> = [
  {
    path: "/FootBall/ToDayMatch",
    name: "toDayMatch",
    component: () => import("@/views/FootBall/ToDayMatch.vue"),
    meta: {
      title: "今日赛事",
    },
  },
  {
    path: "/FootBall/TeamSetting",
    name: "teamSetting",
    component: () => import("@/views/FootBall/TeamSetting.vue"),
    meta: {
      title: "球队定位",
    },
  },
];

export default routeres;
