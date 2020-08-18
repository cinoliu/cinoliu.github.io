
var urlParams = zexService.getUrlParamsInfo();
var wxSdkApiList = ['checkJsApi','chooseImage','uploadImage',"hideMenuItems","showMenuItems","closeWindow",'hideAllNonBaseMenuItem','previewImage','onMenuShareAppMessage','onMenuShareTimeline'];
var menuList = ['menuItem:share:appMessage','menuItem:share:timeline'];  //需要显示的菜单
// 非法请求标识
var illegalRequest = false;
if(!urlParams){
    urlParams = {
        component_appid: zexUtil.GetQueryString("component_appid"),
        appid: zexUtil.GetQueryString("appid"),  //"wx1b1c192fd7847f43",  
        openid: zexUtil.GetQueryString("openid"),
        promotion_id: zexUtil.GetQueryString("promotion_id"),
        scene: zexUtil.GetQueryString("scene"),
        shop_id:zexUtil.GetQueryString("shop_id"),
        ticket_pic_id:zexUtil.GetQueryString("ticket_pic_id"),
        memberId: zexUtil.GetQueryString("memberId")        
    };

    // RSA私钥解密openid参数，如果openid非法，则标识为非法请求，需要显示错误提示UI
    var openid = zexUtil.rsaDecrypt(urlParams.openid,zexUtil.getRsaClientPrivateKey());
//	var signature = zexUtil.verifyingSignature(urlParams.openid,urlParams.appid);
//	var openid = urlParams.openid;
    if(!openid){
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
        jsApiList: wxSdkApiList
    });
    if(configParams.ready){
        wx.ready(function () {
            wx.hideOptionMenu();
            wx.hideAllNonBaseMenuItem();
            wx.showMenuItems({menuList: menuList /* 要显示的菜单项，所有menu项见附录3*/});
//          callback();

            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: "小皮有机高铁米粉新品首发，快给宝宝尝个鲜吧！", // 分享标题
                desc: "戳这里，上传购买小票，参加活动 >>>", // 分享描述
//              link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b592983eafdcb17&redirect_uri=http%3A%2F%2Fcpre.sweetmartmarketing.com%2FwechatSrv%2Fauth2login%2Fwxapp.do%3Fappid%3Dwx4b592983eafdcb17%26forward_page%3Dtest_1000598_0810&response_type=code&scope=snsapi_base&state=zex_wx#wechat_redirect", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: "http://cpre.sweetmartmarketing.com/littleFreddie/pages/index.html",
                imgUrl: "https://image.sweetmartmarketing.com/wxcamp_thumb/TYQCHUUUgx.png", // 分享图标
                success: function (res) {
					// 用户确认分享后执行的回调函数
                },
                cancel: function (res) {},
                fail: function(res){ alert(JSON.stringify(res)); }
            });


            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: "小皮有机高铁米粉新品首发，快给宝宝尝个鲜吧！", // 分享标题
//              link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b592983eafdcb17&redirect_uri=http%3A%2F%2Fcpre.sweetmartmarketing.com%2FwechatSrv%2Fauth2login%2Fwxapp.do%3Fappid%3Dwx4b592983eafdcb17%26forward_page%3Dtest_1000598_0810&response_type=code&scope=snsapi_base&state=zex_wx#wechat_redirect", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				link: "http://cpre.sweetmartmarketing.com/littleFreddie/pages/index.html",
                imgUrl: "https://image.sweetmartmarketing.com/wxcamp_thumb/TYQCHUUUgx.png", // 分享图标
                success: function (res) {
					// 用户确认分享后执行的回调函数
                },
                cancel: function (res) {},
                fail: function(res){ alert(JSON.stringify(res)); }
            });       
        });
    }else {
        callback();
    }

}


var zexWxConfig = {
    runConfig: function (callback,ready) {
        var configParams = {};
        //微信权限配置
        zexApis.httpWxCheck().done(function (response) {
            configParams.appid = urlParams.appid;
            configParams = response;
            // 接收ready参数，当为undefined或者true的时候，走默认的ready，只有声明值false的时候才解耦。
            configParams.ready = ready || true;
            wxConfig(configParams,callback);
        });
    },
};



