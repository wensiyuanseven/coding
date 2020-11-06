// 服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。
const Koa = require("koa");
const Router = require("koa-router");
const route = new Router();
const app = new Koa();

const redirect = ctx => {
  ctx.response.redirect("/");
};

const main = ctx => {
  ctx.response.body = "Hello World";
};

route.get("/", main);
route.get("/redirect", redirect);
app.use(route.routes()).use(route.allowedMethods());
app.listen(3012);
