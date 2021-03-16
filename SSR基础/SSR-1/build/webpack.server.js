const Merge = require("webpack-merge");
const base = require("./webpack.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const utils = require("./utils");
module.exports = Merge.merge(base, {
  entry: {
    server: utils.resolve("./../src/server.entry.js")
  },
  target: "node", // 打包后的结果给node来使用 node中会使用const path=require('path') 如果不指定为node环境 打包后的结果会包含path模块
  output: {
    // 输出的代码符合commonjs规范,以供其他模块导入使用
    // 可以查看 server.bundle.js文件来验证
    libraryTarget: "commonjs2" // 打包后的结果给node来使用 把最终执行的结果放到module.exports上
    /**  node执行原理
    (function(){
     //自己的代码
     module.exports= ()=>{}
     })()
    */
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: "vue-loader"
        // options: {
        //   // enable CSS extraction
        //   extractCSS: true
        // }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"] //新的语法特性 如果需要生效还需要再。babelsrc中配置
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "{{title}}",
      minify: {
        collapseWhitespace: true, //压缩代码
        removeComments: false //不移除注释
      },
      filename: "index.ssr.html",
      template: utils.resolve("./../public/index.ssr.html"),
      // 因为当执行服务端构建时 会默认把生成的server.bundle.js导入到模板中
      // 但是服务端引入的js文件应该是客户端的 所以应该把服务端打包的bundle排除掉
      // 目前就像于只是把模板拷贝到打包目录中,什么都没做
      // 当然server.bundle.js之后会被koa渲染成字符串 然后再把客户端的代码引入即可
      excludeChunks: ["server"] // 排除在模板中引用打包之后的server.js
    })
  ]
});
