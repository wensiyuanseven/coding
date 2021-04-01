const http = require("http");
const fs = require("fs");

http
  .createServer(function(request, response) {
// debugger
    if (request.url === "/") {
      const html = fs.readFileSync("test.html", "utf8");
      response.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": [
          "id=123;HttpOnly",
          "name=222;SameSite=Strict",
          "abc=456;HttpOnly"
        ]
        // 'Set-Cookie': ['wensiyuan=222;SameSite=None']
        // SameSite=None
      });
      response.end(html);
    }
  })
  .listen(8812);

console.log("server listening on 8888");
