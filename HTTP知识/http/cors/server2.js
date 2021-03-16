const http = require("http");

http
  .createServer(function(request, response) {
    console.log("request come", request.url);

    response.writeHead(200, {
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Test-Cors,Content-Type", // 不管是简单请求还是复杂请求 如果需要自定义头 则必须是X-Test-Cors 如果是其他值会报错
      "Access-Control-Allow-Methods": "PUT,DELETE",
      "Access-Control-Max-Age": "10" // options预请求的过期时间
    })
    response.end("123");
  })
  .listen(8896);

console.log("server listening on 8887");


