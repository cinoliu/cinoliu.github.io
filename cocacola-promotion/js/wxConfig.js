var urlParams = zexService.getUrlParamsInfo();
var wxSdkApiList = ['chooseImage','uploadImage', "hideOptionMenu", "hideMenuItems", "showMenuItems", "closeWindow",'hideAllNonBaseMenuItem','previewImage','onMenuShareAppMessage','onMenuShareTimeline'];
var menuList = ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite'];  //需要显示的菜单
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

var share_link_url = "http://cpre.sweetmartmarketing.com/colaPromotion/pages/sharePage.html";

// 微信config
function wxConfig(configParams,callback){
	// 微信权限配置
    wx.config({
        debug: false,
        appId: configParams.appid,
        timestamp: configParams.timestamp,
        nonceStr: configParams.noncestr,
        signature: configParams.signature,
        jsApiList: wxSdkApiList
    });

    // 微信ready
	
    wx.ready(function () {
        console.log("微信ready");
            wx.hideOptionMenu();
            wx.hideAllNonBaseMenuItem();
            wx.showMenuItems({menuList: menuList /* 要显示的菜单项，所有menu项见附录3*/});            

            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: "[可口可乐]", // 分享标题
                desc: "来大润发/欧尚超市购买抽奖啦！", // 分享描述
                link: share_link_url,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "http://image.sweetmartmarketing.com/wxcamp_thumb/c0MuayDpUg.png", // 分享图标
                success: function (res) {
					// 用户确认分享后执行的回调函数
					console.log(JSON.stringify(res));  					
                },
                cancel: function (res) {},
                fail: function(res){ alert(JSON.stringify(res)); }
            });


            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: "[可口可乐]", // 分享标题
//              link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b592983eafdcb17&redirect_uri=http%3A%2F%2Fcpre.sweetmartmarketing.com%2FwechatSrv%2Fauth2login%2Fwxapp.do%3Fappid%3Dwx4b592983eafdcb17%26forward_page%3Dtest_1000598_0810&response_type=code&scope=snsapi_base&state=zex_wx#wechat_redirect", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: share_link_url,
				imgUrl: "http://image.sweetmartmarketing.com/wxcamp_thumb/c0MuayDpUg.png", // 分享图标
                success: function (res) {
					// 用户确认分享后执行的回调函数
					console.log(JSON.stringify(res));   						
                },
                cancel: function (res) {},
                fail: function(res){ alert(JSON.stringify(res)); }
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



