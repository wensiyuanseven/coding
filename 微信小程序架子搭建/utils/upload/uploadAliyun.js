
const env = require('./config.js');

const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');


const uploadFile = function(params) {
  if (!params.filePath || params.filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }



  const extensionName = getImgExtensionName(params.filePath);
  const aliyunFileKey = `${params.appId}/${extensionName}/${getYMD()}/${randomName()}.${extensionName}`;

  const aliyunServerURL = env.uploadImageUrl;

  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);

  // console.log('aliyunFileKey=', aliyunFileKey);
  // console.log('aliyunServerURL', aliyunServerURL);
  wx.uploadFile({
    url: aliyunServerURL,
    filePath: params.filePath,
    name: 'file',
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function(res) {
      console.log('阿里云成功回调', res)
      console.log(params, 'params')
      if (res.statusCode != 200) {
        if (params.fail) {
          params.fail(res)
        }
        return;
      }
      if (params.success) {
        let picItem = {
          path: env.uploadImageUrl + aliyunFileKey,
          fileSize: params.fileSize,
          width: 0,
          height: 0,
          originName: params.filePath,
          aliyunKey: aliyunFileKey,
          mimeType: extensionName,
          appId: params.appId,
          createTime: new Date().getTime()
        }
        params.success(picItem);
      }
    },
    fail: function(err) {
      console.log('阿里云失败回调', err)
      err.wxaddinfo = aliyunServerURL
      if (params.fail) {
        params.fail(err)
      }
    },
  })
}

const getPolicyBase64 = function() {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间
    "conditions": [
      ["content-length-range", 0, 20 * 1024 * 1024] // 设置上传文件的大小限制,20mb
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function(policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

// 获取图片名称（不带扩展名）
const getImgOriginalName = function(name) {
  const reName = name.split('.')
  reName.pop()
  return reName.join('.')
}
// 获取图片扩展名
const getImgExtensionName = function(name) {
  return name.split('.').pop().toLocaleLowerCase()
}
// 生成随机name
const randomName = function() {
  const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  let result = ''
  for (let i = 0; i < 30; i++) {
    const r = Math.floor(Math.random() * 16)
    result += data[r]
  }
  return result
}
// 获取年月日
const getYMD = function() {
  const time = new Date()
  const Y = time.getFullYear()
  const M = time.getMonth() + 1
  const D = time.getDate()
  const H = time.getHours();
  const N = time.getMinutes();
  const S = time.getSeconds();
  return `${Y}/${M}/${D}`
}

module.exports = uploadFile;