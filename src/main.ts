import { createApp } from "vue";
import App from "./App.vue";
import https from "@/utils/http.ts";
import router from "./router";
// elemet plus 相关引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/theme-chalk/src/index.scss"; //按需修改整体样式
// 引入状态pinia
import { createPinia } from "pinia";
import MateChat from "@matechat/core";
import "@devui-design/icons/icomoon/devui-icon.css";

const app = createApp(App);
app.config.globalProperties.$https = https;

app.use(MateChat);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(createPinia());
app.mount("#app");
