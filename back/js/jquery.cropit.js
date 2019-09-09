/*! cropit - v0.4.5 <https://github.com/scottcheng/cropit> */
BasePath = $("#BasePath").val();
var dw=document.body.clientWidth;
  (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["cropit"] = factory(require("jquery"));
	else
		root["cropit"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _cropit = __webpack_require__(2);

	var _cropit2 = _interopRequireDefault(_cropit);

	var _constants = __webpack_require__(4);

	var _utils = __webpack_require__(6);

	var applyOnEach = function applyOnEach($el, callback) {
	  return $el.each(function () {
	    var cropit = _jquery2['default'].data(this, _constants.PLUGIN_KEY);

	    if (!cropit) {
	      return;
	    }
	    callback(cropit);
	  });
	};

	var callOnFirst = function callOnFirst($el, method, options) {
	  var cropit = $el.first().data(_constants.PLUGIN_KEY);

	  if (!cropit || !_jquery2['default'].isFunction(cropit[method])) {
	    return null;
	  }
	  return cropit[method](options);
	};

	var methods = {
	  init: function init(options) {
	    return this.each(function () {
	      // Only instantiate once per element
	      if (_jquery2['default'].data(this, _constants.PLUGIN_KEY)) {
	        return;
	      }

	      var cropit = new _cropit2['default'](_jquery2['default'], this, options);
	      _jquery2['default'].data(this, _constants.PLUGIN_KEY, cropit);
	    });
	  },

	  destroy: function destroy() {
	    return this.each(function () {
	      _jquery2['default'].removeData(this, _constants.PLUGIN_KEY);
	    });
	  },

	  isZoomable: function isZoomable() {
	    return callOnFirst(this, 'isZoomable');
	  },

	  'export': function _export(options) {
	    return callOnFirst(this, 'getCroppedImageData', options);
	  },

	  imageState: function imageState() {
	    return callOnFirst(this, 'getImageState');
	  },

	  imageSize: function imageSize() {
	    return callOnFirst(this, 'getImageSize');
	  },

	  prop: function prop(name, value) {
	    if ((0, _utils.exists)(value)) {
	      return applyOnEach(this, function (cropit) {
	        cropit['set' + (0, _utils.capitalize)(name)](value);
	      });
	    } else {
	      return callOnFirst(this, 'get' + (0, _utils.capitalize)(name));
	    }
	  },

	  disable: function disable() {
	    return applyOnEach(this, function (cropit) {
	      cropit.disable();
	    });
	  },

	  reenable: function reenable() {
	    return applyOnEach(this, function (cropit) {
	      cropit.reenable();
	    });
	  }
	};

	_jquery2['default'].fn.cropit = function (method) {
	  if (methods[method]) {
	    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	  } else if (['imageSrc', 'offset', 'previewSize', 'zoom', 'initialZoom', 'exportZoom', 'minZoom', 'maxZoom'].indexOf(method) >= 0) {
	    return methods.prop.apply(this, arguments);
	  } else {
	    return methods.init.apply(this, arguments);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Zoomer = __webpack_require__(3);

	var _Zoomer2 = _interopRequireDefault(_Zoomer);

	var _constants = __webpack_require__(4);

	var _options = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var Cropit = (function () {
	  function Cropit(jQuery, element, options) {
	    _classCallCheck(this, Cropit);

	    this.$el = (0, _jquery2['default'])(element);

	    var defaults = (0, _options.loadDefaults)(this.$el);
	    this.options = _jquery2['default'].extend({}, defaults, options);

	    this.init();
	  }

	  _createClass(Cropit, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.image = new Image();
	      this.preImage = new Image();
	      this.image.onload = this.onImageLoaded.bind(this);
	      this.preImage.onload = this.onPreImageLoaded.bind(this);
	      this.image.onerror = this.preImage.onerror = function () {
	        _this.onImageError.call(_this, _constants.ERRORS.IMAGE_FAILED_TO_LOAD);
	      };

	      this.$fileInput = this.options.$fileInput.attr({ accept: 'image/*' });
	      this.$preview = this.options.$preview.css({ backgroundRepeat: 'no-repeat' });
	      this.$zoomSlider = this.options.$zoomSlider.attr({ min: 0, max: 1, step: 0.01 });

	      this.previewSize = {
	        w: this.options.width || this.$preview.width(),
	        h: this.options.height || this.$preview.height()
	      };
	      if (this.options.width) {
	        this.$preview.width(this.previewSize.w);
	      }
	      if (this.options.height) {
	        this.$preview.height(this.previewSize.h);
	      }

	      if (this.options.imageBackground) {
	        if (_jquery2['default'].isArray(this.options.imageBackgroundBorderWidth)) {
	          this.imageBgBorderWidthArray = this.options.imageBackgroundBorderWidth;
	        } else {
	          this.imageBgBorderWidthArray = [];
	          [0, 1, 2, 3].forEach(function (i) {
	            _this.imageBgBorderWidthArray[i] = _this.options.imageBackgroundBorderWidth;
	          });
	        }

	        var $previewContainer = this.options.$previewContainer;
	        this.$imageBg = (0, _jquery2['default'])('<img />').addClass(_constants.CLASS_NAMES.IMAGE_BACKGROUND).attr('alt', '').css('position', 'absolute');
	        this.$imageBgContainer = (0, _jquery2['default'])('<div />').addClass(_constants.CLASS_NAMES.IMAGE_BACKGROUND_CONTAINER).css({
	          position: 'absolute',
	          zIndex: 0,
	          left: -(dw-200)/2,
	          top: -(360-300)/2,
	          width: dw,
	          height: 360
	        }).append(this.$imageBg);
	        if (this.imageBgBorderWidthArray[0] > 0) {
	          this.$imageBgContainer.css('overflow', 'hidden');
	        }
	        $previewContainer.css('position', 'relative').prepend(this.$imageBgContainer);
	        this.$preview.css('position', 'relative');

	        this.$preview.hover(function () {
	          _this.$imageBg.addClass(_constants.CLASS_NAMES.PREVIEW_HOVERED);
	        }, function () {
	          _this.$imageBg.removeClass(_constants.CLASS_NAMES.PREVIEW_HOVERED);
	        });
	      }

	      this.setInitialZoom(this.options.initialZoom);

	      this.imageLoaded = false;

	      this.moveContinue = false;

	      this.zoomer = new _Zoomer2['default']();

	      if (this.options.allowDragNDrop) {
	        _jquery2['default'].event.props.push('dataTransfer');
	      }

	      this.bindListeners();

	      if (this.options.imageState && this.options.imageState.src) {
	        this.loadImage(this.options.imageState.src);
	      }
	    }
	  }, {
	    key: 'bindListeners',
	    value: function bindListeners() {
	      this.$fileInput.on('change.cropit', this.onFileChange.bind(this));
	      this.$preview.on(_constants.EVENTS.PREVIEW, this.onPreviewEvent.bind(this));
	      this.$zoomSlider.on(_constants.EVENTS.ZOOM_INPUT, this.onZoomSliderChange.bind(this));

	      if (this.options.allowDragNDrop) {
	        this.$preview.on('dragover.cropit dragleave.cropit', this.onDragOver.bind(this));
	        this.$preview.on('drop.cropit', this.onDrop.bind(this));
	      }
	    }
	  }, {
	    key: 'unbindListeners',
	    value: function unbindListeners() {
	      this.$fileInput.off('change.cropit');
	      this.$preview.off(_constants.EVENTS.PREVIEW);
	      this.$preview.off('dragover.cropit dragleave.cropit drop.cropit');
	      this.$zoomSlider.off(_constants.EVENTS.ZOOM_INPUT);
	    }
	  }, {
	    key: 'onFileChange',
	    value: function onFileChange(e) {
	      this.options.onImageLoading();
	      this.setImageLoadingClass();
	      this.options.onFileChange(e);

	      if (this.$fileInput.get(0).files) {
	        this.loadFileReader(this.$fileInput.get(0).files[0]);
	      }
	    }
	  }, {
	    key: 'loadFileReader',
	    value: function loadFileReader(file) {
              var obj = this;
              var orientation;
              //EXIF js 可以读取图片的元信息 https://github.com/exif-js/exif-js
              EXIF.getData(file,function(){
                  orientation=EXIF.getTag(this,'Orientation');
              });
	      var fileReader = new FileReader(); 
	      //if (file && file.type.match('image')) {
	        fileReader.readAsDataURL(file);
	        //fileReader.onload = this.onFileReaderLoaded.bind(this);
	        fileReader.onload = function(e){ 
	          obj.loadImage(e.target.result,orientation); 
	        }
	        fileReader.onerror = this.onFileReaderError.bind(this);
	      //} else if (file) {
	       // this.onFileReaderError();
	      //}
	    }
	  }, {
	    key: 'onFileReaderLoaded',
	    value: function onFileReaderLoaded(e) {
	      this.loadImage(e.target.result);
	    }
	  }, {
	    key: 'onFileReaderError',
	    value: function onFileReaderError() {
	      this.options.onFileReaderError();
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(e) {
	      e.preventDefault();
	      e.dataTransfer.dropEffect = 'copy';
	      this.$preview.toggleClass(_constants.CLASS_NAMES.DRAG_HOVERED, e.type === 'dragover');
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(e) {
	      var _this2 = this;

	      e.preventDefault();
	      e.stopPropagation();

	      var files = Array.prototype.slice.call(e.dataTransfer.files, 0);
	      files.some(function (file) {
	        if (!file.type.match('image')) {
	          return false;
	        }

	        _this2.loadFileReader(file);
	        return true;
	      });

	      this.$preview.removeClass(_constants.CLASS_NAMES.DRAG_HOVERED);
	    }
	  }, {
	    key: 'loadImage',
	    value: function loadImage(imageSrc,orientation) {
	      if (!imageSrc) {
	        return;
	      }

//if (navigator.userAgent.match(/iphone/i)) {
if (orientation==3||orientation==6||orientation==8) {
//alert("123");
//alert(orientation);
  var _imageSrc = imageSrc;
  var obj = this;
  var image = new Image();  
  image.src = imageSrc;  
  image.onload = function() {  
    var degree=0,drawWidth,drawHeight,width,height;
    drawWidth=this.naturalWidth;
    drawHeight=this.naturalHeight;
    var radioHeight = 400 * this.naturalHeight / this.naturalWidth;
    if (radioHeight >= 300 && this.naturalWidth > 400) {  
        drawWidth = 400;  
        drawHeight = radioHeight;  
    } else if (radioHeight < 300 && this.naturalHeight > 300) {  
        drawHeight = 300;  
        drawWidth = drawHeight * this.naturalWidth / this.naturalHeight;  
    } 
    var canvas=document.createElement('canvas');
    canvas.width=width=drawWidth;
    canvas.height=height=drawHeight; 
    var context=canvas.getContext('2d');
    //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
    switch(orientation){
      //iphone横屏拍摄，此时home键在左侧
      case 3:
        degree=180;
        drawWidth=-width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width=height;
        canvas.height=width; 
        degree=90;
        drawWidth=width;
        drawHeight=-height;
        break;
      //iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width=height;
        canvas.height=width; 
        degree=270;
        drawWidth=-width;
        drawHeight=height;
        break;
    }
    //使用canvas旋转校正
    context.rotate(degree*Math.PI/180);
    context.drawImage(this,0,0,drawWidth,drawHeight);
    //返回校正图片
    imageSrc = canvas.toDataURL("image/jpeg",.8);
    if(imageSrc.length>6){
        obj.preImage.src = imageSrc;
    }else{
        obj.preImage.src = _imageSrc;
    }
  }
}else{
	this.preImage.src = imageSrc;
}
	    }
	  }, {
	    key: 'setImageSrc',
	    value: function setImageSrc(imageSrc) {
	      this.loadImage(imageSrc);
	    }
	  }, {
	    key: 'onPreImageLoaded',
	    value: function onPreImageLoaded() {
	      if (this.options.smallImage === 'reject' && (this.preImage.width * this.options.maxZoom < this.previewSize.w * this.options.exportZoom || this.preImage.height * this.options.maxZoom < this.previewSize.h * this.options.exportZoom)) {
	        this.onImageError(_constants.ERRORS.SMALL_IMAGE);
	        if (this.image.src) {
	          this.setImageLoadedClass();
	        }
	        return;
	      }

	      if (this.options.allowCrossOrigin) {
	        this.image.crossOrigin = this.preImage.src.indexOf('data:') === 0 ? null : 'Anonymous';
	      }

	      this.image.src = this.imageSrc = this.preImage.src;
	    }
	  }, {
	    key: 'onImageLoaded',
	    value: function onImageLoaded() {
	      this.imageSize = {
	        w: this.image.width,
	        h: this.image.height
	      };

	      this.setupZoomer(this.options.imageState && this.options.imageState.zoom || this.initialZoom);
	      if (this.options.imageState && this.options.imageState.offset) {
	        this.setOffset(this.options.imageState.offset);
	      } else {
	        this.centerImage();
	      }

	      this.options.imageState = {};

	      this.$preview.css('background-image', 'url(' + this.imageSrc + ')');
	      if (this.options.imageBackground) {
	        this.$imageBg.attr('src', this.imageSrc);
	      }

	      this.setImageLoadedClass();

	      this.imageLoaded = true;

	      this.options.onImageLoaded();
	    }
	  }, {
	    key: 'onImageError',
	    value: function onImageError() {
	      this.options.onImageError.apply(this, arguments);
	      this.removeImageLoadingClass();
	    }
	  }, {
	    key: 'setImageLoadingClass',
	    value: function setImageLoadingClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADED).addClass(_constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'setImageLoadedClass',
	    value: function setImageLoadedClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING).addClass(_constants.CLASS_NAMES.IMAGE_LOADED);
	    }
	  }, {
	    key: 'removeImageLoadingClass',
	    value: function removeImageLoadingClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'getEventPosition',
	    value: function getEventPosition(e) {
	      if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
	        e = e.originalEvent.touches[0];
	      }
	      if (e.clientX && e.clientY) {
	        return { x: e.clientX, y: e.clientY };
	      }
	    }
	  }, {
	    key: 'onPreviewEvent',
	    value: function onPreviewEvent(e) {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.moveContinue = false;
	      this.$preview.off(_constants.EVENTS.PREVIEW_MOVE);

	      if (e.type === 'mousedown' || e.type === 'touchstart') {
	        this.origin = this.getEventPosition(e);
	        this.moveContinue = true;
	        this.$preview.on(_constants.EVENTS.PREVIEW_MOVE, this.onMove.bind(this));
	      } else {
	        (0, _jquery2['default'])(document.body).focus();
	      }

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'onMove',
	    value: function onMove(e) {
	      var eventPosition = this.getEventPosition(e);

	      if (this.moveContinue && eventPosition) {
	        this.setOffset({
	          x: this.offset.x + eventPosition.x - this.origin.x,
	          y: this.offset.y + eventPosition.y - this.origin.y
	        });
	      }

	      this.origin = eventPosition;

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'setOffset',
	    value: function setOffset(position) {
	      if (!position || !(0, _utils.exists)(position.x) || !(0, _utils.exists)(position.y)) {
	        return;
	      }

	      this.offset = this.fixOffset(position);
	      this.$preview.css('background-position', '' + this.offset.x + 'px ' + this.offset.y + 'px');
	      if (this.options.imageBackground) {
	        this.$imageBg.css({
	          left: this.offset.x + (dw-200)/2,
	          top: this.offset.y + (360-300)/2
	        });
	      }

	      this.options.onOffsetChange(position);
	    }
	  }, {
	    key: 'fixOffset',
	    value: function fixOffset(offset) {
	      if (!this.imageLoaded) {
	        return offset;
	      }

	      var ret = { x: offset.x, y: offset.y };

	      if (!this.options.freeMove) {
	        if (this.imageSize.w * this.zoom >= this.previewSize.w) {
	          ret.x = Math.min(0, Math.max(ret.x, this.previewSize.w - this.imageSize.w * this.zoom));
	        } else {
	          ret.x = Math.max(0, Math.min(ret.x, this.previewSize.w - this.imageSize.w * this.zoom));
	        }

	        if (this.imageSize.h * this.zoom >= this.previewSize.h) {
	          ret.y = Math.min(0, Math.max(ret.y, this.previewSize.h - this.imageSize.h * this.zoom));
	        } else {
	          ret.y = Math.max(0, Math.min(ret.y, this.previewSize.h - this.imageSize.h * this.zoom));
	        }
	      }

	      ret.x = (0, _utils.round)(ret.x);
	      ret.y = (0, _utils.round)(ret.y);

	      return ret;
	    }
	  }, {
	    key: 'centerImage',
	    value: function centerImage() {
	      if (!this.imageSize || !this.zoom) {
	        return;
	      }

	      this.setOffset({
	        x: (this.previewSize.w - this.imageSize.w * this.zoom) / 2,
	        y: (this.previewSize.h - this.imageSize.h * this.zoom) / 2
	      });
	    }
	  }, {
	    key: 'onZoomSliderChange',
	    value: function onZoomSliderChange() {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.zoomSliderPos = Number(this.$zoomSlider.val());
	      var newZoom = this.zoomer.getZoom(this.zoomSliderPos);
	      if (newZoom === this.zoom) {
	        return;
	      }
	      this.setZoom(newZoom);
	    }
	  }, {
	    key: 'enableZoomSlider',
	    value: function enableZoomSlider() {
	      this.$zoomSlider.removeAttr('disabled');
	      this.options.onZoomEnabled();
	    }
	  }, {
	    key: 'disableZoomSlider',
	    value: function disableZoomSlider() {
	      this.$zoomSlider.attr('disabled', true);
	      this.options.onZoomDisabled();
	    }
	  }, {
	    key: 'setupZoomer',
	    value: function setupZoomer(zoom) {
	      this.zoomer.setup({
	        imageSize: this.imageSize,
	        previewSize: this.previewSize,
	        exportZoom: this.options.exportZoom,
	        maxZoom: this.options.maxZoom,
	        minZoom: this.options.minZoom,
	        smallImage: this.options.smallImage
	      });
	      this.setZoom((0, _utils.exists)(zoom) ? zoom : this.zoom);

	      if (this.isZoomable()) {
	        this.enableZoomSlider();
	      } else {
	        this.disableZoomSlider();
	      }
	    }
	  }, {
	    key: 'setZoom',
	    value: function setZoom(newZoom) {
	      newZoom = this.fixZoom(newZoom);

	      var updatedWidth = (0, _utils.round)(this.imageSize.w * newZoom);
	      var updatedHeight = (0, _utils.round)(this.imageSize.h * newZoom);

	      if (this.imageLoaded) {
	        var oldZoom = this.zoom;

	        var newX = this.previewSize.w / 2 - (this.previewSize.w / 2 - this.offset.x) * newZoom / oldZoom;
	        var newY = this.previewSize.h / 2 - (this.previewSize.h / 2 - this.offset.y) * newZoom / oldZoom;

	        this.zoom = newZoom;
	        this.setOffset({ x: newX, y: newY });
	      } else {
	        this.zoom = newZoom;
	      }

	      this.zoomSliderPos = this.zoomer.getSliderPos(this.zoom);
	      this.$zoomSlider.val(this.zoomSliderPos);

	      this.$preview.css('background-size', '' + updatedWidth + 'px ' + updatedHeight + 'px');
	      if (this.options.imageBackground) {
	        this.$imageBg.css({
	          width: updatedWidth,
	          height: updatedHeight
	        });
	      }

	      this.options.onZoomChange(newZoom);
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return this.zoomer.fixZoom(zoom);
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      return this.zoomer.isZoomable();
	    }
	  }, {
	    key: 'getCroppedImageData',
	    value: function getCroppedImageData(exportOptions) {
	      if (!this.imageSrc) {
	        return;
	      }

	      var exportDefaults = {
	        type: 'image/jpeg',
	        quality: 0.75,
	        originalSize: false,
	        fillBg: '#fff'
	      };
	      exportOptions = _jquery2['default'].extend({}, exportDefaults, exportOptions);

	      var exportZoom = exportOptions.originalSize ? 1 / this.zoom : this.options.exportZoom;

	      var zoomedSize = {
	        w: this.zoom * exportZoom * this.imageSize.w,
	        h: this.zoom * exportZoom * this.imageSize.h
	      };

	      var canvas = (0, _jquery2['default'])('<canvas />').attr({
	        width: this.previewSize.w * exportZoom,
	        height: this.previewSize.h * exportZoom
	      }).get(0);
	      var canvasContext = canvas.getContext('2d');

	      if (exportOptions.type === 'image/jpeg') {
	        canvasContext.fillStyle = exportOptions.fillBg;
	        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	      }

	      canvasContext.drawImage(this.image, this.offset.x * exportZoom, this.offset.y * exportZoom, zoomedSize.w, zoomedSize.h);

	      return canvas.toDataURL(exportOptions.type, exportOptions.quality);
	    }
	  }, {
	    key: 'getImageState',
	    value: function getImageState() {
	      return {
	        src: this.imageSrc,
	        offset: this.offset,
	        zoom: this.zoom
	      };
	    }
	  }, {
	    key: 'getImageSrc',
	    value: function getImageSrc() {
	      return this.imageSrc;
	    }
	  }, {
	    key: 'getOffset',
	    value: function getOffset() {
	      return this.offset;
	    }
	  }, {
	    key: 'getZoom',
	    value: function getZoom() {
	      return this.zoom;
	    }
	  }, {
	    key: 'getImageSize',
	    value: function getImageSize() {
	      if (!this.imageSize) {
	        return null;
	      }

	      return {
	        width: this.imageSize.w,
	        height: this.imageSize.h
	      };
	    }
	  }, {
	    key: 'getInitialZoom',
	    value: function getInitialZoom() {
	      return this.options.initialZoom;
	    }
	  }, {
	    key: 'setInitialZoom',
	    value: function setInitialZoom(initialZoomOption) {
	      this.options.initialZoom = initialZoomOption;
	      if (initialZoomOption === 'min') {
	        this.initialZoom = 0; // Will be fixed when image loads
	      } else if (initialZoomOption === 'image') {
	        this.initialZoom = 1;
	      } else {
	        this.initialZoom = 0;
	      }
	    }
	  }, {
	    key: 'getExportZoom',
	    value: function getExportZoom() {
	      return this.options.exportZoom;
	    }
	  }, {
	    key: 'setExportZoom',
	    value: function setExportZoom(exportZoom) {
	      this.options.exportZoom = exportZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'getMinZoom',
	    value: function getMinZoom() {
	      return this.options.minZoom;
	    }
	  }, {
	    key: 'setMinZoom',
	    value: function setMinZoom(minZoom) {
	      this.options.minZoom = minZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'getMaxZoom',
	    value: function getMaxZoom() {
	      return this.options.maxZoom;
	    }
	  }, {
	    key: 'setMaxZoom',
	    value: function setMaxZoom(maxZoom) {
	      this.options.maxZoom = maxZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'getPreviewSize',
	    value: function getPreviewSize() {
	      return {
	        width: this.previewSize.w,
	        height: this.previewSize.h
	      };
	    }
	  }, {
	    key: 'setPreviewSize',
	    value: function setPreviewSize(size) {
	      if (!size || size.width <= 0 || size.height <= 0) {
	        return;
	      }

	      this.previewSize = {
	        w: size.width,
	        h: size.height
	      };
	      this.$preview.css({
	        width: this.previewSize.w,
	        height: this.previewSize.h
	      });

	      if (this.options.imageBackground) {
	        this.$imageBgContainer.css({
	          width: this.previewSize.w + this.imageBgBorderWidthArray[1] + this.imageBgBorderWidthArray[3],
	          height: this.previewSize.h + this.imageBgBorderWidthArray[0] + this.imageBgBorderWidthArray[2]
	        });
	      }

	      if (this.imageLoaded) {
	        this.setupZoomer();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.unbindListeners();
	      this.disableZoomSlider();
	      this.$el.addClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: 'reenable',
	    value: function reenable() {
	      this.bindListeners();
	      this.enableZoomSlider();
	      this.$el.removeClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: '$',
	    value: function $(selector) {
	      if (!this.$el) {
	        return null;
	      }
	      return this.$el.find(selector);
	    }
	  }]);

	  return Cropit;
	})();

	exports['default'] = Cropit;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Zoomer = (function () {
	  function Zoomer() {
	    _classCallCheck(this, Zoomer);

	    this.minZoom = this.maxZoom = 1;
	  }

	  _createClass(Zoomer, [{
	    key: 'setup',
	    value: function setup(_ref) {
	      var imageSize = _ref.imageSize;
	      var previewSize = _ref.previewSize;
	      var exportZoom = _ref.exportZoom;
	      var maxZoom = _ref.maxZoom;
	      var minZoom = _ref.minZoom;
	      var smallImage = _ref.smallImage;

	      var widthRatio = previewSize.w / imageSize.w;
	      var heightRatio = previewSize.h / imageSize.h;

	      if (minZoom === 'fit') {
	        this.minZoom = Math.min(widthRatio, heightRatio);
	      } else {
	        this.minZoom = Math.max(widthRatio, heightRatio);
	      }

	      if (smallImage === 'allow') {
	        this.minZoom = Math.min(this.minZoom, 1);
	      }

	      this.maxZoom = Math.max(this.minZoom, maxZoom / exportZoom);
	    }
	  }, {
	    key: 'getZoom',
	    value: function getZoom(sliderPos) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return sliderPos * (this.maxZoom - this.minZoom) + this.minZoom;
	    }
	  }, {
	    key: 'getSliderPos',
	    value: function getSliderPos(zoom) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      if (this.minZoom === this.maxZoom) {
	        return 0;
	      } else {
	        return (zoom - this.minZoom) / (this.maxZoom - this.minZoom);
	      }
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return this.minZoom !== this.maxZoom;
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
	    }
	  }]);

	  return Zoomer;
	})();

	exports['default'] = Zoomer;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var PLUGIN_KEY = 'cropit';

	exports.PLUGIN_KEY = PLUGIN_KEY;
	var CLASS_NAMES = {
	  PREVIEW: 'cropit-image-preview',
	  PREVIEW_CONTAINER: 'cropit-image-preview-container',
	  FILE_INPUT: 'cropit-image-input',
	  ZOOM_SLIDER: 'cropit-image-zoom-input',
	  IMAGE_BACKGROUND: 'cropit-image-background',
	  IMAGE_BACKGROUND_CONTAINER: 'cropit-image-background-container',
	  PREVIEW_HOVERED: 'cropit-preview-hovered',
	  DRAG_HOVERED: 'cropit-drag-hovered',
	  IMAGE_LOADING: 'cropit-image-loading',
	  IMAGE_LOADED: 'cropit-image-loaded',
	  DISABLED: 'cropit-disabled'
	};

	exports.CLASS_NAMES = CLASS_NAMES;
	var ERRORS = {
	  IMAGE_FAILED_TO_LOAD: { code: 0, message: 'Image failed to load.' },
	  SMALL_IMAGE: { code: 1, message: 'Image is too small.' }
	};

	exports.ERRORS = ERRORS;
	var eventName = function eventName(events) {
	  return events.map(function (e) {
	    return '' + e + '.cropit';
	  }).join(' ');
	};
	var EVENTS = {
	  PREVIEW: eventName(['mousedown', 'mouseup', 'mouseleave', 'touchstart', 'touchend', 'touchcancel', 'touchleave']),
	  PREVIEW_MOVE: eventName(['mousemove', 'touchmove']),
	  ZOOM_INPUT: eventName(['mousemove', 'touchmove', 'change'])
	};
	exports.EVENTS = EVENTS;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _constants = __webpack_require__(4);

	var options = {
	  elements: [{
	    name: '$preview',
	    description: 'The HTML element that displays image preview.',
	    defaultSelector: '.' + _constants.CLASS_NAMES.PREVIEW
	  }, {
	    name: '$fileInput',
	    description: 'File input element.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.FILE_INPUT
	  }, {
	    name: '$zoomSlider',
	    description: 'Range input element that controls image zoom.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.ZOOM_SLIDER
	  }, {
	    name: '$previewContainer',
	    description: 'Preview container. Only needed when `imageBackground` is true.',
	    defaultSelector: '.' + _constants.CLASS_NAMES.PREVIEW_CONTAINER
	  }].map(function (o) {
	    o.type = 'jQuery element';
	    o['default'] = '$imageCropper.find(\'' + o.defaultSelector + '\')';
	    return o;
	  }),

	  values: [{
	    name: 'width',
	    type: 'number',
	    description: 'Width of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'height',
	    type: 'number',
	    description: 'Height of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'imageBackground',
	    type: 'boolean',
	    description: 'Whether or not to display the background image beyond the preview area.',
	    'default': false
	  }, {
	    name: 'imageBackgroundBorderWidth',
	    type: 'array or number',
	    description: 'Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.',
	    'default': [0, 0, 0, 0]
	  }, {
	    name: 'exportZoom',
	    type: 'number',
	    description: 'The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.',
	    'default': 1
	  }, {
	    name: 'allowDragNDrop',
	    type: 'boolean',
	    description: 'When set to true, you can load an image by dragging it from local file browser onto the preview area.',
	    'default': true
	  }, {
	    name: 'minZoom',
	    type: 'string',
	    description: 'This options decides the minimal zoom level of the image.\n        If set to `\'fill\'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `\'fit\'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.',
	    'default': 'fill'
	  }, {
	    name: 'maxZoom',
	    type: 'number',
	    description: 'Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.',
	    'default': 1
	  }, {
	    name: 'initialZoom',
	    type: 'string',
	    description: 'Determines the zoom when an image is loaded.\n        When set to `\'min\'`, image is zoomed to the smallest when loaded.\n        When set to `\'image\'`, image is zoomed to 100% when loaded.',
	    'default': 'min'
	  }, {
	    name: 'freeMove',
	    type: 'boolean',
	    description: 'When set to true, you can freely move the image instead of being bound to the container borders',
	    'default': false
	  }, {
	    name: 'smallImage',
	    type: 'string',
	    description: 'When set to `\'reject\'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n        When set to `\'allow\'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `\'stretch\'`, the minimum zoom of small images would follow `minZoom` option.',
	    'default': 'reject'
	  }, {
	    name: 'allowCrossOrigin',
	    type: 'boolean',
	    description: 'Set to true if you need to crop image served from other domains.',
	    'default': false
	  }],

	  callbacks: [{
	    name: 'onFileChange',
	    description: 'Called when user selects a file in the select file input.',
	    params: [{
	      name: 'event',
	      type: 'object',
	      description: 'File change event object'
	    }]
	  }, {
	    name: 'onFileReaderError',
	    description: 'Called when `FileReader` encounters an error while loading the image file.'
	  }, {
	    name: 'onImageLoading',
	    description: 'Called when image starts to be loaded.'
	  }, {
	    name: 'onImageLoaded',
	    description: 'Called when image is loaded.'
	  }, {
	    name: 'onImageError',
	    description: 'Called when image cannot be loaded.',
	    params: [{
	      name: 'error',
	      type: 'object',
	      description: 'Error object.'
	    }, {
	      name: 'error.code',
	      type: 'number',
	      description: 'Error code. `0` means generic image loading failure. `1` means image is too small.'
	    }, {
	      name: 'error.message',
	      type: 'string',
	      description: 'A message explaining the error.'
	    }]
	  }, {
	    name: 'onZoomEnabled',
	    description: 'Called when image the zoom slider is enabled.'
	  }, {
	    name: 'onZoomDisabled',
	    description: 'Called when image the zoom slider is disabled.'
	  }, {
	    name: 'onZoomChange',
	    description: 'Called when zoom changes.',
	    params: [{
	      name: 'zoom',
	      type: 'number',
	      description: 'New zoom.'
	    }]
	  }, {
	    name: 'onOffsetChange',
	    description: 'Called when image offset changes.',
	    params: [{
	      name: 'offset',
	      type: 'object',
	      description: 'New offset, with `x` and `y` values.'
	    }]
	  }].map(function (o) {
	    o.type = 'function';return o;
	  })
	};

	var loadDefaults = function loadDefaults($el) {
	  var defaults = {};
	  if ($el) {
	    options.elements.forEach(function (o) {
	      defaults[o.name] = $el.find(o.defaultSelector);
	    });
	  }
	  options.values.forEach(function (o) {
	    defaults[o.name] = o['default'];
	  });
	  options.callbacks.forEach(function (o) {
	    defaults[o.name] = function () {};
	  });

	  return defaults;
	};

	exports.loadDefaults = loadDefaults;
	exports['default'] = options;

/***/ },
/* 6 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var exists = function exists(v) {
	  return typeof v !== 'undefined';
	};

	exports.exists = exists;
	var round = function round(x) {
	  return +(Math.round(x * 100) + 'e-2');
	};

	exports.round = round;
	var capitalize = function capitalize(s) {
	  return s.charAt(0).toUpperCase() + s.slice(1);
	};
	exports.capitalize = capitalize;

/***/ }
/******/ ])
});
;


function showEditor(){
	$('.cropit-pop').show();
}

$(function() {
    $('.image-editor').cropit({
        exportZoom: 1,
        imageBackground: true,
        smallImage:'stretch',
    });


    $('#cropit-save').click(function() {
      // Move cropped image data to hidden input
      var imageData = $('.image-editor').cropit('export');
      $('.cropit-pop').hide();
      $('.year-plpic .op').before("<div class='year-op-pic'><img class='sh' src='" + imageData + "'><span class='del' onclick='delPic(this);'></span></div>");

      return false;
    });

    $('#cropit-del').click(function() {
      $('.cropit-pop').hide();
    })

});

//年味发评论
function postComment(){
	$(".plbtn").html("请稍候...");
	var kaiguan =1; //点击一次执行中不可再点
	if(kaiguan){
		kaiguan = 0;
		var topicId = $("#topicId").val();
		var comment = $("#comment").val();
                var BasePath = $("#BasePath").val();
		comment = comment.replace(/\n/g,'{br}');
                comment = comment.replace(/\s+/g,""); 
		var u = escape('http://group.miguxue.com:8089/circle/comment/create?topicId='+topicId);
		var s = encodeURI('{"content":"'+comment+'"}');
		var lmsTokenId = getCookie("lmsTokenId");
		if(lmsTokenId!=null && lmsTokenId!=""){
			var url =BasePath +"/c/externalInterfaceCall?interfaceUrl="+u+"&type=2&needLoginCheck=1&fileType=topic&requestBody="+s+"&lmsTokenId="+lmsTokenId;
		}else{
			$(".pophui").show();
			setTimeout(function() {$(".pophui").hide();},2000);
			var CurrentUrl = $("#CurrentUrl").val();
			var purl = escape(CurrentUrl);
			window.location.href=BasePath +"/p/Login.jsp?purl="+purl;
		}
		if(comment != "" ||comment.indexOf(" ")!=-1){
			$.ajax({
				type: "POST",
				url:  url,
				dataType: "text",
				success: function(data){
					var json = eval(JSON.parse(data));
					var resultInfo = json.resultInfo;
					var resultCode = resultInfo.resultCode;
					var resultMsg = resultInfo.resultMsg;
		            if(resultCode == "200"){
		            	$(".pophui p").html("发布成功");
		            	$(".pophui").show();
				setTimeout(function() {$(".pophui").hide();},2000);
                                var backUrl= $("#purl").val();
		                window.location.href = backUrl;
		            }else{
		            	$(".pophui p").html("发布失败");
		            	$(".pophui").show();
				setTimeout(function() {$(".pophui").hide();},2000);
				$(".plbtn").html("发 布");
		            }
				},
				error: function() {
$(".pophui p").html("服务器开小差了，稍候再试吧");
		            	$(".pophui").show();
						setTimeout(function() {$(".pophui").hide();},2000);
					$(".plbtn").html("发 布");
				}
			});
		}else{
                       $(".pophui p").html("您输入的内容输入不能为空");
		       $(".pophui").show();
			setTimeout(function() {$(".pophui").hide();},2000);
			$(".plbtn").html("发 布");
		}
	} 
}

//年味发话题
function postTopic(){
	$(".plbtn").html("请稍候...");
	var kaiguan =1; //点击一次执行中不可再点
	if(kaiguan){
		kaiguan = 0;
		var comment = $("#comment").val();
		comment = comment.replace(/\n/g,'{br}');
                 comment = comment.replace(/\s+/g,""); 
                var BasePath = $("#BasePath").val();
		var count = $("#imgCount").val();
	    if(count == "1"){
	    	var imgId1 = $("#imgId1").val();
		    var imgUrl1 = $("#imgUrl1").val();
		    var s = encodeURI('{"title":"","content":"'+comment+'", "isTop":"","likeCount":"","commentCount":"","picList":[{ "id":"'+imgId1+'", "url":"'+imgUrl1+'", "width":"", "height":"", "size":"", "numberId":""}]}');
	    }else if(count == "2"){
	    	var imgId1 = $("#imgId1").val();
	    	var imgUrl1 = $("#imgUrl1").val();
	    	var imgId2 = $("#imgId2").val();
	    	var imgUrl2 = $("#imgUrl2").val();
	    	var s = encodeURI('{"title":"","content":"'+comment+'", "isTop":"","likeCount":"","commentCount":"","picList":[{ "id":"'+imgId1+'", "url":"'+imgUrl1+'", "width":"", "height":"", "size":"", "numberId":""},{ "id":"'+imgId2+'", "url":"'+imgUrl2+'", "width":"", "height":"", "size":"", "numberId":""}]}');
	    }else if(count == "3"){
	        var imgId1 = $("#imgId1").val();
	        var imgUrl1 = $("#imgUrl1").val();
			var imgId2 = $("#imgId2").val();
	        var imgUrl2 = $("#imgUrl2").val();
			var imgId3 = $("#imgId3").val();
			var imgUrl3 = $("#imgUrl3").val();
			var s = encodeURI('{"title":"","content":"'+comment+'", "isTop":"","likeCount":"","commentCount":"","picList":[{ "id":"'+imgId1+'", "url":"'+imgUrl1+'", "width":"", "height":"", "size":"", "numberId":""},{ "id":"'+imgId2+'", "url":"'+imgUrl2+'", "width":"", "height":"", "size":"", "numberId":""},{ "id":"'+imgId3+'", "url":"'+imgUrl3+'", "width":"", "height":"", "size":"", "numberId":""}]}');
		}else{
			var s = encodeURI('{"title":"","content":"'+comment+'", "isTop":"","likeCount":"","commentCount":""}');
		}
                var circleId = $("#circleId").val();
		var u = escape('http://group.miguxue.com:8089/circle/topic/create?circleId='+circleId);
		var lmsTokenId = getCookie("lmsTokenId");
		if(lmsTokenId!=null && lmsTokenId!=""){
			var url =BasePath +"/c/externalInterfaceCall?interfaceUrl="+u+"&type=2&needLoginCheck=1&fileType=topic&requestBody="+s+"&lmsTokenId="+lmsTokenId;
		}else{
			$(".pophui").show();
			setTimeout(function() {$(".pophui").hide();},2000);
			var CurrentUrl = $("#CurrentUrl").val();
			var purl = escape(CurrentUrl);
			window.location.href=BasePath +"/p/Login.jsp?purl="+purl;
		}
		if(comment != "" || count != "0"){
			$.ajax({
				type: "POST",
				url:  url,
				dataType: "text",
				success: function(data){
					var json = eval(JSON.parse(data));
					var resultInfo = json.resultInfo;
					var resultCode = resultInfo.resultCode;
					var resultMsg = resultInfo.resultMsg;
		            if(resultCode == "200"){
		            	$(".pophui p").html("发布成功");
		            	$(".pophui").show();
				setTimeout(function() {$(".pophui").hide();},2000);
                                var backUrl= $("#purl").val();
		                window.location.href = backUrl;
		            }else if(resultCode == "25000"){
		            	$(".pophui p").html(resultMsg);
		            	$(".pophui").show();
						setTimeout(function() {$(".pophui").hide();},2000);
var CurrentUrl = $("#CurrentUrl").val();
			var purl = escape(CurrentUrl);			
setTimeout(function() {window.location.href=BasePath +"/p/Login.jsp?purl="+purl;},2001);
						$(".plbtn").html("发 布");
		            }else{
		            	$(".pophui p").html(resultMsg);
		            	$(".pophui").show();
						setTimeout(function() {$(".pophui").hide();},2000);
						$(".plbtn").html("发 布");
		            }
				},
				error: function() {
$(".pophui p").html("服务器开小差了，稍候再试吧");
		            	$(".pophui").show();
						setTimeout(function() {$(".pophui").hide();},2000);
					$(".plbtn").html("发 布");
				}
			});
		}else{
                       $(".pophui p").html("您输入的内容输入不能为空");
		        $(".pophui").show();
			setTimeout(function() {$(".pophui").hide();},2000);    
                       $(".plbtn").html("发 布");
		}
	}
}


function delPic(obj,n){
    $(obj).parents('.year-op-pic').remove();
	$("#add").show();
	var count = $("#imgCount").val();
    count = parseInt(count);
	if(n == 1){
		var imgId2 = $("#imgId2").val();
        var imgUrl2 = $("#imgUrl2").val();
		var imgId3 = $("#imgId3").val();
		var imgUrl3 = $("#imgUrl3").val();
		document.getElementById("imgId1").value=imgId2;
		document.getElementById("imgUrl1").value=imgUrl2;
		document.getElementById("imgId2").value=imgId3;
		document.getElementById("imgUrl2").value=imgUrl3;
		document.getElementById("imgId3").value="";
		document.getElementById("imgUrl3").value="";
		document.getElementById("imgCount").value=count-1;	
	}else if(n== 2){
		var imgId3 = $("#imgId3").val();
		var imgUrl3 = $("#imgUrl3").val();
		document.getElementById("imgId2").value=imgId3;
		document.getElementById("imgUrl2").value=imgUrl3;
		document.getElementById("imgId3").value="";
		document.getElementById("imgUrl3").value="";
		document.getElementById("imgCount").value=count-1;	
	}else if(n == 3){
		document.getElementById("imgId3").value="";
		document.getElementById("imgUrl3").value="";
		document.getElementById("imgCount").value=count-1;	
		
	}
	if(count<3){$("#add").show();}
}


//获取cookie中的值
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i< ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)=='') c = c.substring(1);
        if (c.indexOf(name) != -1) {
		return c.substring(name.length + 1, c.length);
	}
    }
    return "";
}
