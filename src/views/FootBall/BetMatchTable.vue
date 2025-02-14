<template>
  <div class="container">
    <FTTable
      :tableData="mainTable.state.tableData"
      :maxHeight="500"
      @getList="mainTable.getList"
    ></FTTable>
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import FTTable from "@/components/FTTable.vue";

const { appContext } = getCurrentInstance();
const request = appContext.config.globalProperties.$https;

function useMainTable() {
  const state = reactive({
    qurey: {},
    tableOption: {
      currentPage: 1, //当前页
      pageSize: 50, //分页数
      pageSizes: [50, 100, 200, 300],
      total: 100, //总数
      tableSelectd: [], //选中的行数
      loading: false,
    },
    tableData: [], //表格数据
  });

  //   获取表格数据
  async function getList() {
    state.tableOption.loading = true;
    let res = await request.Post("/football", state.qurey);
    state.tableData = [];
    state.tableOption.loading = false;
  }

  return reactive({
    state,
  });
}

let mainTable = useMainTable();
</script>

<style lang="scss" scoped>
.container {
  width: 1500px;
  margin-top: 48px;
}
</style>
