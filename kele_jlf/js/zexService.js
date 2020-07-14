

// 知而行服务类
var zexService = {

    // 获得当前微信用户open_id
    getOpenId: function(){
    	// 从session中取出明文openid后，再加密传输调用接口
    	var openid = window.sessionStorage.getItem('openid');
        var encryptedOpenid = zexUtil.rsaEncrypt(openid,zexUtil.getRsaSrvPublicKey());
        return openid;
    },

    //获得当前微信的的促销ID
    getPromotion:function(){
        var promotion = window.sessionStorage.getItem('promotion');
        return promotion;
    },

    //获取地址栏参数
    getUrlParamsInfo:function () {
        var urlParamsInfo = JSON.parse(window.sessionStorage.getItem("urlParams"));
        return urlParamsInfo;
    }
};

















