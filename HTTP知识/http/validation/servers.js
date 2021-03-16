const http = require("http");
const fs = require("fs");
const catchTag = "777"; //数据库存储的值
// const catchTag = "888"; // 数据库存储的值,更新数据库中存储的值
http
  .createServer(function(request, response) {
    if (request.url === "/") {
      const etag = request.headers["if-none-match"];
      // catchTag 根据id查值出来的
      if (etag === catchTag) {
        // 重新验证这些值
        const html = fs.readFileSync("test3.html", "utf8");
        // response.writeHead(200, {
        //   "Content-Type": "text/html"
        // });
        // response.end(html);
        // return;
        response.writeHead(304, {
          "Content-Type": "text/html",
          "Cache-Control": "max-age=10000, no-cache",
          "Last-Modified": "123",
          Etag: "777"
        });
        response.end(html);
      } else {
        const html = fs.readFileSync("test2.html", "utf8");
        // 初次进来
        response.writeHead(200, {
          "Content-Type": "text/html",
          "Cache-Control": "max-age=10000, no-cache",
          "Last-Modified": "123",
          Etag: "777" // etag的值是从数据库中查出来的  根据id查
        });
        response.end(html);
      }
    }
  })
  .listen(8881);

console.log("server listening on 8888");
