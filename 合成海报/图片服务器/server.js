const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const app = new Koa();
const router = new Router();
router.get("/", async ctx => {
  ctx.body = "服务器启动成功";
});


app.use(async (ctx, next) => {
  ctx.set({ "Access-Control-Allow-Origin": "*" });
  await next();
});

app.use(router.routes());
// koa静态服务中间件 会去dist目录插查找看是否有client.bundle.js 如果有就从服务器中返回此文件
app.use(static(path.resolve(__dirname, "src")));
let port =8088;
app.listen(port, () => {
  console.log("服务器开启成功");
});
