<template>
  <div class="home-layout">
    <div class="home-top-workbend">
      <div class="home-top-workbend-content">
        <div class="flex-layout">
          <div
            class="mune-item"
            :class="item.id == state.currentId ? 'mune-item-active' : ''"
            v-for="item in state.workBand"
            :key="item.id"
            @click="toRoutePath(item)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="home-workbend-right"></div>
      </div>
    </div>
    <div class="home-content">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
// 路由接口
interface footBallInterface {
  name: string;
  id: number;
  routePath: string;
}
export default defineComponent({
  name: "ComponentName",
  components: {},
  props: {
    name: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    let state = reactive({
      workBand: [
        {
          name: "今日赛事",
          id: 1,
          routePath: "/FootBall/ToDayMatch",
        },
        {
          name: "重点赛事",
          id: 5,
          routePath: "/FootBall/DeepChoiceMatch",
        },
        {
          name: "球队定位",
          id: 2,
          routePath: "/FootBall/TeamSetting",
        },
        {
          name: "FT助手",
          id: 3,
          routePath: "/AIChat/DeepSeekChat",
        },
        {
          name: "betHistory",
          id: 4,
          routePath: "/FootBall/BetMatchTable",
        },
      ],
      currentId: 1,
    });

    function toRoutePath(itemValue: footBallInterface) {
      state.currentId = itemValue.id;
      router.push({
        path: itemValue.routePath,
      });
    }

    onMounted(() => {
      router.push({
        path: "/FootBall/ToDayMatch",
      });
    });

    return {
      state,
      toRoutePath,
    };
  },
});
</script>
<style scoped lang="scss">
.home-top-workbend {
  //   padding: 8px 32px;
  background-color: var(--primary-color--);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .home-top-workbend-content {
    min-width: 1500px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-workbend-right {
      min-width: 200px;
    }
  }

  .mune-item {
    color: #ffffff;
    font-size: 16px;
    padding: 0 4px;
    cursor: pointer;
    margin-left: 8px;
    position: relative;
    line-height: 40px;
    transition: all 0.2s ease-in;
  }

  .mune-item-active {
    color: var(--primary-focus-color--);
    // color: bisque;
    background-color: var(--secondary-assistant-color--);
  }

  .mune-item:hover {
    // top: -2px;
    color: var(--primary-focus-color--);
    // color: bisque;
    // font-size: 18px;
  }

  .menu-item::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #007bff;
    transition: width 0.5s ease;
  }

  /* 鼠标悬停时扩展进度条 */
  .menu-item:hover::after {
    width: 100%; /* 扩展到 100% */
  }
}

.home-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
