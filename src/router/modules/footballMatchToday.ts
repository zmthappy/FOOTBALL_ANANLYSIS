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
  {
    path: "/FootBall/BetMatchTable",
    name: "betMatchTable",
    component: () => import("@/views/FootBall/BetMatchTable.vue"),
    meta: {
      title: "投注数据",
    },
  },
  {
    path: "/FootBall/DeepChoiceMatch",
    name: "DeepChoiceMatch",
    component: () => import("@/views/FootBall/DeepChoiceMatch.vue"),
    meta: {
      title: "重点赛事",
    },
  },
];

export default routeres;
