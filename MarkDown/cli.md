
用代理, 首先得有一个标识, 告诉他你这个连接要用代理. 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.
举例
```
   [`/api`]: {
        target: 'http://xxx.xx.com', // 源地址
        changeOrigin: true,
        pathRewrite: {
          [`^/api`]: ''          // 路径重写
        }
   }
```
'/api': {}, 就是告诉node, 我接口只要是'/api'开头的才用代理.所以你的接口就要这么写 /api/xx/xx. 最后代理的路径就是 http://xxx.xx.com/api/xx/xx

可是不对啊, 我正确的接口路径里面没有/api啊. 所以就需要 pathRewrite,用''^/api'':'', 把'/api'去掉, 这样既能有正确标识, 又能在请求接口的时候去掉api
* 注意 ['^/api']:'/' 也可以  这样就会有两个斜杠 但是两个斜杠应该不会影响接口路径, 代理模块会处理成正确的路径
### 附:官方地址
[https://vuejs-templates.github.io/webpack/proxy.html](https://vuejs-templates.github.io/webpack/proxy.html)

**webpack配置地址**

https://webpack.docschina.org/configuration/dev-server/


