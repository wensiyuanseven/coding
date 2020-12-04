<template>
  <!-- v-if的作用是有数据才进行渲染 -->
  <el-tree :data="allData" icon-class="abc" v-if="allData.length" default-expand-all :expand-on-click-node="false" :render-content="renderEvent"> </el-tree>
</template>
<script>
import _ from 'lodash' // 提供克隆的插件
export default {
  data() {
    return {
      allData: [],
      currentId: '', // 默认当前触发修改的id
      currentContent: '', // 当前触发修改的内容
    }
  },
  props: {
    // 获取父组件的数据
    data: {
      type: Array,
      default: () => [], // 初始默认值
    },
    fileDrop: Array,
    folderDrop: Array,
    delete: Function, // 这边获取到操作的属性
  },
  watch: {
    //监听数据变化，因为在子组件渲染完成时，数据可能还未更新，那么我们就需要对其进行监听并更新
    data() {
      // 数据更新了就重新进行渲染
      this.transferData()
    },
  },
  methods: {
    transferData() {
      // 数据格式化操作
      // 首先要对数据进行克隆 => 因为在子组件内不能修改父组件的数据
      let AllData = _.cloneDeep(this.data)
      let treeList = AllData.reduce((memo, current) => {
        // 树的映射列表
        current.label = current.name // el-tree的数据格式
        memo[current.id] = current
        return memo
      }, {})
      let result = AllData.reduce((arr, current) => {
        let pid = current.pid
        let parent = treeList[pid]
        if (parent) {
          // 有父文件时，也就不是根文件
          // 若这个节点还有子文件，则对其进行添加操作，反之，就相当于数组等同
          parent.children ? parent.children.push(current) : (parent.children = [current])
        } else if (pid === 0) {
          // 这是根文件夹
          arr.push(current)
        }
        return arr
      }, [])
      this.allData = result
    },
    renderEvent(h, { node, data }) {
      let dropList = this.isParent(data) ? this.folderDrop : this.fileDrop // 获取当前节点的下拉选项列表，判断当前节点是文件夹还是文件
      console.log(dropList)
      return (
        <div style={{ width: '50%' }}>
          {this.isParent(data) ? node.expanded ? <i class="el-icon-folder-opened"></i> : <i class="el-icon-folder"></i> : <i class="el-icon-folder-document"></i>}
          {/**进行重命名的输入框*/ data.id === this.currentId ? <el-input value={this.currentContent} on-input={this.handleInput} /**受控组件，如果想可以输入，就需要添加这个 */></el-input> : data.name}
          {
            /**操作时隐藏下拉按钮 */
            data.id === this.currentId ? (
              //  操作按钮
              <span>
                <el-button type="text" on-click={this.sureEvent.bind(this, data)}>
                  确认
                </el-button>
                <el-button type="text" on-click={this.cancelEvent}>
                  取消
                </el-button>
              </span>
            ) : (
              <el-dropdown
                placement="bottom-start"
                trigger="click" /**触发显示下拉框的事件形式*/
                on-command={
                  // () => { 这是一种写法，我们需要将data传进去，对其进行处理
                  //     this.handleCommand(data, value);
                  // }
                  this.handleCommand.bind(this, data) // 这是我们推荐的方法，这样相当于上面的写法
                } /**点击下拉菜单项触发的事件*/
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  {dropList.map((item) => (
                    <el-dropdown-item command={item.text} /**绑定的触发值*/>{item.value}</el-dropdown-item>
                  ))}
                </el-dropdown-menu>
              </el-dropdown>
            )
          }
        </div>
      )
    },
    isParent(data) {
      // 判断是不是父文件夹
      return data.type === 'parent'
    },
    handleCommand(data, value) {
      //点击下拉菜单项触发的事件 value其实就是我们当前触发的item.text的值
      console.log(111)
      if (value === 'rn') {
        this.handleRename(data)
      } else if (value === 'rm') {
        this.handleRemove(data)
      }
    },
    handleRename(data) {
      // 重命名
      this.currentId = data.id
      this.currentContent = data.name
    },
    handleRemove(data) {
      // 删除文件
      this.$confirm(`此操作将永久删除该文件,${data.name} 是否继续?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 不能直接将用户的数据进行删除，而是通过调用用户的方法进行删除操作
          // 如果用户传递了delete方法，可以直接调用
          this.delete
            ? this.delete(data.id).then(() => {
                this.remove(data.id)
              })
            : // 如果没有，直接进行删除即可
              this.remove(data.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    remove(id) {
      // 删除页面中的内容
      let allList = _.cloneDeep(this.data)
      allList = allList.filter((l) => l.id !== id) // 删除掉该项
      // .sync的用法，可以进行同步数据
      this.$emit('update:data', allList), // 通知父组件同步数据
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
    },
    sureEvent(data) {
      // 重命名确认事件
      let allList = _.cloneDeep(this.data)
      let item = allList.find((l) => l.id === data.id)
      item.name = this.currentContent
      this.currentId = ''
      // .sync的用法，可以进行同步数据
      this.$emit('update:data', allList), // 通知父组件同步数据
        this.$message({
          type: 'success',
          message: '修改成功!',
        })
    },
    cancelEvent() {
      // 重命名取消事件
      this.currentId = '' // 这是因为我们将currentId作为标识
    },
    handleInput(v) {
      // 受控组件 => 可以输入（非受控组件）
      this.currentContent = v
    },
  },
  mounted() {
    this.transferData()
  },
}
</script>
<style>
.abc::before {
  content: '自';
}
.el-tree {
  width: 50%;
  margin-top: 25px;
}
.el-dropdown {
  /* float: left; */
}
.el-tree .el-tree-node_content {
  height: 32px;
}
.el-tree .el-input {
  width: 50%;
}
</style>