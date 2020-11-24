import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  // 如果没权限 需要获取权限【这一步也可以接口中拿数据】
  if (!store.state.hasPermission) {
    // 获取需要添加的路由
    let newRoutes = await store.dispatch("getNewRoute");
    console.log(newRoutes, "newRoutes");
    // 等待await执行完成会走这里
    // 动态添加路由
    router.addRoutes(newRoutes); // 动态添加我需要的路由
    // 这些路由是被添加到/后面的我子路由
    console.log(router.options.routes, "router");
    // replace不会有路由记录
    next({ ...to, replace: true }); // replaceState
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
