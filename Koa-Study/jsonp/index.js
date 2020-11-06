const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
  // 如果jsonp 的请求为GET
  if (ctx.method === "GET" && ctx.url.split("?")[0] === "/getData.jsonp") {
    // 获取jsonp的callback
    let callbackName = ctx.query.callback || "callback";
    console.log(ctx.query, "传入的参数");
    let returnData = {
      success: true,
      data: {
        text: "this is a jsonp api",
        time: new Date().getTime()
      }
    };

    // jsonp的script字符串  把参数传给前端定义的fun并且执行此函数
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;
    // 把参数传给前端定义的fun并且执行此函数
    // ;fun({success: true, data: {text: "this is a jsonp api", time: 1604640473490}})

    ctx.type = "text/javascript";

    // 输出jsonp字符串
    ctx.body = jsonpStr;
  } else {
    ctx.body = "hello jsonp";
  }
});

app.listen(3034, () => {
  console.log("[demo] jsonp is starting at port 3000");
});
