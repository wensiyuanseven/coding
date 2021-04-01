// 客户端打包
import createApp from "./main";
const { app, store } = createApp(); //执行导出的函数

// 这个地方并不需要注入vuex 而是拿到之后替换而已
// 浏览器执行的时候需要将服务端设置的最新状态，替换掉客户端的状态。
if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
  // 用服务端的数据替换,变成当前最新的状态
  // 浏览器中的状态就会变成服务器最新的状态(因为客户端也注入了store
  // 目的就是让页面能取到最新的值this.$store.state
  // initial初始化的
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount("#app");

// 为什么需要替换状态？
// 因为 客户端与服务端各自生成了一个vuex实例，不能共享状态
