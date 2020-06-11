var urlParams = zexService.getUrlParamsInfo();
// 非法请求标识
var illegalRequest = false;
if(null == urlParams || urlParams == undefined){
    urlParams = {
        component_appid: zexUtil.GetQueryString("component_appid"),
        appid: zexUtil.GetQueryString("appid"),
        openid: zexUtil.GetQueryString("openid"),
        promotion_id: zexUtil.GetQueryString("promotion_id"),
        scene: zexUtil.GetQueryString("scene"),
        shop_id:zexUtil.GetQueryString("shop_id"),
        ticket_pic_id:zexUtil.GetQueryString("ticket_pic_id")
    };
    // RSA私钥解密openid参数，如果openid非法，则标识为非法请求，需要显示错误提示UI
    var openid = zexUtil.rsaDecrypt(urlParams.openid,zexUtil.getRsaClientPrivateKey());
    if(!openid || openid == null || openid == ''){
    	illegalRequest = true; // 在首页loading过程中需要判断，如果此参数为true，需要跳转错误提示UI页面
    } else {
    	window.sessionStorage.setItem('openid',openid);
    	window.sessionStorage.setItem("urlParams", JSON.stringify(urlParams));
    }
}

console.log("url参数", urlParams);

// 微信config
function wxConfig(configParams,callback){
	// 微信权限配置
    wx.config({
        debug: false,
        appId: configParams.appid,
        timestamp: configParams.timestamp,
        nonceStr: configParams.noncestr,
        signature: configParams.signature,
        jsApiList: ['chooseImage', 'previewImage', 'uploadImage',"hideOptionMenu","hideMenuItems","showMenuItems","closeWindow"]
    });

    // 微信ready
    wx.ready(function () {
        console.log("微信ready");
        wx.hideOptionMenu();
        // wx.hideMenuItems({
        //     menuList: ['share:appMessage','favorite'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        // });
        wx.showMenuItems({
            menuList: ['menuItem:favorite'] // 要显示的菜单项，所有menu项见附录3
        });
        callback();
    });

    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //alert("验证服务繁忙，请刷新一下哦~");
    });
}

var zexWxConfig = {
    runConfig: function (isNeedConfig,callback) {
    	var configParams = {};
    	if(!isNeedConfig){
    		configParams.appid = urlParams.appid;
    		configParams.timestamp = zexUtil.getTimestamp();
    		configParams.noncestr = "123";
    		configParams.signature = "test";
    		wxConfig(configParams,callback);
    	} else {
    		//微信权限配置
	        zexApis.httpWxCheck().done(function (response) {
	            configParams.appid = urlParams.appid;
	            configParams = response;
	            wxConfig(configParams,callback);
	        });
    	}
    }
};



