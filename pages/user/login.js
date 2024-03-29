//index.js
//获取应用实例
var app = getApp()
var xsd = require("../../xsd/index")
var sync = require('../../utils/sync')


Page({
  data: {
    access:false,
    retry:false,
    welcome: '正在登录鲜时达...',
    userInfo: {},
  },
  onShow: function () {
    const user = getApp().globalData.user
    if(!!user)
      wx.navigateBack()
    else
      this.login()
  },
  login(){
    this.setData({
      welcome: '正在登录鲜时达...',
      retry:false
    })

    wx.showNavigationBarLoading()

    app.getUserInfo().then(userInfo=>{
      this.setData({userInfo})
      const postData = {code: app.globalData.accessCode, userInfo}
      !!getApp().globalData.debugUser && (postData.code = getApp().globalData.debugUser) //是否调试用户
      return xsd.api.post('supplier/login', postData).then(data=>{
        if(!!data.user){
          this.setData({
            welcome:'登录成功...'
          })
          data.user.wxinfo = userInfo
          xsd.auth.login(data.user)
        }else{
          this.setData({
            access:true,
            retry:false,
            welcome:'无效用户'
          })
        }

      })

    }).catch(err=>{
      this.setData({
        welcome:err,
        retry:true
      })
    }).finally(()=>{
      wx.hideNavigationBarLoading()
    })
  },
  back(){
    wx.navigateBack()
  }  
})
