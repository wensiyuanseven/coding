Component({
  properties: {
    openType: {
      //点击返回按钮的跳转方式
      type: String,
      value: 'navigateBack'
    },
    titleOpenType: {
      //点击标题文字的跳转方式
      type: String,
      value: ''
    },
    toUrl: {
      //返回页面路径
      type: String,
      value: ''
    },
    indexUrl: {
      //返回页面路径
      type: String,
      value: ''
    },
    showBack: {
      //是否显示返回
      type: Boolean,
      value: true
    },
    iconShadow: {
      //icon是否显示阴影
      type: Boolean,
      value: false
    },
    color: {
      //标题颜色
      type: String,
      value: '#333'
    },
    backgroundColor: {
      //背景色
      type: String,
      value: '#fff'
    },
    delta: { //返回层
      type: Number,
      value: 1
    },
    barTitle: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.systemConfig.statusBarHeight,
    capsuleHeight: getApp().globalData.systemConfig.capsuleHeight,
    titleHeight: getApp().globalData.systemConfig.titleHeight
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateBack(e) {
      let pages = getCurrentPages();
      let openType = e.currentTarget.dataset.type;
      switch (openType) {
        case 'navigateBack':
          if (pages.length > 1) {
            wx.navigateBack({
              delta: this.data.delta
            });
          } else {
            wx.reLaunch({
              url: this.data.indexUrl
            });
          }
          break;
        case 'switchTab':
          wx.switchTab({
            url: this.data.toUrl
          });
          break;
        case 'redirect':
          wx.redirectTo({
            url: this.data.toUrl
          });
          break;
        case 'reLaunch':
          wx.reLaunch({
            url: this.data.toUrl
          });
          break;
      }
    }
  }
});