"user strict"
const xsd = require("../../xsd/index")

Page({
  data:{
  	userInfo:null,
  	station:null
  },
  onLoad(){
    const user = getApp().globalData.user
    this.setData({userInfo:user.wxinfo, station:user.profile})
  },
  relogin(){
    xsd.auth.logout()
    wx.navigateTo({url:'login'})
  }
})