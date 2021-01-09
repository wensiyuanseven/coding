import api from './../../api/api.js'
import {
  refreshCurrentPage
} from './../util/common.js'
let isIntercept = true
const options = {
  baseUrlType: 'loginUrl'
}
/**
 * @param {String} URL 请求URL 需要在api目录下声明变量名 变量名以_请求方式结尾
 * @param {Object} params 请求参数
 * @param {Object} [options] 请求配置
 * @param {Boolean}  [options.loading=true]  是否添加loading
 * @param {String}  [options.cType=form]  指定content-type类型 可选参数 form/json
 * @param {String}  [options.loadingText]  loading文案
 * @param {String}  [options.dyNamic]  url路径后面的动态参数
 * @param {String}  [options.baseUrlType=baseUrl] 基准路径类型 可选参数 baseUrl/picUrl/loginUrl
 * @param {Function} [options.complete]  请求完成之后的回调
 * @returns {Promise}
 * @example 在组件中调用  getApp().$fetch('GETMEDIA_GET', {id:123},{loading:false,cType:'json',loadingText:"加载中"}).then(res=>{})
 *在页面中调用  this.$fetch('GETMEDIA_GET', {id:123},{loading:false,cType:'json',loadingText:"加载中"}).then(res=>{})
 *
 */
export default function fetch(name, params = {}, options = {}) {
  if (!name) {
    getApp().showToast('请填写API')
    return
  }
  let url = api[name]
  if (!url) {
    getApp().showToast('找不到请求URL')
    return
  }
  let method = name
    .split('_')
    .pop()
    .toUpperCase()
  // 未指定请求类型
  if (!method.toUpperCase().match(/GET|POST|PUT|PATH/i)) {
    method = 'GET'
  }
  const baseUrl = options.baseUrlType ? getApp().globalData[options.baseUrlType] : getApp().globalData.baseUrl
  // 路径动态参数
  if (params && params.dyNamic) {
    url = `${url}/${params.dyNamic}`
    delete params.dyNamic
  }
  // 处理url最前面斜杠
  if (url.indexOf('/') === 0) {
    url = url.slice(1)
  }
  // 合并配置
  options = Object.assign({
      url: `${baseUrl}/${url}`,
      method: method,
      cType: 'form',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'custom-type': 'mini',
        jwtToken: wx.getStorageSync('jwtToken')
      },
      loading: true,
      complete: null
    },
    options
  )
  if (options.cType === 'json' && method === 'POST') {
    options.header['content-type'] = 'application/json'
  }
  if (options.loading) {
    wx.showLoading({
      title: options.loadingText || '正在加载',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    // 获取当前页面栈
    const currentPage = getCurrentPages()[getCurrentPages().length - 1]
    wx.request({
      url: options.url,
      data: params,
      method: options.method,
      header: options.header,
      success: res => {
        const message = res.data.message
        switch (res.statusCode) {
          // 静默登陆
          case 401:
            if (isIntercept) {
              isIntercept = false
              toSilenceLogin().then(() => {
                isIntercept = true
              })
            }
            return
          case 200:
            currentPage.setData({
              requestError: false
            })
            let responesCode, tokenCode
            // 先判断是否需要静默登陆
            if (res.data && res.data.code) {
              responesCode = res.data.code
            }
            if (res.header && res.header.Data) {
              tokenCode = JSON.parse(decodeURIComponent(res.header.Data)).code
            }
            // token丢失||token被篡改||token失效
            if ((responesCode === '20000' || tokenCode === '20001' || tokenCode === '20003') && isIntercept) {
              isIntercept: false
              toSilenceLogin().then(() => {
                isIntercept = true
              })
              return
            }
            switch (res.data.code) {
              case '400006':
                getApp().showToast(message || '接口出差')
                return
              case '999999':
                getApp().showToast(message || '接口出差')
                return
              case '1':
                return resolve(res)
              case '20010':
                wx.showModal({
                  content: message || '多端登录',
                  showCancel: false,
                  confirmText: '我知道了'
                })
                return
              case '10103':
                return reject({
                  code: res.data.code,
                  message: message || '未绑定手机号'
                })
              case '89889':
                return reject({
                  code: res.data.code,
                  message: message || '抱歉！您没有上传权限'
                })
              default:
                return reject(res)
            }
            return
          default:
            getApp().showToast('哎哟！没网了哦！')
            currentPage.setData({
              requestError: true
            })
            return reject(res.data)
        }
      },
      fail: err => {
        wx.getNetworkType({
          success: res => {
            currentPage.setData({
              requestError: true
            })
            if (res.networkType == 'none') {
              getApp().showToast('当前网络不可用，请检查网络设置')
            } else {
              reject(err)
            }
          }
        })
      },
      complete: res => {
        wx.stopPullDownRefresh()
        if (options.loading) {
          wx.hideLoading()
        }
        if (typeof options.complete === 'function') {
          options.complete && options.complete(res)
        }
      }
    })
  })
}
// 获取code值
const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res.code)
      }
    })
  })
}
// 静默登录
const getPgmsilent = async code => {
  const params = {
    code: code,
    wxAppId: getApp().globalData.appId
  }
  return await fetch('PGM_SLIENT_POST', params, {
    ...options,
    loadingText: '登陆中...'
  })
}
// 拿用户信息
export const getMenberInfo = async() => {
  return await fetch('MANAGE_INFO_GET', null, {
    ...options,
    loadingText: '信息获取中...'
  })
}
const toSilenceLogin = async() => {
  const code = await getLoginCode()
  try {
    const {
      data
    } = await getPgmsilent(code)
    wx.setStorageSync('jwtToken', data.data.jwtToken)
    wx.setStorageSync('openId', data.data.wechatOpenId)
    const resultData = await getMenberInfo()
    const infoData = resultData.data.data
    if (infoData.headImgUrl && infoData.headImgUrl.indexOf('http') == -1) {
      infoData.headImgUrl = getApp().globalData.picUrl + infoData.headImgUrl
    }
    if (infoData) {
      // 存储用户信息
      getApp().globalData.userInfo = infoData
      wx.setStorageSync('userInfo', infoData)
      // 刷新当前页面
      refreshCurrentPage()
    }
  } catch (err) {
    isIntercept = true
    switch (err.data.code) {
      case '-1':
        getApp().showToast(err.message || '静默登陆失败')
        break
        // 需要授权 跳转到授权页面
      case '30000':
        getApp().globalData.openId = err.data.data.openId
        const currentPage = getCurrentPages()[getCurrentPages().length - 1]
        // 保存当前页面的路由和参数
        getApp().globalData.authorSuccessJumpPageInfo = {
          path: `/${currentPage.route}`,
          options: currentPage.options
        }
        //杀死当前页面 跳转到授权页面
        wx.redirectTo({
          url: '/pages/author/author'
        })
        break
      default:
        getApp().showToast(err.message || '静默登陆失败')
    }
  }
}