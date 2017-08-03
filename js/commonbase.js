(function($, owner) {
	owner.convertImgToBase64=function(url, callback,outputFormat){
		var canvas = document.createElement('CANVAS'); 
		var ctx = canvas.getContext('2d'); 
		var img = new Image; 
		img.crossOrigin = 'Anonymous'; 
		img.onload = function(){ 
			canvas.height = img.height; 
			canvas.width = img.width; 
			ctx.drawImage(img,0,0); 
			var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
			callback.call(this, dataURL); 
			canvas = null; 
		}; 
		img.src = url; 
	};
	owner.requestUrl="http://192.168.0.158:7654/";
	owner.getJSON=function(url,data,success,error){
		mui.ajax(owner.requestUrl + url,{
			data:data,
			dataType:'json',
			type:'get',
			headers: {
                "Authorization": "Bearer " + user.getState().token
        	},
        	success:function(data){
           		if(success)
           			success(data);
			},error:function(xhr,type,errorThrown){
				if(error)
					error(xhr,type,errorThrown);
			}
		})
	}
	owner.openWin=function(target,parm,autoahow,waiting){
		var isAutoahow=autoahow||true;
		var isWaiting=waiting||true;
		mui.openWindow({
			url:target,
			id:target,
			show:{
		    	autoShow:autoahow,//页面loaded事件发生后自动显示，默认为true
		    	aniShow:'none',
		   	},
			waiting:{
				autoShow:isWaiting
		   	}
		})
	}
	owner.openWinAnimation=function(target,parm,show,waiting){
		var isShow={
			autoShow:true,
			aniShow:'slide-in-right'
		};
		mui.extend(show,isShow,true);
		var isWaiting=waiting||true;
		mui.openWindow({
			url:target,
			id:target,
			show:show,
			waiting:{
				autoShow:isWaiting
		   	}
		})
	}
	/**
	 * 触发事件
	 * @param {Object} from 目标窗口对象
	 * @param {String} eventName 事件名
	 * @param {Json} data 参数
	 */
	owner.triggerEvent=function(from,eventName,data){
		mui.fire(from,eventName,data);
	}
})(mui, window.base = {})
