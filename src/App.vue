<script setup lang="ts">
import request from "@/utils/http";
import { onMounted } from "vue";
import dayjs from "dayjs"

async function test() {
  // let res = await request.Get(`/static/no_cache/league/zc/jsbf/ttyq2020/jczq/jsbf_2024-12-14.json?v=${new Date().getTime()}`, {});
  let res = await request.Get(`/football`, {});
  console.log(res, "Res");

}

onMounted(() => {
  test();


})


</script>

<template>
  <div>
    11111111111
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
