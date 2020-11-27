<template>
  <section class="table-wrapper" ref="tableWrapper">
    <div :style="{ height: height + 'px' }" class="scroll-box" ref="scrollBox">
      <table class="table" :class="{ border, stripe }" ref="table">
        <!-- 固定宽度必须定义colgroup-->
        <colgroup>
          <!-- todowidth需要动态计算出来 -->
          <col width="150" v-for="column in columns" :key="column.key" />
        </colgroup>
        <thead>
          <tr>
            <th><input type="checkbox" ref="checkAll" @change="changeAllItems" :checked="checkedAllStatus" /></th>
            <th v-for="column in columns" :key="column.key">
              <div class="th-head" @click="sort(column)">
                {{ column.title }}
                <!-- todo 可以换成图标  添加事件，点击的时候排序-->
                <span v-if="column.key in orderBy">
                  <i :class="{ active: orderBy[column.key] === 'asc' }">正序</i>
                  <i :class="{ active: orderBy[column.key] === 'desc' }">倒序</i>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <!-- 表体 -->
        <tbody ref="tBody">
          <!-- 行 -->
          <tr v-for="row in data" :key="row.id">
            <td style="width: 50px"><input type="checkbox" @change="changeItem(row, $event)" :checked="isChecked(row)" /></td>
            <!-- 列 -->
            <td v-for="column in columns" :key="column.key">{{ row[column.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'my-table',
  props: {
    height: Number,
    //   如何排序
    orderBy: {
      type: Object,
      default: () => {},
    },
    //当前用户选中了哪一项
    selectedItems: {
      type: Array,
      default: () => [],
    },
    // 隔行变色
    stripe: {
      type: Boolean,
      default: false,
    },
    //   是否加边框
    border: {
      type: Boolean,
      default: false,
    },
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
  mounted() {
    // 固定表头
    if (this.height) {
      let table = this.$refs.table
      let copyTable = table.cloneNode() //拷贝表格
      let copyColgroup = table.children[0].cloneNode(true) //true会复制所有子节点的内容
      let thead = table.children[1]
      let theadHeight = thead.getBoundingClientRect().height
      copyTable.appendChild(copyColgroup) // appendChild具有移动性
      copyTable.appendChild(thead) // appendChild具有移动性
      copyTable.classList.add('fix-table')
      this.$refs.scrollBox.appendChild(copyTable)
      this.$refs.tableWrapper.style.paddingTop = theadHeight + 'px'
      //处理表头不固定问题
      //   let td = this.$refs.tBody.children[0].children
      //   thead.children[0].children.forEach((item, index) => {
      //     // console.log(item.getBoundingClientRect().width)
      //     // td[index].style.width = '100px'
      //     // item.style.width = '100px'
      //   })
    }
  },
  watch: {
    selectedItems() {
      if (this.data.length !== this.selectedItems.length) {
        if (this.selectedItems.length !== 0) {
          console.log(this.$refs.checkedAll)
          // 半选 细节可看张鑫旭
          return (this.$refs.checkAll.indeterminate = true)
        }
      }
      return (this.$refs.checkAll.indeterminate = false)
    },
  },
  computed: {
    checkedAllStatus() {
      return this.data.length === this.selectedItems.length
    },
  },
  methods: {
    sort(column) {
      if (!this.orderBy[column.key]) return
      let copyOrderBy = cloneDeep(this.orderBy)
      if (copyOrderBy[column.key] === 'asc') {
        copyOrderBy[column.key] = 'desc'
      } else if (copyOrderBy[column.key] === 'desc') {
        copyOrderBy[column.key] = true
      } else {
        copyOrderBy[column.key] = 'asc'
      }
      this.$emit('update:orderBy', copyOrderBy)
      this.$emit('sort', copyOrderBy)
    },
    //是否选中
    isChecked(row) {
      return this.selectedItems.some((item) => item.id == row.id)
    },
    // 全选
    changeAllItems(event) {
      this.$emit('update:selectedItems', event.target.checked ? this.data : [])
    },
    changeItem(row, event) {
      let copySelectedItems = cloneDeep(this.selectedItems)
      if (event.target.checked) {
        //选中放入
        copySelectedItems.push(row)
      } else {
        //反选删除
        let index = copySelectedItems.findIndex((item) => item.id == row.id)
        copySelectedItems.splice(index, 1)
      }
      this.$emit('update:selectedItems', copySelectedItems)
    },
  },
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.table-wrapper {
  width: 751px;
  margin: 0 auto;
  position: relative;
  .scroll-box {
    overflow-y: auto;
  }
  .fix-table {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    width: 750px;
  }
  table {
    width: 750px;
    /* 必须要设置为fixed，这样列宽就可以由表格宽度和列宽度设定了 */
    table-layout: fixed;
    // 防止表格两条线之间重叠
    border-collapse: collapse;
    //去掉表格间隙
    border-spacing: 0;
    //加border
    &.border {
      border: 1px solid #ccc;
      th,
      td {
        border: 1px solid #ccc;
      }
    }
    // 隔行变色
    &.stripe {
      tbody {
        tr:nth-child(even) {
          background: #eee;
        }
      }
    }
    th {
      background: #eee;
    }
    th,
    td {
      // 行列默认只加下边框
      border-bottom: 1px solid #ccc;
      padding: 10px; // 加间距
      text-align: left; // 左对齐
      width: 150px;
    }
    .th-head {
      cursor: pointer;
      i {
        font-size: 12px;
        padding-right: 5px;
        &.active {
          color: red;
        }
      }
    }
  }
}
</style>
