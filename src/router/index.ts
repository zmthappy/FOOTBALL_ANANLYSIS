import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 获取所有路由配置文件
let routerModule = import.meta.glob("./modules/**.ts", { eager: true });

let footballMatchToday = [];
let aiChat = [];

for (const keysMoudle of Object.keys(routerModule)) {
  let spliceKeys = keysMoudle.split("/")[2].split(".")[0];
  switch (spliceKeys) {
    case "footballMatchToday":
      footballMatchToday = routerModule[keysMoudle].default;
      break;
    case "aiChat":
      aiChat = routerModule[keysMoudle].default;
      break;
  }
}

const routes: Array<RouteRecordRaw> = [
  // 首页路由重定向
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    redirect: "/FootBall/ToDayMatch",
    component: () => import("@/views/Layout/homeLayout.vue"),
    children: footballMatchToday.concat(aiChat),
  },
];

//创建路由
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  routes,
});

export default router;
