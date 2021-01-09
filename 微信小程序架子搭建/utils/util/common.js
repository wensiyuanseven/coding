const now = function now() {
  return new Date().getTime()
}
/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
const debounce = (func, wait = 300, immediate = true) => {
  var timeout, args, context, timestamp, result
  var later = function() {
    // 据上一次触发时间间隔
    var last = now() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function() {
    context = this
    args = arguments
    timestamp = now()
    var callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * @description 时间戳转日期
 * @param {String||Number} date 时间戳
 * @returns {String}  2019-10-28 10:16:57
 */
const formatTime = date => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(__formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const __formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @description 刷新页面当前页面
 */
const refreshCurrentPage = () => {
  let pagesLenth = getCurrentPages().length
  let currentPage = getCurrentPages()[pagesLenth - 1]
  if (pagesLenth !== 0) {
    currentPage.onLoad(currentPage.options)
    currentPage.onReady()
    currentPage.onShow()
  }
}

/**
 * @description 将页面滚动到目标位置
 * @param {Number} scrollTop 滚动到页面的目标位置
 * @param {Number} duration 滚动动画的时长
 */
const pageScrollTo = (scrollTop, duration = 0) => {
  wx.pageScrollTo({
    scrollTop,
    duration
  })
}

/**
 * @description 下划线转驼峰
 * @param {String} str
 * @example ab_cd_ef ==> abCdEf
 */
const camelCase = str => {
  return str.replace(/_([a-z])/g, ($0, $1) => {
    return $1.toUpperCase()
  })
}

/**
 * @description 驼峰转横线：拆分字符串，使用 - 相连，并且转换为小写
 * @param {String} str
 * @example abCd ==> ab-cd
 */
const hyphenate = str => {
  return str.replace(/B([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @description 首字母转大写
 * @param {String} str
 * @example abc ==> Abc
 */
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description 隐藏手机号中间四位
 * @param {Number} phone
 * @example 183....9503
 */
const hidePhone = phone => {
  if (!phone) {
    return ''
  }
  return phone.substr(0, 3) + '····' + phone.substr(-4, 4)
}

/**
 * @description 随机两数之间正整数
 *              n，m为整数，需要(n，m]  Math.ceil(Math.random()*(m-n))+n
 *              n，m为整数，需要[n，m) Math.floor(Math.random() * (m - n)) + n
 *              n，m为整数，需要[n，m]   Math.round(Math.random() * (m - n + 1) + n)
 * @param {Number} n 最小值
 * @param {Number} m 最大值
 */
const random = (n, m) => {
  return Math.round(Math.random() * (m - n + 1) + n)
}

/**
 * @description 获取Url参数，返回一个对象
 * @param {String} url 路径
 * @example ?a=1&b=2&c=3 ==> {a: "1", b: "2", c: "3"}
 */
const getUrlParam = url => {
  let arrObj = url.split('?')
  let params = Object.create(null)
  if (arrObj.length > 1) {
    arrObj = arrObj[1].split('&')
    arrObj.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })
  }
  return params
}
/**
 * 获取RUL参数
 * @returns {{}}
 */

function getUrlPage() {
  let query = window.location.search;
  let data = {};
  query = query.slice(1).split("&");
  query.forEach(item => {
      let temp = item.split("=");
      data[temp[0]] = temp[1];
  });
  return data;
}
/**
 * @description  编码 当需要传递的参数过多的时候会出现被截取过滤丢失的情况 需要把参数编码再解码
 * @param {String} query  url拼接的参数
 * @return {Object}
 */
const encodeURI = query => {
  return encodeURIComponent(JSON.stringify(query))
}

/**
 * @description  解码
 * @param {String} data 接收到的数据
 * @return {Object}
 */
const decodeURI = data => {
  return JSON.parse(decodeURIComponent(data))
}

/**
 * @description 防止爆栈
 * @param {String} url page路径
 */
const jumpUrl = url => {
  if (!url) return false
  let stack = getCurrentPages().length
  let isTabar = __isTabBar(url)
  isTabar &&
    wx.switchTab({
      url: url
    })
  stack >= 5 &&
    wx.redirectTo({
      url: url
    })
  wx.navigateTo({
    url: url
  })
}

const __isTabBar = jumpUrl => {
  let tabar = appConfig.tabBar
  let urls = jumpUrl.match(/\w+/g).join('/')
  if (!tabar) return
  for (let item in tabar) {
    if (tabar[item].indexOf(urls) !== -1) {
      return true
    }
  }
  return false
}

module.exports = {
  debounce: debounce, //临界函数
  formatTime: formatTime, //时间戳转日期
  refreshCurrentPage: refreshCurrentPage, //刷新页面当前页面
  pageScrollTo: pageScrollTo, //将页面滚动到目标位置
  camelCase: camelCase, //下划线转驼峰
  hyphenate: hyphenate, //驼峰转横线
  capitalize: capitalize, //首字母转大写
  hidePhone: hidePhone, //隐藏手机号中间四位
  random: random, //随机一个n-m之间的随机数
  getUrlParam: getUrlParam, //获取Url参数，返回一个对象
  encodeURI: encodeURI, //编码
  decodeURI: decodeURI, //解码
  jumpUrl: jumpUrl //防止爆栈
}
