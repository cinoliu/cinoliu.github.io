var urlParams = zexService.getUrlParamsInfo();
var wxSdkApiList = ['checkJsApi', 'chooseImage', 'uploadImage', 'openLocation', 'getLocation', "hideMenuItems", "showMenuItems", "closeWindow", 'hideAllNonBaseMenuItem', 'previewImage', 'addCard', 'openCard'];

// 非法请求标识
var illegalRequest = false;
if (!urlParams) {
	urlParams = {
		component_appid: zexUtil.GetQueryString("component_appid"),
		appid: zexUtil.GetQueryString("appid"), //"wx1b1c192fd7847f43",  
		openid: zexUtil.GetQueryString("openid"),
		promotion_id: zexUtil.GetQueryString("promotion_id"),
		scene: zexUtil.GetQueryString("scene"),
		shop_id: zexUtil.GetQueryString("shop_id"),
		ticket_pic_id: zexUtil.GetQueryString("ticket_pic_id"),
		// memberId: zexUtil.GetQueryString("memberId")        
	};

	// RSA私钥解密openid参数，如果openid非法，则标识为非法请求，需要显示错误提示UI
	var openid = zexUtil.rsaDecrypt(urlParams.openid, zexUtil.getRsaClientPrivateKey());
	//	var signature = zexUtil.verifyingSignature(urlParams.openid,urlParams.appid);
	//	var openid = urlParams.openid;
	if (!openid) {
		illegalRequest = true; // 在首页loading过程中需要判断，如果此参数为true，需要跳转错误提示UI页面
	} else {
		window.sessionStorage.setItem('openid', openid);
		window.sessionStorage.setItem("urlParams", JSON.stringify(urlParams));
	}
}

console.log("url参数", urlParams);



// 微信config
function wxConfig(configParams, callback) {
	// 微信权限配置
	wx.config({
		debug: false,
		appId: configParams.appid,
		timestamp: configParams.timestamp,
		nonceStr: configParams.noncestr,
		signature: configParams.signature,
		jsApiList: wxSdkApiList
	});



	if (configParams.ready) {
		wx.ready(function () {

			wx.hideOptionMenu();
			callback();
			// wx.hideAllNonBaseMenuItem();

		});



	} else {
		callback();
	}

}




var zexWxConfig = {
	runConfig: function (callback, ready) {
		var configParams = {};
		//微信权限配置
		zexApis.httpWxCheck().done(function (response) {
			configParams.appid = urlParams.appid;
			configParams.component_appid = urlParams.component_appid;
			configParams = response;
			// 接收ready参数，当为undefined或者true的时候，走默认的ready，只有声明值false的时候才解耦。
			configParams.ready = ready || true;
			wxConfig(configParams, callback);
		});
	},
};
