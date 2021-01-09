import globalData from './global/data/index.js'
import Injection from './global/function/injection.js'
App({
  onLaunch: function() {
    // 全局注入
    new Injection(this)
  },
  globalData: {
    ...globalData
  }
})