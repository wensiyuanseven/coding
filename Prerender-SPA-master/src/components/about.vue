<template>
  <section class="about">
    <!-- 把v-else中的dom节点复制到 此处一份 -->
    <h2 v-if="loading">我是loading....骨架屏</h2>
    <div v-else>
      <h2>我是关于页面</h2>
      <h2>{{ data }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      data: '',
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      // if (window['__PRERENDER_INJECTED']) {
      //   return
      // }
      this.data = '我是异步渲染出来的数据'
      // this.$nextTick(() => {
      //   document.dispatchEvent(new Event('render-event'))
      // })
      this.loading = false
    }, 3000)
  },
}
</script>