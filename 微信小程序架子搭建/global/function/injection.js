import fetch from './../../utils/fetch/fetch.js'
import {
  encodeURI,
  decodeURI
} from './../../utils/util/common.js'

export default class Injection {
  constructor(instance) {
    this.$fetch = fetch
    this.showToast = this.showToast
    this.setGlobalData(instance.globalData)
    this._expandComponent()
    this._expandPage()
    return Object.assign(instance, this)
  }
  /**
   * @description 扩展Component增加通用逻辑
   */
  _expandComponent() {
    // 类实例
    const classInstance = this
    const originalComponent = Component //保存原来的Component
    Component = function(config) { // 覆盖Component变量
      const {
        onLoad
      } = config.methods
      config.methods.onLoad = function(onLoadOptions) {
        // 此this指向页面实例
        this.methods = config.methods
        classInstance._hangingMethod.call(this, onLoadOptions, onLoad, classInstance)
      }
      return originalComponent(config)
    }
  }
  /**
   * @description 扩展Page增加通用逻辑
   */
  _expandPage() {
    const classInstance = this
    const originalPage = Page //保存原来的Page
    Page = function(config) { // 覆盖Page变量
      const {
        onLoad
      } = config
      config.onLoad = function(onLoadOptions) {
        classInstance._hangingMethod.call(this, onLoadOptions, onLoad, classInstance)
      }
      return originalPage(config)
    }
  }
  /**
   * @description 封装跳转 暴露在每个页面的实例上
   * @param {String} url 路径
   * @param {Object} params 参数
   * @example A页面跳转B页面 this.navigateTo('urlToB', { foo: 'bar' })
   */
  _navigateTo(url, params) {
    this.__params = encodeURI(params)
    wx.navigateTo({
      url
    })
  }
  _hangingMethod(onLoadOptions, onLoad, classInstance) {
    this.$fetch = fetch
    this.showToast = classInstance.showToast
    this.navigateTo = classInstance._navigateTo.bind(this)
    const pages = getCurrentPages()
    this.__previousPage = pages[pages.length - 2] //可直接获取上一页面栈 方便传值
    if (this.__previousPage) {
      if (this.__previousPage.__params) {
        onLoadOptions = decodeURI(this.__previousPage.__params) // 获取上一页面的__params赋给onLoad函数的options
      }
      delete this.__previousPage.__params
    }
    if (Object.keys(onLoadOptions).length) {
      console.table(onLoadOptions)
    }
    if (typeof onLoad === 'function') {
      onLoad.call(this, onLoadOptions)
    }
  }
  showToast(title, icon = 'none') {
    wx.showToast({
      title,
      icon
    })
  }
  setSystemInfo() {
    let systemConfig = {
      pixelRate: 0.5, //px与rpx换算关系
      platform: 'ios', //操作平台 用于适配胶囊高度
      capsuleHeight: 40, //胶囊高度
      statusBarHeight: 20, //手机顶部状态栏高度
      titleHeight: 136, //整个导航头高度
      systemHeight: 0, //手机屏幕高度
      systemWidth: 0, //手机屏幕宽度
      isAllScreen: false, //是否是全面屏手机
      isHighHead: false //是否是刘海屏手机
    };
    wx.getSystemInfo({
      success: res => {
        let capsuleHeight = 40; //临时变量，计算titleHeight时用
        systemConfig.pixelRate = res.windowWidth / 750
        systemConfig.platform = res.platform
        systemConfig.statusBarHeight =
          res.statusBarHeight / systemConfig.pixelRate
        if (res.platform.toLowerCase().includes('devtools')) {
          capsuleHeight = 44
          systemConfig.capsuleHeight = 44 / systemConfig.pixelRate
        }
        if (res.platform.toLowerCase().includes('ios')) {
          capsuleHeight = 40
          systemConfig.capsuleHeight = 40 / systemConfig.pixelRate
        }
        if (res.system.toLowerCase().includes('android')) {
          capsuleHeight = 48
          systemConfig.capsuleHeight = 48 / systemConfig.pixelRate
        }
        systemConfig.titleHeight =
          (capsuleHeight + res.statusBarHeight) /
          systemConfig.pixelRate
        if (res.statusBarHeight >= 44) systemConfig.isHighHead = true
        if (res.windowHeight > 750) systemConfig.isAllScreen = true
        systemConfig.systemHeight = res.windowHeight
        systemConfig.systemWidth = res.windowWidth

      },
      fail: () => {
        this.showToast('获取设备信息失败')
      }
    });
    return {
      systemConfig: systemConfig,
      isIphonex: systemConfig.isHighHead
    }
  }
  setGlobalData(globalData) {
    const systemInfo = this.setSystemInfo()
    Object.assign(globalData, {
      systemConfig: systemInfo.systemConfig,
      isIphonex: systemInfo.isIphonex
    })
  }
}