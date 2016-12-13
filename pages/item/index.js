"use strict";
const xsd = require('../../xsd/index')

Page({
  data:{
  	items:[]
  },
  onLoad(){
  	this.reload()
  },
  reload(){
  	xsd.sync.base.get().then(base=>{
	  	xsd.api.get('supplier/items').then(data=>{
	  	  const items = data.items.map(item=>{
	  	  	item.service = base.services.find(s=>s.id==item.service)
	  	  	return item
	  	  })
	  	  this.setData({items})
	  	})
  	})
  }  
})