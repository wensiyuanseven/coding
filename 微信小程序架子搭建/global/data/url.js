import env from './../../env.js'
let url = {
  picUrl: '',
  baseUrl: '',
  loginUrl:''
}

switch (env) {
  case 'development':
    url.picUrl = 'https://zht-dev-nosec.oss-cn-beijing.aliyuncs.com/'
    url.baseUrl = 'https://custom.dev.ccbuluo.cn/media-storage/mini/'
    url.loginUrl = 'https://custom.dev.ccbuluo.cn/member'
    break
  case 'test':
    url.picUrl = 'https://zht-test-nosec.oss-cn-beijing.aliyuncs.com/'
    url.baseUrl = 'https://custom.test.ccbuluo.cn/media-storage/mini/'
    url.loginUrl = 'https://custom.test.ccbuluo.cn/member'
    break
  case 'qa':
    url.picUrl = 'https://zht-qa-nosec.oss-cn-beijing.aliyuncs.com/'
    url.baseUrl = 'https://custom.qa.ccbuluo.cn/media-storage/mini/'
    url.loginUrl = 'https://custom.qa.ccbuluo.cn/member'
    break
  case 'production':
    url.picUrl = 'https://zht-prod-nosec.oss-cn-beijing.aliyuncs.com/'
    url.baseUrl = 'https://custom.ccbuluo.com/media-storage/mini/'
    url.loginUrl = 'https://custom.ccbuluo.com/member'
    break
}
export default {
  loginUrl: url.loginUrl,
  picUrl: url.picUrl,
  baseUrl: url.baseUrl
}