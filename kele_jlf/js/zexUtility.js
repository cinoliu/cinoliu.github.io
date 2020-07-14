//知而行工具类
var zexUtil = {
    //获取URL参数值
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },

    //用户位置与门店的距离计算转换格式
    distanceFormat: function (distance) {
        if (distance.toString().indexOf(".") >= 4) {
            return (distance / 1000).toFixed(1) + 'km';
        } else if (distance.toString().indexOf(".") == -1 && distance.toString().length >= 4) {
            return (distance / 1000).toFixed(2) + 'km';
        } else {
            return Math.floor(distance.toFixed(1)) + 'm';
        }
    },

    // 判断obj是否为null/""/undefined/{}  true:空; false:非空
    isNullOrEmpty: function (obj) {
        if (obj != null || obj != "" || obj != undefined || obj != {})
            return false;
        else
            return true;
    },

    //条码数字格式转换
    barcodeFormat: function (barcode) {
        //将字符串拆解成数组
        var barcodeArry = barcode.split("");
        var barcodeStr = "";
        //当字符串长度是22时
        if (barcode.length == 22) {
            for (var i = 0; i < barcodeArry.length; i++) {
                barcodeStr += barcodeArry[i];
                //循环遍历 当到第6个字符的时候 追加'-'
                if ((i + 1) % 6 == 0) {
                    barcodeStr += "-";
                }
            }
            return barcodeStr;
        } else if (barcode.length == 9) {
            for (var i = 0; i < barcodeArry.length; i++) {
                barcodeStr += barcodeArry[i];
                //循环遍历 当到第3个字符的时候 追加'-',最后一个不用追加'-'
                if ((i + 1) % 5 == 0 && i != 9) {
                    barcodeStr += "-";
                }
            }
            return barcodeStr;
        } else {
            for (var i = 0; i < barcodeArry.length; i++) {
                barcodeStr += barcodeArry[i];
                //循环遍历 当到第5个字符的时候 追加'-'
                if ((i + 1) % 5 == 0) {
                    barcodeStr += "-";
                }
            }
            return barcodeStr;
        }
    },

    // 城市排序
    order_by_citys: function (val1, val2) {
        // 转换为拼音
        val1 = Pinyin.getFullChars(val1.city_name).toLowerCase();
        val2 = Pinyin.getFullChars(val2.city_name).toLowerCase();
        // 获取较长的拼音的长度
        var length = val1.length > val2.length ? val1.length : val2.length;

        // 依次比较字母的unicode码，相等时返回0，小于时返回-1，大于时返回1
        for (var i = 0; i < length; i++) {
            var differ = val1.charCodeAt(i) - val2.charCodeAt(i);
            if (differ == 0) {
                continue;
            } else {
                if (val1.charAt(i) == '_') {
                    return -1;
                }
                return differ;
            }
        }
        if (i == length) {
            return val1.length - val2.length;
        }
    },

    // 初始化MyScroll
    initMyScroll: function () {
        function init() {
            myScroll = new iScroll('wrapper', {
                //容器功能参数设定
                useTransition: false,
                checkDOMChanges: true,
                ghostClickTimeout: 500,
                vScrollbar: true,
                vScroll: true,
                scrollbars: true,
                topOffset: 0,
                handleClick: true,
                preventGhostClick: false, // prevent ghost clicks?防止2次点击
                scrollbarClass: "myScrollbar"
            });
            setTimeout(function () {
                document.getElementById('wrapper').style.left = '0';
            }, 0);
        }

        document.addEventListener('DOMContentLoaded', init(), false);
    },

    // 禁止body的touchMove事件
    disabledTouchMove: function () {
        document.body.ontouchmove = function (e) {
            e.preventDefault();
        };
    },

    // 获取签名秘钥
    getSignKey: function () {
        var sign_key = "CRltJmIwUJjk0wMm7h1tY2lQg6iSv1dg";
        return sign_key;
    },

    // 参数签名方法
    generateSign: function (obj, sign_key) {
        var keys = Object.keys(obj);
        var newKeys = keys.sort();
        var newObjectArray = [];
        for (index in newKeys) {
            var attr = newKeys[index];
            //值为空时，跳过不处理
            if (obj[attr] === '' || obj[attr] === null || obj[attr] === undefined) {
                continue;
            }
            var value = attr + '=' + obj[attr];
            newObjectArray.push(value);
        }
        var str = newObjectArray.join('&');
        str += sign_key;
        str = md5(str).toUpperCase();
        return str;
    },
    
    // 获取rsa服务端公钥 srvPublicKey
    getRsaSrvPublicKey: function() {
    	var srvPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB5gLOIr+PZu7Y6No+w/+MSBFS/gXgrlR5v70X8fyKaaRoQm+3OhVVMpjw0Qea/ypY9nZ1O9iml29PbGQBfLsTYIx3OwJ71vvPXUVcLH1SRx0YMUnHgzS12en22ve9PjICNqbYAZiHaVpEKV3NnXUshM/7c2VmlBjQESKgjX0g3wIDAQAB";
    	return srvPublicKey;
    },
    
    // 利用服务端公钥进行rsa加密
    rsaEncrypt: function(content,srvPublicKey) {
    	var encrypt = new JSEncrypt();
    	encrypt.setPublicKey(srvPublicKey);
    	return encrypt.encrypt(content);
    },
    
    // 获取rsa客户端私钥 clientPrivateKey
    getRsaClientPrivateKey: function() {
    	var clientPrivateKey = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMtRcV88aOiVkfE7R9z57bpLQCr07IjqO9IWOeAtdvhXZ19vUOEJcHjLTBaF4K9TiN31vqWSUXaTD13mw8cMwKqyxk8qd9ygY83MZO3NUWMwldgcdbtse/A6EHM7fd8ZViUqXYwr40fIXMHKi+1CFwJaVMzlIQUGoH3p5xyDxt9TAgMBAAECgYEAg+FqFopKykLqjX0UWiPLrgFNuA9ytkSpVNaR5/XVq7SWGvNLlQzYZaII0rs4SMF4j/DtHtzP9ofhedlLuHtvJKC+78HI/N/FWrxxIVkvHmldqnLQV0jYBYKKcq3lSb2miQPQWprSJH6JlLtQbGnTGhsSmKiFXV1/OqS+bWphnKECQQD7btQ5yjYWChEE6gou0ydWpgX0NDGNNjmD0ofcx1z2IcQh3x/EijorxDgXuROcAImHe5PlH6j6NufXvoCQ+6A5AkEAzwLg6gys7my0OqK7kfbb8LMt61f23YGJBlYSoc++QbLsd5HJvUdmhKCcppd/dcsZgSwjACM9m4fHvdGKXvsj6wJBAPlLxjkWedIYYQ+STk5nJlYPf0/GgGsXHKfLktIhCdcxW5qJ9KGWvF6wyz0aUIsZLUOcD+PaJF0TG4UaabdXBmECQQC5skZaDdbO5hpigvopfL1dVQ47ECR2HS3yziFWn8l2m+89bzz+Gt+e14jOdBY1b2RImHQpOnOYYhvObfpnK3fTAkAA+M6aXRqudYbHNu+FVmnz4Yn0D3hkUxNec7RXnycc/aq6ooKSnwtYqxZu0AXrSzLp8leuBUy4VeMVIS/B+e45";
    	return clientPrivateKey;
    },
    
    // 利用客户端私钥进行rsa解密
    rsaDecrypt: function(content,clientPrivateKey) {
    	var decrypt = new JSEncrypt();
    	decrypt.setPrivateKey(clientPrivateKey);
    	return decrypt.decrypt(content);
    },

	// 美汁源rsa加密公钥
	mzyGetRsaSrvPublicKey: function(){
    	var srvPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCh5Nk2GLiyQFMIU+h3OEA4UeFbu3dCH5sjd/sLTxxvwjXq7JLqJbt2rCIdzpAXOi4jL+FRGQnHaxUlHUBZsojnCcHvhrz2knV6rXNogt0emL7f7ZMRo8IsQGV8mlKIC9xLnlOQQdRNUssmrROrCG99wpTRRNZjOmLvkcoXdeuaCQIDAQAB";
    	return srvPublicKey;		
	},

	// 美汁源利用服务端公钥进行rsa加密
	mzyRsaEncrypt: function(content,srvPublicKey){
    	var encrypt = new JSEncrypt();
    	encrypt.setPublicKey(srvPublicKey);
    	return encrypt.encrypt(content);		
	},

    // 生成时间戳
    getTimestamp: function () {
        return new Date().getTime();
    },

    // 检验是否为数字 val:数字
    isNumber: function (val) {
        return /^[0-9]*$/.test(val);
    },

    // 检验数字长度 val,数字，length:长度
    isNumberLength: function (val, length) {
        var reg = new RegExp("^\\d{" + length + "}$");
        return reg.test(val);
    },

    // 检验数字最少长度 val:数字，length:最少长度
    isNumberMinLength: function (val, length) {
        var reg = new RegExp("^\\d{" + length + ",}$");
        return reg.test(val);
    },

    // 检验数字最少长度 val:数字，min:最少长度，max最大长度
    isNumberLengthScope: function (val, min, max) {
        var reg = new RegExp("^\\d{" + min + "," + max + "}$");
        return reg.test(val);
    },

    // 检验是否Email格式 val:Email地址
    isEmail: function (val) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
    },

    // 检验是否手机格式 val:手机格式
    isMobile: function (val) {
        return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9])\d{8}$/.test(val);
    },

    // 检验国内电话格式 val:座机格式 (0511-4405222、021-87888822)
    isTelephone: function (val) {
        return /\d{3}-\d{8}|\d{4}-\d{7}/.test(val);
    },

    // 检验身份证号码 val:身份证号码; 15位或18位
    isIdentity: function (val) {
        return /^\d{15}|\d{18}$/.test(val);
    },

    // 检验账号是否合法 val:账号; (字母开头，允许5-16字节，允许字母数字下划线)
    isIDLegal: function (val) {
        return /^\d{15}|\d{18}$/.test(val);
    },

    // 检验密码是否符合'一般'要求 val:密码; (以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
    isGeneralPassword: function (val) {
        return /^[a-zA-Z]\w{5,17}$/.test(val);
    },

    // 检验密码是否符合'强壮'要求 val:密码; (必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)
    isStrongPassword: function (val) {
        return /^[a-zA-Z]\w{5,17}$/.test(val);
    },

    // 检验是否全汉字 val:字符;
    isZHString: function (val) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(val);
    },

    // 检验是否英文和数字 val:字符;
    isEnglishOrNum: function (val) {
        return /^[A-Za-z0-9]+$/.test(val);
    },

    //检验姓名正则
    isName:function(val){
        return /^[\u4E00-\u9FA5A-Za-z]{1,50}$/.test(val);
    },
    
    isEnglishOrNumOrName: function (val) {
        return /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/.test(val);    	
    }
};
