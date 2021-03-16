import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

// 这时并没有直接添加路由
export const authRoutes = [
  // 权限
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart"),
    children: [
      {
        path: "cart-list",
        name: "cart-list",
        component: () => import("@/views/CartList"),
        children: [
          {
            path: "lottery",
            name: "lottery",
            component: () => import("@/views/Lottery")
          },
          {
            path: "product",
            name: "product",
            component: () => import("@/views/Product")
          }
        ]
      }
    ]
  }
];
export default new Router({
  mode: "history",
  // 当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径)
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      component: {
        render: h => h("h1", {}, "Not Found")
      }
    }
  ]
});
