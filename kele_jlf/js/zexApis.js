// 测试
//var httpServiceURL = "http://weixindev.sweetmartmarketing.com/wechatSrv";
// 预发布
var httpServiceURL = "http://cpre.sweetmartmarketing.com/wechatSrv";

//var httpServiceURL =  "http://192.168.32.110:8081/wechatSrv";
// var httpServiceURL = "https://pre.sweetmartmarketing.com/wechatSrv";

//未知环境
//var httpServiceURL = "http://192.168.31.14/wechatSrv";
// 正式发布
//var httpServiceURL = "http://c.sweetmartmarketing.com/wechatSrv";

var zexApis = {

	//请求微信权限验证
	httpWxCheck: function () {
		var urlParams = JSON.parse(window.sessionStorage.getItem("urlParams")) || null;
		console.log("权限验证appid", JSON.stringify(urlParams));
		return $.ajax({
			type: "post",
			url: httpServiceURL + "/openapi/getWxJsAPISignature.do",
			dataType: "json",
			data: {
				"component_appid": urlParams.component_appid,
				"appid": urlParams.appid,
				"url": window.location.href,
				"type": "jsapi"
			}
		});
	},


	//KA3.0获取首页状态信息
	statInformation: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initActivityPage.do",
			timeout: 10000
		});
	},

	//KA3.0兑奖吗接口
	expiryInterface: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initPrizeCodePage.do"
		});
	},

	//KA3.0上传小票接口
	upReceipts: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initTicketPage.do"
		});
	},

	//KA3.0手机短信验证码接口
	getverificationcode: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/smsVerification.do"
		});
	},

	//KA3.0图像验证接口
	getCheckCodeImg: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return httpServiceURL + "/proPrize/getVerifyCode.do?open_id=" + data.open_id + "&sign=" + data.sign + "&timestamp=" + zexUtil.getTimestamp();

	},

	//KA3.0摇一摇接口
	getShakePage: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initShakePage.do"
		});
	},

	//KA3.0刮奖接口
	getTombolapage: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initGuaguaPage.do"
		});
	},

	//KA3.0广告领取页接口
	getAdverpage: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initReceivePage.do"
		});
	},

	//KA3.0上传小票接口
	getReceipts: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/uploadShoppingTicket.do"
		});
	},

	//用户填写信息页面
	getTnitUser: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initUserInfoPage.do"
		});
	},

	//审核告知页面
	getReview: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initCheckResultPage.do"
		});
	},

	//兑奖码验证接口
	validationExpiry: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/verifyPrizeCode.do",
			timeout: 10000
		});
	},

	//抽奖接口
	getLuckyDraw: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/drawPrizeLevel.do",
			timeout: 10000
		});
	},

	//上传小票初始化
	getUploadReceipts: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/initTicketPage.do"
		});
	},

	//保存用户信息接口
	saveUserInformation: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/saveUserInfo.do",
			timeout: 10000
		});
	},
	//小票上传接口
	uploadReceipts: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/uploadShoppingTicket.do"
		});
	},




	//日志接口
	promotionLog: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/promotionLog/log.do"
		});
	},

	// 判断门店二维码店主注册状态接口
	checkShopKeeperRegisterStatus: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/shopkeeper/checkShopKeeperRegisterStatus.do"
		});
	},

	// 店主注册信息接口
	addShopKeeperRegisterInfo: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/shopkeeper/addShopKeeperRegisterInfo.do"
		});
	},

	// 门店有效上传量查询接口
	queryShopKeeperStatisticalRanking: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/shopkeeper/queryShopKeeperStatisticalRanking.do"
		});
	},

	// 促销活动购买金额排名接口
	getPurchaseAmountRanking: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPages/getPurchaseAmountRanking.do"
		});
	},

	// 查询抖音积分列表接口
	getScorePage: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/rankingScore/getScorePage.do"
		});
	},

	// 查询抖音积分详情接口
	getScoreDetail: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/rankingScore/getScoreDetail.do"
		});
	},

	// 验证用户所在地区是否有资格参加
	verifyCity: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/verifyCity.do"
		});
	},

	// 批量添加微信卡券接口	
	batchAddWxCard: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, "Au2PFGDxVFI8ZPeN1yKCyI6qknigDxp2");
		return $.ajax({
			method: "POST",
			dataType: "json",
			data: data,
			url: httpServiceURL + "/wxCard/batchAddWxCard.do",
		});
	},

	// 清楚断点
	delUserPromotionProduce: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/delUserPromotionProduce.do"
		});
	},

	// 字典表
	getDictDataByCode: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());

		return $.ajax({
			method: 'GET',
			dataType: 'json',

			data: data,
//			url: "http://cpre.sweetmartmarketing.com/wechatSrv/wxMiniApp/getDictDataByCode.do"
			url: httpServiceURL + "/dict/getDictDataByCode.do"
		});
	},




	getInterfacecode: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proPrize/receivePrizeLevel.do",
			timeout: 10000
		});
	},

	
		//根据手机号判断用户参与流程
	validateTicketByMobile: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proCustom/validateTicketByMobile.do"
		});
	},
	
	
		//小票上传接口
	customUploadTicket: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proCustom/customUploadTicket.do"
		});
	},
	
	
	
	//保存选择抽大奖信息
	saveDrawPrizeChoice: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/proCustom/saveDrawPrizeChoice.do"
		});
	},
	
	
		//微信单品券初始化接口
	getWxCouponH5actPageDetail: function (data) {
		data = data || {};
		data.sign = zexUtil.generateSign(data, zexUtil.getSignKey());
		return $.ajax({
			method: 'POST',
			dataType: 'json',
			data: data,
			url: httpServiceURL + "/mmpay/getWxCouponH5actPageDetail.do"
		});
	},
	
	
		// 微信代金券接口
	sendCouponStock: function(data){
		data = data || {};
		data.sign = zexUtil.generateSign(data,zexUtil.getSignKey());
        return $.ajax({
            method: "POST",
            dataType: "json",
            data: data,
			url: httpServiceURL + "/mmpay/sendCouponStock.do",	
		});
	},
	
	
	
};
