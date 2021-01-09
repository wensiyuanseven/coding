const env = require('../../env.js')
let bucket = ''

switch (env) {
  case 'development':
    bucket = 'zht-dev-nosec'
    break;
  case 'test':
    bucket = 'zht-test-nosec'
    break;
  case 'qa':
    bucket = 'zht-qa-nosec'
    break;
  case 'production':
    bucket = 'zht-prod-nosec'
    break;
}

var fileHost = `https://${bucket}.oss-cn-beijing.aliyuncs.com/`
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'KecdkPBqyqD1fddHgLZR1hu7URpqr5',
  OSSAccessKeyId: 'LTAIfsAlXsIFDSmb',
  appId: getApp().globalData.appId,
  timeout: 87600 //这个是上传文件时Policy的失效时间
};

module.exports = config
