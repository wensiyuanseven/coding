const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
app.use(async ctx => {
  let cookie = ctx.cookies.get("wensiyuan");
  let name = ctx.cookies.get("name");
  let abc = ctx.cookies.get("abc");
  let id = ctx.cookies.get("id");
  console.log(cookie, name, abc, id, "cookie");
  if (ctx.method === "GET" && ctx.url.split("?")[0] === "/json") {
    ctx.set({
      "Access-Control-Allow-Origin": "http://127.0.0.1:8811",
      "Access-Control-Allow-Credentials": true
      // 'Last-Modified': date
    });
    ctx.cookies.set("wensiyuan", "helloword", {
      // sameSite: "Strict"
      // secure: true
    });
    // 获取jsonp的callback
    let callbackName = ctx.query.callback || "callback";
    let returnData = {
      success: true,
      data: {
        text: "this is a jsonp api",
        time: new Date().getTime()
      }
    };
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

    ctx.type = "text/javascript"; // 写不写都行 都能变成可执行的js代码
    ctx.body = jsonpStr;
  }
});

app.listen(8861, () => {
  console.log("[demo] jsonp is starting at port 3000");
});
