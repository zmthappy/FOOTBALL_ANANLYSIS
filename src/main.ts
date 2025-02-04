import { createApp } from "vue";
import App from "./App.vue";
import https from "@/utils/http";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App);
app.config.globalProperties.$https = https;

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
