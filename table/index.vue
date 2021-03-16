<template>
  <section class="index">
    <myTable :columns="columns" :height="400" :orderBy.sync="orderBy" @sort="sort" :selectedItems.sync="selectedItems" :data="data" border stripe></myTable>
    {{ selectedItems }}
    <p>{{ orderBy }}</p>
  </section>
</template>

<script>
import myTable from './components/my-table'
export default {
  name: 'index',
  components: { myTable },
  data() {
    return {
      // 如何排序
      orderBy: {
        // 不写就是不排序
        name: true, //能排序
        age: 'asc', //正序
        address: 'desc', //倒序
      },
      selectedItems: [ {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: '我的内容比较多 我的内容比较多 我的内容比较多',
          date: '2016-10-03',
        },],
      columns: [
        {
          title: '标题',
          key: 'name',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          key: 'address',
        },
        {
          title: '日期',
          key: 'date',
        },
      ],
      data: [
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: '我的内容比较多 我的内容比较多 我的内容比较多',
          date: '2016-10-03',
        },
        {
          id: 2,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          id: 3,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          id: 4,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
        {
          id: 5,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          id: 6,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          id: 7,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          id: 8,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
        {
          id: 9,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          id: 10,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          id: 11,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          id: 12,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
        {
          id: 13,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          id: 14,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          id: 15,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          id: 16,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
    }
  },
  methods: {
    sort(data) {
      // todo请求接口
      console.log(data)
    },
  },
}
</script>

<style scoped lang="less">
</style>
