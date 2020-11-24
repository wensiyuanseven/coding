<template>
  <div id="app">
    <!-- 渲染子组件 -->
    <router-view></router-view>
    <Menu></Menu>
    <el-button v-has="'edit'">编辑</el-button>
    <el-button v-has="'add'">添加</el-button>
  </div>
</template>
<script>
import Menu from './components/Menu'
export default {
  directives: {
    has: {
      // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      inserted(el, bindings, vnode) {
        // 拿到当前实例
        let flag = vnode.context.$store.state.btnPermission[bindings['value']]
        // 如果没有 移除当前元素
        !flag && el.parentNode && el.parentNode.removeChild(el)
      },
    },
  },
  components: {
    Menu,
  },
}
</script>