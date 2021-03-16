<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    {{ $store.state.menuList }}
    <template v-for="(item, index) in $store.state.menuList">
      <!-- 根据数据递归侧边栏 -->
      <MenuItem :item="item" :key="index"></MenuItem>
    </template>
  </el-menu>
</template>
<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem,
  },
}
</script>