//index.js
//获取应用实例
var app = getApp()
var xsd = require("../../xsd/index")
var sync = require('../../utils/sync')
var Promise = require("../../utils/bluebird.min")

Page({
  data: {
  	userInfo:null
  },
  onShow(){
  	const auth = xsd.auth.check()
    if(!!auth){
    	console.log(auth)
    }
  }, 
})
