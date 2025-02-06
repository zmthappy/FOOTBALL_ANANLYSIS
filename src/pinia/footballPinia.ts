import { defineStore } from "pinia";

export const useFootballStore = defineStore("football", {
  // 存储状态的
  state: () => {
    return {
      test: "football",
    };
  },
});
