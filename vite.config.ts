import { defineConfig, loadEnv } from "vite"; // 引入 Vite 中的 defineConfig 函数
import vue from "@vitejs/plugin-vue"; // 引入 Vite 中的 Vue 插件
import path from "path";
// 或者使用 unplugin-element-plus
import ElementPlus from "unplugin-element-plus/vite";
import sass from "sass";

// Vite 配置对象
export default defineConfig({
  // 配置 Vite 插件
  plugins: [
    vue(), // element-plus配置
    // 或者使用 unplugin-element-plus
    ElementPlus({
      useSource: true,
    }),
  ],
  // 配置开发服务器
  server: {
    host: "0.0.0.0", //将监听所有地址，包括局域网和公网地址
    port: 8080,
    cors: true,
    proxy: {
      // 使用 proxy 实例
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
        implementation: sass,
      },
    },
  },
});
