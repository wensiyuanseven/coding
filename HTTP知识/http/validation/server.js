const http = require("http");
const fs = require("fs");

http
  .createServer(function(request, response) {
    console.log("request come", request.url);

    if (request.url === "/") {
      const html = fs.readFileSync("test.html", "utf8");
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(html);
    }

    if (request.url === "/script.js") {
      const etag = request.headers["if-none-match"];
      const modifiedSince = request.headers["if-modified-since"];
      const unModifiedSince = request.headers["if-unmodified-since"]; //浏览器一般不用
      const ifMatch = request.headers["if-match"]; //浏览器一般不用
      console.log(etag, "|", modifiedSince, "|", unModifiedSince, "|", ifMatch);
      // 如果给定URL中的资源更改，则一定要生成新的Etag值。 因此Etags类似于指纹，也可能被某些服务器用于跟踪。 比较etags能快速确定此资源是否变化，但也可能被跟踪服务器永久存留
      // 注意是自己主动生成新的etag  而不是内容变了浏览器会自动让etag发生改变！！！
      //  如果缓存过期了 那么etager也就失效了。
      //  如果还在缓存期内,即使重启etager的值也是存在的
      if (etag === "777") {
        response.writeHead(304, {
          "Content-Type": "text/javascript",
          "Cache-Control": "max-age=10000, no-cache",
          "Last-Modified": "123",
          Etag: "777"
        });
        response.end('console.log("我是新值，但是没打印hahah1azxX")');
      } else {
        // 初次进来
        response.writeHead(200, {
          "Content-Type": "text/javascript",
          "Cache-Control": "max-age=10000, no-cache",
          "Last-Modified": "123",
          Etag: "777"
        });
        response.end('console.log("script loaded twice")');
      }
    }
  })
  .listen(8881);

console.log("server listening on 8888");
