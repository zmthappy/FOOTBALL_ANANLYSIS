import { defineStore } from "pinia";

export const useFootballStore = defineStore("football", {
  // 存储状态的
  state: () => {
    return {
      test: "football",
      users: [
        {
          id: 1,
          name: "FT",
        },
      ],
      counter: 0,
    };
  },
  // 可以异步获取
  actions: {
    increment() {
      this.counter++;
    },
  },
  // 不是异步获取---状态值
  getters: {
    // 接受参数
    getParamsById(state) {
      return (id) => state.users.findIndex((t) => t.id == id);
    },
  },
});
