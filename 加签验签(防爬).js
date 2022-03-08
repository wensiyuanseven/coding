import  md5  from 'js-md5'
import { sha256 } from 'js-sha256'

/**
* @description 对请求参数进行字母升序排序
* @param {Object} params {b:123,a:456,c:''}
* @return {String} a=456&b=123
*/
const getSortedContent = params => {
  const keys = Object.keys(params)
  keys.sort()
  return keys.reduce((str, key, index) => {
    const value = params[key]
     if(value){
      if (index == keys.length - 1) {
        str += `${key}=${value}`
      } else {
          str += `${key}=${value}&`
      }
     }
    return str
  }, '')
}

/**
 * @description 生成字节流数组
 * @param {String}  str  "wretyuikjhga"
 * @return array  [30,40,20]
 */

const getBytes = str => {
    const utf8 = []
    for (let ii = 0; ii < str.length; ii++) {
        let charCode = str.charCodeAt(ii)
        if (charCode < 0x80) utf8.push(charCode)
        else if (charCode < 0x800) {
            utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f))
        } else if (charCode < 0xd800 || charCode >= 0xe000) {
            utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f))
        } else {
            ii++
            // Surrogate pair:
            // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
            // splitting the 20 bits of 0x0-0xFFFFF into two halves
            charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff))
            utf8.push(0xf0 | (charCode >> 18), 0x80 | ((charCode >> 12) & 0x3f), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f))
        }
    }
    //兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
    for (let jj = 0; jj < utf8.length; jj++) {
        var code = utf8[jj]
        if (code > 127) {
            utf8[jj] = code - 256
        }
    }
    return utf8
}

/**
* @description 生成get请求的sign签名
* @param {Object} params {b:123,a:456}
* @param {String} secretKey 密钥
* @return {String}  198d28eeb22500f1fa1dfc4f41fe7e19
 */
export const getSign = (params, secretKey) => {
    return md5(`${getSortedContent(params)}${secretKey}`)
}

/**
* @description 生成post请求的签名信息
* @param {Object} params {b:123,a:456}
* @param {String} secretKey 密钥
* @return {Object} {sha256,sign}
 */
export const postSign = (params, secretKey) => {
    const sha256Hex = sha256(getBytes(JSON.stringify(params)))
    return {
        sha256: sha256Hex,
        sign: md5(`${sha256Hex}${secretKey}`),
    }
}
