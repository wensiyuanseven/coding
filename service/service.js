const http = require('http')
const fs = require('fs')
const url = require('url')
const queryString = require('querystring')
// 参考文章  https://juejin.im/post/6844903871429476365#comment
const hasBody = function (req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers
}

const mime = function (req) {
  const str = req.headers['content-type'] || ''
  return str.split(';')[0]
}

http
  .createServer(function (req, res) {
    console.log(req.headers['cookie'], '---')
    let file = 'www' + req.url
    // 定义了一个post变量，用于暂存请求体的信息

    // // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    // req.on('data', function (chunk) {
    //     post += chunk;
    // });
    // console.log(post,'data')

    if (~req.url.indexOf('/success')) {
      // 需要的json对象
      // 区分get post 请求
      if (req.method == 'GET') {
        let obj = url.parse(req.url, true).query
        console.log(obj, 'get参数')
      } else {
        if (hasBody(req)) {
          var buffers = []
          req.on('data', function (chunk) {
            buffers.push(chunk)
          })
          req.on('end', function () {
            let requestBody = Buffer.concat(buffers).toString()
            console.log(requestBody, '转换之前的数据')
            // multipart/form-data 提交数据  使用json形式提交和json格式提交一样   只有用于form表单提交时才会有区别
            if (mime(req) === 'application/json' || mime(req) === 'multipart/form-data') {
              try {
                requestBody = JSON.parse(requestBody)
                console.log(requestBody, 'json')
              } catch (error) {
                console.log(error)
              }
            }
            if (mime(req) === 'application/x-www-form-urlencoded') {
              requestBody = queryString.parse(requestBody)
              console.log(requestBody, 'form表单方式提交')
            }
          })
        }
      }

      // console.log(url.parse(req.url,true).query) // get方式提交的数据
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Set-Cookie': ['id=123;HttpOnly', 'abc=456;HttpOnly']
      })
      // 向前端吐数据
      res.end(JSON.stringify({ success: 0, message: '成功' }))
    } else {
      // 访问index.html文件
      fs.readFile(file, function (err, data) {
        if (err) {
          res.writeHeader(404, {
            'Content-Type': 'text/html;charset="utf-8"' // 用res.write写入需要加 charset="utf-8"否则会乱码
          })
          res.write('<h1>404</h1><p>你要找的页面被LEO吃了</p>') // 因为content-type设置的是text/html所以可以直接解析
          res.end()
        } else {
          res.writeHeader(200, {
            'Content-Type': 'text/html'
          })
          // res.write()
          res.end(data)
        }
      })
    }
  })
  .listen(8889)

console.log('服务器开启成功')
