import Vue from "vue";
import Vuex from "vuex";
import { authRoutes } from "./router";
Vue.use(Vuex);
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8082";
axios.interceptors.response.use(res => {
  return res.data;
});
// 权限相关的
const getTreeList = menuList => {
  // menu和routeMap中的第一项指向的是同一个地址
  let menu = []; // 用来渲染菜单的
  let routeMap = {};
  let auths = []; //权限
  menuList.forEach(m => {
    auths.push(m.auth);
    m.children = []; // 增加一个孩子列表
    routeMap[m.id] = m;
    // 有几个-1,数组中就会有几个根节点
    if (m.pid == -1) {
      // 是根节点
      menu.push(m);
    } else {
      if (routeMap[m.pid]) {
        // 找到对应的父亲 将值 塞进去
        routeMap[m.pid].children.push(m);
      }
    }
  });
  // console.log(routeMap,menu, auths )
  return { menu, auths };
};
// 过滤路由列表 获取这些权限
const formatList = (authRoutes, auths) => {
  return authRoutes.filter(route => {
    // 如果有就渲染，如果没有就过滤掉
    if (auths.includes(route.name)) {
      // 如果有子路由就递归处理
      if (route.children) {
        // 递归
        route.children = formatList(route.children, auths);
      }
      // 直接渲染这个路由
      return true;
    }
  });
};

export default new Vuex.Store({
  state: {
    hasPermission: false,
    menuList: [],
    // 按钮相关
    btnPermission: {
      edit: true,
      add: false
    }
  },
  mutations: {
    setMenuList(state, menu) {
      state.menuList = menu;
    },
    setPermission(state) {
      state.hasPermission = true;
    }
  },
  actions: {
    async getNewRoute({ commit, dispatch }) {
      // 发起请求 请求后端数据
      // 需要 把刚才的扁平的数据
      // 获取权限
      let { menuList } = await axios.get("/roleAuth").then(data => {
        return new Promise(resolve => {
          // setTimeout(() => {
          resolve(data);
          // }, 3000);
        });
      });
      let { auths, menu } = getTreeList(menuList);
      // 这一块的数据是扁平化之后的 都要渲染的数据
      commit("setMenuList", menu);

      let needRoutes = formatList(authRoutes, auths);
      commit("setPermission");
      return needRoutes;
    }
  }
});
