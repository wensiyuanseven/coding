<template>
  <!-- 递归自己 -->
  <el-submenu v-if="item.children.length" :index="item.auth">
    <template slot="title">{{ item.name }}</template>
    <template v-for="(m, i) in item.children">
      <MenuItem :item="m" :key="i"></MenuItem>
    </template>
  </el-submenu>
  <el-menu-item :index="item.auth" v-else>
   ---- {{ item.auth }}
    <!-- name对应path 会把相应的父组件也会渲染出来的  -->
    <router-link :to="{ name: item.auth }">{{ item.name }}</router-link>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>