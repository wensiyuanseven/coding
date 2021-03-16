module.exports = {
  /*
   **同构应用程序（服务器端呈现+客户端路由导航等）
   */
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
   **定义环境变量
   */
  env: {
    baseUrl: 'https://custom.qa.ccbuluo.cn'
  },
  /*
   **配置 Nuxt.js 应用生成静态站点
   */
  generate: {},
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   **路由配置
   */
  router: {
    // fallback: false
    // routeNameSplitter: '/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue')
    //   })
    // }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['iview/dist/styles/iview.css', '@/assets/css/main.css'],
  /*
   ** 该配置项用于配置那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
   */
  plugins: [
    // '~/plugins/vue-notifications'
    {
      src: '~/plugins/babel-polyfill.js',
      mode: 'client' //该文件只会在客户端被打包引入
    },
    {
      src: '~/plugins/iview.js'
    },
    '~/plugins/axios',
    '~/plugins/request'
  ],
  /*
   ** modules是Nuxt.js扩展，可以扩展它的核心功能并添加无限的集成  注意!!! 需要npm install
   * 模块只是在引导Nuxt时按顺序调用的函数。 框架在加载之前等待每个模块完成
   * 可以打包为npm模块或直接包含在项目源代码中
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  /*
   **设置全局变量
   */
  styleResources: {
    less: './assets/css/variable.less'
  },
  axios: {
    proxy: true
  },
  /*
   **axios代理
   */
  proxy: {
    '/api/': {
      target: 'https://custom.test.ccbuluo.cn',
      pathRewrite: { '^/api/': '' }
    }
  },
  /*
   ** 在自动生成的 vendor.bundle.js 文件中添加一些模块，以减少应用 bundle 的体积
   */
  build: {
    analyze: true, //分析并可视化构建后的打包文件
    devtools: true, //允许 vue-devtools 调试
    extractCSS: true, //已link的方式自动引入css
    hardSource: false, //实验性的 不能提升第一次构建的速度，但对于第二次构建能显著提升构建速度
    parallel: false, //开启多线程打包
    plugins: [],
    // transpile: ['polyfill'],
    extend(config, ctx) {}
  }
}
