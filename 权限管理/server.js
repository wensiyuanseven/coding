const express = require("express");
const app = express();
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get("/roleAuth", (req, res) => {
  // 数据是扁平化的
  res.json({
    // id如果和另一个item的pid相等就可以确立父子关系
    menuList: [
      {
        pid: -1, // -1 表示是路由的根节点
        name: "购物车",
        id: 1,
        auth: "cart" // 路由名称 如果路由名称和前端的路由相对应 路由就会被添加到列表上
      },
      {
        pid: 1, //  pid可以表示路由嵌套的等级 -1 1 4 4
        name: "购物车列表",
        id: 4,
        auth: "cart-list"
      },
      {
        pid: 4,
        name: "彩票",
        id: 5,
        auth: "lottery"
      },
      {
        pid: 4,
        name: "商品",
        id: 6,
        auth: "product"
      }
    ]
  });
});
app.listen(8084, () => {
  console.log("监听成功");
});
