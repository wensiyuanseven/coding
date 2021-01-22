import moment from 'moment'
import waterStr from './waterMark'
let OSS = require('ali-oss')
export default () => ({
  props: {
    value: {
      type: Array,
      default: () => []
    },
    upType: {
      type: String,
      default: 'IMG',
      validator(value) {
        return ['IMG', 'VIDEO']
      }
    },
    bottomTextShow: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: 58
    },
    height: {
      type: [String, Number],
      default: 58
    },
    multiple: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png']
    },
    maxSize: {
      type: Number,
      default: 0
    },
    maxLength: {
      type: Number,
      default: 0
    },
    imgDesc: {
      type: Boolean,
      default: false
    },
    // add 是否可编辑
    isEditable: {
      type: Boolean,
      default: true
    },
    // add 控制显示轮播按钮
    isShowSwiper: {
      type: Boolean,
      default: false
    },
    // add 多个swiper的索引
    swiperIndex: {
      type: Number,
      default: 0
    },
    beforeUpload: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onExceedLength: {
      type: Function
    },
    onExceedSize: {
      type: Function
    },
    onFormatError: {
      type: Function
    },
    imgOpt: {
      type: String,
      default: ''
    },
    watermark: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      clientOss:null,
      client: '',
      resData: {},
      uploadList: [],
      beforeUpLoadListNum: 0, // 不在上传列表中的图片数
      uploadImgGetOn: false,
      uploadImgGetOn: false,
      successCallBack: function () { },
      errorCallBack: function () { }
    }
  },
  async created() {
    let projectName = require('@/../config/projectname')
    const body = document.getElementsByTagName('body')[0]
    const scriptsEle = document.getElementsByTagName('script')
    function scripts1() {
      return new Promise((resolve, reject) => {
        // 一，先加载sdk
        const src = `${projectName}vod-sdk-upload-1.0.6.min.js`
        for (let i = 0; i < scriptsEle.length; i++) {
          if (scriptsEle[i].src.indexOf(src) !== -1) {
            resolve()
            return false
          }
        }
        const scripts1 = document.createElement('script')
        scripts1.src = src
        body.appendChild(scripts1)
        scripts1.onload = scripts1.onreadystatechange = () => {
          resolve()
        }
      })
    }
    function scripts2(callback) {
      // 二加载 sdk-upload文件
      return new Promise((resolve, reject) => {
        const src = `${projectName}/vod-sdk-upload-1.0.6.min.js`
        for (let i = 0; i < scriptsEle.length; i++) {
          if (scriptsEle[i].src.indexOf(src) !== -1) {
            if (typeof VODUpload != "undefined") {
              resolve()
            } else {
              var uploadJsTime = setInterval(function () {
                if (typeof VODUpload != "undefined") {
                  clearInterval(uploadJsTime)
                  resolve()
                }
              }, 10)
            }
            // resolve()
            return false
          }
        }
        const scripts2 = document.createElement('script')
        scripts2.src = src
        body.appendChild(scripts2)
        scripts2.onload = scripts2.onreadystatechange = () => {
          resolve()
        }
      })
    }
    // 判断是否存在projectname，存在就用projectname，不存在去static取阿里云sdk
    if (projectName && projectName.PROJECT_NAME) {
      projectName = `/${projectName.PROJECT_NAME}/aliyun`
      // 加载上传图片需要的js文件
    } else {
      projectName = this.alisdk
    }
    scripts1()
      .then(() => {
        return scripts2()
      })
      .then(() => {
        /* eslint-disable no-undef */
        this.start()
        // if(typeof VODUpload != "undefined"){
        //   this.start()
        // }
      })
  },
  // 组件销毁之前调用，停止所有上传操作
  beforeDestroy() {
    this.client.stopUpload()
    this.client.cleanList()
  },
  computed: {
    wrapstyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    computeSize() {
      let message = this.maxSize
      if (message > 1024) {
        message = message / 1024 + 'Mb'
      } else {
        message = message + 'Kb'
      }
      return message
    },
    computeFormat() {
      return this.format.join('、')
    },
    // 计算下部的文字显示
    bottomText() {
      let message = ''
      if (this.maxLength) {
        message += `最多只能上传${this.maxLength}个文件；`
      }
      message += `支持 ${this.computeFormat} 格式`
      if (this.maxSize) {
        message += `，不大于${this.computeSize}`
      }
      return message
    },
    watermarkOpt() {
      return waterStr(this.watermark)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.uploadList = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    // 获取服务器生成的token
    async getAliToken() {
      const appServer = '/api/alibaba/oss/sts/0'
      const res = await this.permission.$axios.get(appServer)
      this.resData = res.data.data
      console.log(res, 'res')
      return Promise.resolve(this.resData)
    },
    // 点击input外层触发input
    inputWrapClick() {
      this.$refs.upInput.click()
    },
    // 选择图片之后
    uploadfile(event) {
      this.beforeUpLoadListNum =
        this.uploadList.length - this.client.listFiles().length
      // 这个参数暂时是空的，上传视频的时候会用到
      const userData = '{"Vod":{}}'
      // 获取选择的图片列表
      let files = event.target.files
      for (let i = 0; i < files.length; i++) {
        // 图片的扩展名
        const extensionName = this.getImgExtensionName(files[i].name)
        // 生成name
        const fileName = `${
          this.resData.appId
          }/${extensionName}/${this.getYMD()}/${this.randomName()}.${extensionName}`
        console.log(fileName, 'fileName')
        const startUp = () => {
          // 把图片添加到阿里云上传队列中
          this.client.addFile(
            files[i],
            this.resData.endpoint,
            this.resData.bucket,
            fileName,
            userData
          )
          // 将图片信息加入到队列中
          let fileItem = {
            path: '',
            fileSize: files[i].size,
            fileType: this.upType,
            width: 0,
            height: 0,
            originName: this.getImgOriginalName(files[i].name),
            key: fileName,
            mimeType: extensionName,
            appId: this.resData.appId,
            createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            progress: 0,
            showProgress: true
          }
          // 获取上传图片的宽高
          const url = window.URL || window.webkitURL
          const img = new Image()
          img.src = url.createObjectURL(files[i])
          img.onload = function () {
            fileItem.width = this.width
            fileItem.height = this.height
          }
          // 把图片添加到已上传图片列表中
          this.uploadList.push(fileItem)
        }
        // 判断上传的图片数量是否超过限制
        if (this.maxLength && this.uploadList.length >= this.maxLength) {
          this.exceedLength(files[i])
          break
        }
        // 判断上传图片的大小是否超出限制
        if (this.maxSize && files[i].size > this.maxSize * 1024) {
          this.exceedSize(files[i])
          continue
        }
        // 判断图片的类型
        if (this.format.length) {
          const fileFormat = this.getImgExtensionName(files[i].name)
          if (
            !this.format.some(item => item.toLocaleLowerCase() === fileFormat)
          ) {
            this.formatErr(files[i])
            continue
          }
        }
        // 执行图片上传之前的操作
        if (typeof this.beforeUpload === 'function') {
          this.beforeUpload(files[i], () => {
            startUp()
          })
          continue
        }
        startUp()
      }
      this.client.startUpload()
      // 置空选择图片的input，不置空的话两次选择一样的图片不出发change
      this.$refs.upInput.value = null
    },
    // 不用input，单独传图片之后,有用，售后独有
    uploadfile2(imgData, successCallBack, errorCallBack) {
      // this.beforeUpLoadListNum =
      // this.uploadList.length - this.client.listFiles().length
      // 这个参数暂时是空的，上传视频的时候会用到
      const userData = '{"Vod":{}}'
      // 获取选择的图片列表
      let files = imgData
      // 图片的扩展名
      const extensionName = this.getImgExtensionName(files.name)
      // 生成name
      const fileName = `${
        this.resData.appId
        }/${extensionName}/${this.getYMD()}/${this.randomName()}.${extensionName}`
      const startUp = () => {
        // 把图片添加到阿里云上传队列中
        this.client.addFile(
          files.file,
          this.resData.endpoint,
          this.resData.bucket,
          fileName,
          userData
        )
        // 获取上传图片的宽高
        // const url = window.URL || window.webkitURL
        // const img = new Image()
        // img.src = url.createObjectURL(files)
        // img.onload = function () {
        //   fileItem.width = this.width
        //   fileItem.height = this.height
        // }
        // // 把图片添加到已上传图片列表中
        // this.uploadList.push(fileItem)
      }
      startUp()
      this.successCallBack = successCallBack
      if (errorCallBack && (typeof errorCallBack === 'function')) {
        this.errorCallBack = errorCallBack
      }
      // 调用初始化
      this.client.startUpload()
      // 置空选择图片的input，不置空的话两次选择一样的图片不出发change
      // this.$refs.upInput.value = null
    },
    async start() {
      const that = this
      /* eslint-disable no-undef */
      this.client = new VODUpload({
        /* eslint-enable no-undef */
        // 开始上传
        onUploadstarted: function (uploadInfo) {
          console.log('开始', uploadInfo, this)
          that.uploadImgGetOn = true
          const item = that.uploadList[this.curIndex + that.beforeUpLoadListNum]
          that.$emit('on-start', item)
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.log('成功', uploadInfo, this)
          const uploadList = that.client.listFiles()
          // 兼容售后
          if (that.uploadList[this.curIndex + that.beforeUpLoadListNum]) {
            const item = that.uploadList[this.curIndex + that.beforeUpLoadListNum]
            const index = this.curIndex
            // 这个settimeout为了让进度条出现动画效果
            setTimeout(async () => {
              const successCallback = () => {
                // 设置上传进度消失
                item.showProgress = false
                // 给url赋值
                item.path =
                  uploadInfo.endpoint.replace('://', `://${uploadInfo.bucket}.`) +
                  '/' +
                  uploadInfo.object.split('?')[0]
                console.log(item.path, 'item.path===')
                if (uploadList.length === index + 1) {
                  that.uploadImgGetOn = false
                }
                // 当所有图片的状态都是成功的时候，清除上传列表
                const allUploadSuccess = uploadList.some(item => {
                  return item.state !== 'Success'
                })
                if (!allUploadSuccess) {
                  that.client.cleanList()
                }
                // 判断所有照片上传完毕，执行
                if (
                  index + that.beforeUpLoadListNum + 1 ===
                  that.uploadList.length
                ) {
                  that.imgChange()
                }
              //  console.log(.clientOss)
                const url = that.clientOss.signatureUrl(item.path, {
                  expires:100000
                });
                console.log(url,'url')
                that.$emit('on-success', item)
              }
              if (typeof that.onSuccess === 'function') {
                // let path =
                // uploadInfo.endpoint.replace('://', `://${uploadInfo.bucket}.`) +
                // '/' +
                // uploadInfo.object.split('?')[0]
                // let returnObj = uploadInfo
                // returnObj.path = path
                // console.log(that.onSuccess())
                item.path =
                  uploadInfo.endpoint.replace('://', `://${uploadInfo.bucket}.`) +
                  '/' +
                  uploadInfo.object.split('?')[0]
                if (await that.onSuccess(item)) {
                  successCallback()
                } else {
                  // 删掉当前出错的这张照片
                  that.uploadList.splice(index + that.beforeUpLoadListNum, 1)
                  that.client.deleteFile(index)
                  that.imgChange()
                }
              } else {
                successCallback()
              }
            }, 200)
          } else {
            let path =
              uploadInfo.endpoint.replace('://', `://${uploadInfo.bucket}.`) +
              '/' +
              uploadInfo.object.split('?')[0]
            let returnObj = uploadInfo
            returnObj.path = path
            that.successCallBack(returnObj)
          }
        },
        // 文件上传失败
        onUploadFailed: async function (uploadInfo, code, message) {
          console.log('失败', uploadInfo, code, message)
          const item = that.uploadList[this.curIndex + that.beforeUpLoadListNum]
          that.$emit('on-error', item, { code: code, message: message })
          if (typeof that.errorCallBack === 'function') {
            that.errorCallBack({ code: code, message: message })
          }
          // 删掉当前出错的这张照片
          // that.uploadList.splice(this.curIndex + that.beforeUpLoadListNum, 1)
          // that.client.deleteFile(this.curIndex)
          // 判断错误信息
          if (code === 'AccessKeyIdAndSecurityTokenNotMatch') {
            // 传入的token和accessKeyId不匹配
            await that.initClient()
            that.client.startUpload()
          } else if (code === 'InvalidAccessKeyId') {
            // 您提供的OSS访问密钥ID在我们的记录中不存在
            await that.initClient()
            that.client.startUpload()
          } else if (code === 'MissingRequiredParameter') {
            // 在params中缺少所需的键'Bucket'
            await that.initClient()
            that.client.startUpload()
          } else {
            that.client.startUpload()
            that.$Message.error(message)
          }
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo, totalSize, uploadedSize) {
          const item = that.uploadList[this.curIndex + that.beforeUpLoadListNum]
          // if判断兼容售后
          if (item) {
            const progress = Math.ceil((uploadedSize * 100) / totalSize)
            that.$emit('on-progress', item, progress)
            that.uploadList[this.curIndex + that.beforeUpLoadListNum].progress = progress
          }
        },
        // 安全令牌超时
        onUploadTokenExpired: async function () {
          console.log('超时')
          that.$emit('on-expired')
          that.initClient('expired')
        }
      })
      //
      // 初始化上传插件
      this.initClient()
    },
    async initClient(type) {
      await this.getAliToken()
      const resData = this.resData
      console.log(resData,'--------')
      this.clientOss = new OSS({
        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
          accessKeyId: resData.accessKeyId,
          accessKeySecret: resData.accessKeySecret,
          stsToken: resData.secretToken,
          bucket: resData.bucket
      });
      console.log(this.clientOss,'this.clientOss')
      // 传给阿里云了
      if (type === 'expired') {
        this.client.resumeUploadWithToken(
          resData.accessKeyId,
          resData.accessKeySecret,
          resData.secretToken,
          resData.expireTime
        )
      } else {
        this.client.init(
          resData.accessKeyId,
          resData.accessKeySecret,
          resData.secretToken,
          resData.expireTime
        )
      }
      return true
    },
    // 删除一张图片的时候
    removeItem(item) {
      if (this.uploadImgGetOn) return false
      this.uploadList.splice(this.uploadList.indexOf(item), 1)
      this.$emit('on-remove', item)
      this.imgChange()
    },
    // 图片说明变化
    descChange(index, text) {
      this.uploadList[index].desc = text
      this.imgChange()
    },
    // 超出最大张数
    exceedLength(file) {
      if (typeof this.onExceedLength === 'function') {
        this.onExceedLength(file)
      } else {
        if (this.$Message && this.$Message.error) {
          this.$Message.error(`最多只能上传${this.maxLength}个文件`)
        }
        this.$emit('on-exceededLength', file)
      }
    },
    // 超出设置的最大上传kb
    exceedSize(file) {
      if (typeof this.onExceedSize === 'function') {
        this.onExceedSize(file)
      } else {
        if (this.$Message && this.$Message.error) {
          this.$Message.error(`只能上传${this.computeSize}以内的文件`)
        }
        this.$emit('on-exceededSize', file)
      }
    },
    // 图片格式错误
    formatErr(file) {
      if (typeof this.onFormatError === 'function') {
        this.onFormatError(file)
      } else {
        if (this.$Message && this.$Message.error) {
          this.$Message.error(`只支持上传${this.computeFormat}的文件格式`)
        }
        this.$emit('on-formatError', file)
      }
    },
    // 获取图片名称（不带扩展名）
    getImgOriginalName(name) {
      const reName = name.split('.')
      reName.pop()
      return reName.join('.')
    },
    // 获取图片扩展名
    getImgExtensionName(name) {
      return name
        .split('.')
        .pop()
        .toLocaleLowerCase()
    },
    // 生成随机name
    randomName() {
      const data = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f'
      ]
      let result = ''
      for (let i = 0; i < 30; i++) {
        const r = Math.floor(Math.random() * 16)
        result += data[r]
      }
      return result
    },
    // 获取年月日
    getYMD() {
      const time = new Date()
      const Y = time.getFullYear()
      const M = time.getMonth() + 1
      const D = time.getDate()
      return `${Y}/${M}/${D}`
    },
    // 生成水印图片路径
    watermarkImg(img) {
      let imgUrl = this.base64.encode(img)
      imgUrl = imgUrl.replace(/\+/, '-')
      imgUrl = imgUrl.replace(/\//, '_')
      return imgUrl
    },
    // 图片张数发生变化的时候
    imgChange(index = -1) {
      const newImg = JSON.parse(JSON.stringify(this.uploadList))
      this.$emit(
        'input',
        newImg.map((item, index) => {
          delete item.progress
          delete item.showProgress
          return item
        })
      )
    }
  }
})
//
