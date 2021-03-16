<template>
  <SubMenu>
    <template #title>{{ data.title }}</template>
    <template v-for="child in data.children">
      <!-- 如果没儿子 直接渲染 MenuItem  有儿子 将儿子递归传入 -->
      <MenuItem v-if="!child.children" :key="child.title">{{ child.title }}'----'</MenuItem>
      <!-- 用名字取到自己 -->
      <ReSub v-else :key="child.title" :data="child"></ReSub>
    </template>
  </SubMenu>
</template>

<script>
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
export default {
  name: 'ReSub',
  props: {
    data: Object,
    default: () => ({}),
  },
  components: {
    MenuItem,
    SubMenu,
  },
}
</script>

<style scoped>
</style>
