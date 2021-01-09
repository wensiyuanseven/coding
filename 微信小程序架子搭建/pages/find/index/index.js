const computedBehavior = require('miniprogram-computed')
Component({
  data: {
    a: 1,
    b: 2
  },
  behaviors: [computedBehavior],
  computed: {
    // sum(data) {
    //   return data.a + data.b
    // },
  },
  watch: {
    'a, b': function (a, b) {
      this.setData({
        sum: a + b
      })
    },
  },
  methods: {
    onLoad: function (options) {
      // console.log(this)
      // wx.navigateTo({
      //   url: '/pages/personalCenter/index/index?abc=123',
      // })
    //  console.log(this,'fffffffffff')
    },
    example(){
      
      this.setData({
        a:12
      })
      // this.$fetch('1111').then(res=>{
      // })
      //  wx.navigateTo({
      //   url: '/pages/personalCenter/index/index?abc=123',
      // })
      this.navigateTo('/pages/personalCenter/index/index',{
        ccc:123,
        xxx:128282
      })
    }
  }
})