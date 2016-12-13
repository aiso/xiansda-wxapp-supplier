"user strict"
const xsd = require("../../xsd/index")

Page({
  data:{
  	disabled:true
  },
  formSubmit(e){
  	console.log(e)
  	if(!!e.detail.value.supplier && /^\w{12}$/.test(e.detail.value.access_code)){
  	  const app = getApp()
  	  app.getUserInfo().then(userInfo=>{
  	  	const postData = {code:app.globalData.accessCode, userInfo, access:e.detail.value}
  	  	!!getApp().globalData.debugUser && (postData.code = getApp().globalData.debugUser) //是否调试用户

        wx.showNavigationBarLoading()
  	  	xsd.api.post('supplier/access', postData).then(data=>{
          data.user.wxinfo = userInfo
          xsd.auth.login(data.user)
  	  	}).finally(()=>{
          wx.hideNavigationBarLoading()
        })
  	  })
  	}
  }

})