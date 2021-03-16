import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  console.log(to, from);
  // next('/dashboard')会再次执行跟导航守卫 导致beforeEach触发发两次
  // 所以需要 hasPermission 来处理  否则会造成死循环
  if (!store.state.hasPermission) {
    // 获取需要添加的路由
    let newRoutes = await store.dispatch("getNewRoute");

    console.log(newRoutes, "newRoutes");
    // 等待 await 执行完成会走这里
    // 动态添加路由
    router.addRoutes(newRoutes); // 动态添加我需要的路由
    // 这些路由是被添加到/后面的我子路由
    console.log(router.options, "router");
    // 因为执行了 next('/dashboard')会再次执行根导航守卫 导致beforeEach触发发两次
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
