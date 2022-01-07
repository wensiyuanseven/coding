<template>
  <section class="table-wrapper">
    <table class="table">
      <!-- 表头 -->
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.title }}</th>
        </tr>
      </thead>
      <!-- 表体 -->
      <tbody>
        <!-- 行 -->
        <tr v-for="row in data" :key="row.id">
          <!-- 列 -->
          <td v-for="column in columns" :key="column.key">{{ row[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
export default {
  name: 'my-table',
  props: {
    // 列
    columns: {
      type: Array,
      default: () => [],
    },
    // 数据
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.table-wrapper {
  width: 80%;
  margin: 0 auto;
  .table {
    // 防止表格两条线重叠
    border-collapse: collapse;
    //去掉表格间隙
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ccc;
    th,
    td {
      border: 1px solid #ccc;
      padding: 8px; // 加间距
      text-align: center; //左对齐
    }
  }
}
</style>
