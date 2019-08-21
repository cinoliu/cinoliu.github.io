;
(function(window) {
    var imgUpload = {};

    /**
     * from https://my.oschina.net/zyxchuxin/blog/700381
     */
    imgUpload.readURL = function(input) {
        console.log("loading start")
        var _this = this;
        if (input.files && input.files[0]) {
            this.getOrientation(input.files[0], function(orientation) {
                var reader = new FileReader();
                var fileSize = Math.round(input.files[0].size / 1024 / 1024); //以M为单位（把字节转换为M）
                //input.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：input.files[0].size;
                reader.onload = function(e) {
                    //调用图片压缩方法：compress();
                    _this.compress(e.target.result, fileSize, input, orientation);
                };
                reader.readAsDataURL(input.files[0]);
            });
        }
    }

    /**
     * res代表上传的图片，fileSize大小图片的大小
     * from https://juejin.im/post/5baf4a04e51d450ea52fd9a4#heading-0
     */
    imgUpload.compress = function(res, fileSize, obj, orientation) {
        var _this = this;
        var img = new Image(),
            maxW = 640; //设置最大宽度
        img.src = res;
        img.onload = function() {
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d');

            // 限制图片的宽度
            if (img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
            }

            switch (orientation) {
                case 3: // 旋转180°
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.rotate((180 * Math.PI) / 180);
                    ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                    break;
                case 6: // 旋转90°
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate((90 * Math.PI) / 180);
                    ctx.drawImage(img, 0, -img.height, img.width, img.height);
                    break;
                case 8: // 旋转-90°
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate((-90 * Math.PI) / 180);
                    ctx.drawImage(img, -img.width, 0, img.width, img.height);
                    break;
                default: //正常值
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
            }

            var compressRate = _this.getCompressRate(1, fileSize);
            var dataUrl = canvas.toDataURL('image/png', compressRate);

            // 优化图片铺满容器
            if (img.height / img.width < 0.5) {
                obj.previousElementSibling.style.width = '100%';
            } else {
                obj.previousElementSibling.style.width = '2.6rem';
            }
            // 解决第二次选择相同文件不触发change事件
            obj.value = null;

            obj.previousElementSibling.setAttribute('src', dataUrl);
            console.log("dataUrl", dataUrl)
        }
    }

    /**
     * 计算压缩比率，size单位为MB
     */
    imgUpload.getCompressRate = function(allowMaxSize, fileSize) {
        var compressRate = 1;
        if (fileSize / allowMaxSize > 4) {
            compressRate = 0.5;
        } else if (fileSize / allowMaxSize > 3) {
            compressRate = 0.6;
        } else if (fileSize / allowMaxSize > 2) {
            compressRate = 0.7;
        } else if (fileSize > allowMaxSize) {
            compressRate = 0.8;
        } else {
            compressRate = 0.9;
        }
        return compressRate;
    }

    /**
     * from http://stackoverflow.com/a/32490603
     * from https://github.com/majiang666/ImageFile/blob/master/src/index.js
     * 获取照片方向，主要是为了解决IOS和部分三星手机会出现此bug，照片方向的问题
     */
    imgUpload.getOrientation = function getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) {
                return callback(-2);
            }
            var length = view.byteLength,
                offset = 2;
            while (offset < length) {
                if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(-1);
                    }
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                } else if ((marker & 0xFF00) != 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    window.imgUpload = imgUpload;

})(window);