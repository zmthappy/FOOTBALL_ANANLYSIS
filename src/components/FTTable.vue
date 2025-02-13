<template>
  <div class="table-container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      height="Height"
      stripe="stripe"
      max-height="maxHeight"
      style="width: 100%"
      highlight-current-row
      :row-key="rowKey"
      @select="main.tableSigleSelect"
      @cell-click="main.cellClick"
      @cell-dblclick="main.cellDbclick"
      @row-click="main.rowClick"
      @row-dblclick="main.rowDbclick"
    >
      <slot></slot>
    </el-table>
    <!-- 分页信息 -->
    <div class="tablepage-container">
      <el-pagination
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableOption.total"
        :page-sizes="tableOption.pageSizes"
        v-model:current-page="tableOption.currentPage"
        v-model:page-size="tableOption.pageSize"
        @size-change="main.handleSizeChange"
        @current-change="main.handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({});
// 传递的参数
const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default: () => [],
  },
  //   固定高度
  Height: {
    type: Number || String,
    default: 500,
  },
  //   最大高度
  maxHeight: {
    type: Number || String,
    default: 500,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  //   唯一键
  rowKey: {
    type: String,
    default: "id",
  },

  //  分页信息
  tableOption: {
    type: Object,
    default: () => {
      return {
        currentPage: 1, //当前页
        pageSize: 50, //分页数
        pageSizes: [50, 100, 200, 300],
        total: 100, //总数
        tableSelectd: [], //选中的行数
      };
    },
  },
});

// 传递参数事件
const emits = defineEmits([
  "tableSigleSelect",
  "cellClick",
  "cellDbclick",
  "rowClick",
  "rowDbclick",
  "getList",
]);

function useMain() {
  const state = reactive({});
  // 单个选中
  function tableSigleSelect(selection: Array, row: Object) {
    emits("tableSigleSelect", { selection: selection, row: row });
  }

  // 单元格点击
  function cellClick({ row, column, cell, event }) {
    emits("cellClick", {
      row: row,
      column: column,
      cell: cell,
    });
  }
  // 单元格双击
  function cellDbclick({ row, column, cell, event }) {
    emits("cellDbclick", {
      row: row,
      column: column,
    });
  }
  // 行单击
  function rowClick({ row, column, event }) {
    emits("rowClick", {
      row: row,
      column: column,
    });
  }
  // 行双击
  function rowDbclick({ row, column, event }) {
    emits("rowDbclick", {
      row: row,
      column: column,
    });
  }
  //   分页数改变
  function handleSizeChange(val: number) {
    props.tableOption.pageSize = val;
    emits("getList");
  }
  //   页数改变
  function handleCurrentChange(val: number) {
    props.tableOption.currentPage = val;
    emits("getList");
  }

  return reactive({
    state,

    tableSigleSelect,
    cellClick,
    cellDbclick,
    rowClick,
    rowDbclick,

    handleSizeChange,
    handleCurrentChange,
  });
}

let main = useMain();
</script>

<style lang="scss" scoped>
/* @import url(); 引入css类 */
.table-container {
  width: 100%;
}
.tablepage-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
}
</style>
