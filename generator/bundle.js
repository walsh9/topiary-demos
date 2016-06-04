/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _topiary = __webpack_require__(1);
	
	var _topiary2 = _interopRequireDefault(_topiary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var treeOptions = {
	  canvas: document.getElementById("canvas"),
	  startPoint: _topiary2.default.Vector2d.new(250, 500),
	  color: _topiary2.default.Color.random(),
	  height: 100,
	  thickness: 10,
	  depth: 14,
	  rainbow: false,
	  colorShiftRate: 30,
	  delay: 200
	};
	var mutationOptions = {
	  minLeftAngle: 10,
	  maxLeftAngle: 40,
	  minRightAngle: 20,
	  maxRightAngle: 40,
	  minHeightChange: 0.6,
	  maxHeightChange: 0.9,
	  minThicknessChange: 0.6,
	  maxThicknessChange: 0.9
	};
	var tree = _topiary2.default.new(treeOptions, mutationOptions);
	var draw = function draw() {
	  tree.kill();
	  tree = _topiary2.default.new(treeOptions, mutationOptions);
	  var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext("2d");
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  tree.draw();
	};
	
	var updatedMin = function updatedMin() {
	  if (mutationOptions.maxLeftAngle < mutationOptions.minLeftAngle) {
	    mutationOptions.maxLeftAngle = mutationOptions.minLeftAngle;
	  }
	  if (mutationOptions.maxRightAngle < mutationOptions.minRightAngle) {
	    mutationOptions.maxRightAngle = mutationOptions.minRightAngle;
	  }
	  if (mutationOptions.maxHeightChange < mutationOptions.minHeightChange) {
	    mutationOptions.maxHeightChange = mutationOptions.minHeightChange;
	  }
	  if (mutationOptions.maxThicknessChange < mutationOptions.minThicknessChange) {
	    mutationOptions.maxThicknessChange = mutationOptions.minThicknessChange;
	  }
	};
	
	var updatedMax = function updatedMax() {
	  if (mutationOptions.minLeftAngle > mutationOptions.maxLeftAngle) {
	    mutationOptions.minLeftAngle = mutationOptions.maxLeftAngle;
	  }
	  if (mutationOptions.minRightAngle > mutationOptions.maxRightAngle) {
	    mutationOptions.minRightAngle = mutationOptions.maxRightAngle;
	  }
	  if (mutationOptions.minHeightChange > mutationOptions.maxHeightChange) {
	    mutationOptions.minHeightChange = mutationOptions.maxHeightChange;
	  }
	  if (mutationOptions.minThicknessChange > mutationOptions.maxThicknessChange) {
	    mutationOptions.minThicknessChange = mutationOptions.maxThicknessChange;
	  }
	};
	var button = {
	  redraw: draw,
	  changeColor: function changeColor() {
	    treeOptions.color = _topiary2.default.Color.random();
	    this.redraw();
	  }
	};
	var gui = new dat.GUI();
	gui.add(treeOptions, 'height').min(0).step(5).max(200).onFinishChange(draw);
	gui.add(treeOptions, 'thickness').min(0).max(15).onFinishChange(draw);
	gui.add(treeOptions, 'depth').step(1).min(0).max(20).onFinishChange(draw);
	gui.add(mutationOptions, 'minLeftAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMin);
	gui.add(mutationOptions, 'maxLeftAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMax);
	gui.add(mutationOptions, 'minRightAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMin);
	gui.add(mutationOptions, 'maxRightAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMax);
	gui.add(mutationOptions, 'minHeightChange').min(0.5).max(1).listen().onFinishChange(draw).onChange(updatedMin);
	gui.add(mutationOptions, 'maxHeightChange').min(0.5).max(1).listen().onFinishChange(draw).onChange(updatedMax);
	gui.add(mutationOptions, 'minThicknessChange').min(0.5).max(1.25).listen().onFinishChange(draw).onChange(updatedMin);
	gui.add(mutationOptions, 'maxThicknessChange').min(0.5).max(1.25).listen().onFinishChange(draw).onChange(updatedMax);
	gui.add(treeOptions, 'rainbow').onFinishChange(draw);
	gui.add(treeOptions, 'colorShiftRate').min(5).step(5).max(180).onFinishChange(draw);
	gui.add(treeOptions, 'delay').min(0).step(5).max(500).onFinishChange(draw);
	gui.add(button, 'changeColor');
	gui.add(button, 'redraw');
	draw();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("Topiary", [], factory);
		else if(typeof exports === 'object')
			exports["Topiary"] = factory();
		else
			root["Topiary"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		__webpack_require__(1);
		__webpack_require__(2);
		__webpack_require__(3);
		module.exports = __webpack_require__(4);
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var randomBetween = function randomBetween(min, max) {
		  return Math.random() * (max - min) + min;
		};
		exports.randomBetween = randomBetween;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		var Vector2d = function Vector2d(x, y) {
		    this.x = x;
		    this.y = y;
		};
		
		Vector2d.prototype.to = function (angle, length) {
		    var DEG_TO_RAD = Math.PI / 180;
		    var toX = this.x + Math.sin(angle * DEG_TO_RAD) * length;
		    var toY = this.y + Math.cos(angle * DEG_TO_RAD) * length;
		    return new Vector2d(toX, toY);
		};
		
		exports.default = Vector2d;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _math_helpers = __webpack_require__(1);
		
		var Color = function Color(h, s, l) {
		    if (typeof h == "string" && s === undefined) {
		        this.h = parseInt(style.split("(")[1]);
		        this.s = parseInt(style.split(",")[1]);
		        this.l = parseInt(style.split(",")[2]);
		    } else {
		        this.h = h;
		        this.s = s;
		        this.l = l;
		    }
		}; // HSL colors
		
		
		Color.prototype.toStyle = function () {
		    return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)";
		};
		
		Color.prototype.darker = function (n) {
		    return new Color(this.h, this.s, Math.max(0, this.l - n));
		};
		
		Color.prototype.shiftHue = function (n) {
		    var newH = this.h + n % 359;
		    return new Color(newH, this.s, this.l);
		};
		
		Color.random = function () {
		    var h = (0, _math_helpers.randomBetween)(0, 359);
		    var s = (0, _math_helpers.randomBetween)(0, 100);
		    var l = (0, _math_helpers.randomBetween)(0, 100);
		    return new Color(h, s, l);
		};
		
		exports.default = Color;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		
		var _color = __webpack_require__(3);
		
		var _color2 = _interopRequireDefault(_color);
		
		var _vector2d = __webpack_require__(2);
		
		var _vector2d2 = _interopRequireDefault(_vector2d);
		
		var _math_helpers = __webpack_require__(1);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var TopiaryObject = function TopiaryObject(treeOptions, mutationOptions) {
		    var _this = this;
		
		    this.alive = true;
		    var mutate = function mutate(treeOptions, isRightBranch) {
		        var mOpts = _this.mutationOptions;
		        var tOpts = treeOptions;
		        return {
		            canvas: tOpts.canvas,
		            depth: tOpts.depth - 1,
		            angle: isRightBranch ? tOpts.angle + (0, _math_helpers.randomBetween)(mOpts.minRightAngle, mOpts.maxRightAngle) : tOpts.angle - (0, _math_helpers.randomBetween)(mOpts.minLeftAngle, mOpts.maxLeftAngle),
		            height: tOpts.height * (0, _math_helpers.randomBetween)(mOpts.minHeightChange, mOpts.maxHeightChange),
		            thickness: tOpts.thickness * (0, _math_helpers.randomBetween)(mOpts.minThicknessChange, mOpts.maxThicknessChange),
		            delay: tOpts.delay,
		            color: tOpts.color,
		            rainbow: tOpts.rainbow,
		            colorShiftRate: tOpts.colorShiftRate
		        };
		    };
		
		    var drawTree = function drawTree(treeOptions) {
		        var opts = treeOptions;
		        if (opts.depth > 0 && _this.alive) {
		            (function () {
		                if (opts.angle === undefined) {
		                    opts.angle = 180;
		                }
		                var branch = drawBranch(opts);
		                var leftOptions = mutate(opts, false);
		                var rightOptions = mutate(opts, true);
		                leftOptions.startPoint = rightOptions.startPoint = branch.endPoint;
		                leftOptions.color = rightOptions.color = branch.endColor;
		                if (opts.delay) {
		                    var timeout = window.setTimeout(function () {
		                        drawTree(leftOptions);
		                        drawTree(rightOptions);
		                    }, opts.delay);
		                } else {
		                    drawTree(leftOptions);
		                    drawTree(rightOptions);
		                }
		            })();
		        }
		    };
		
		    var drawBranch = function drawBranch(treeOptions) {
		        var opts = treeOptions;
		        var ctx = opts.canvas.getContext("2d");
		        var endPoint = opts.startPoint.to(opts.angle, opts.height);
		        var color = void 0,
		            nextColor = void 0;
		        if (opts.rainbow) {
		            nextColor = opts.color.shiftHue(opts.colorShiftRate);
		            var gradient = ctx.createLinearGradient(opts.startPoint.x, opts.startPoint.y, endPoint.x, endPoint.y);
		            gradient.addColorStop(0, opts.color.toStyle());
		            gradient.addColorStop(1, nextColor.toStyle());
		            color = gradient;
		        } else {
		            nextColor = opts.color;
		            color = opts.color.toStyle();
		        }
		        ctx.strokeStyle = color;
		        ctx.lineWidth = opts.thickness;
		        ctx.beginPath();
		        ctx.moveTo(opts.startPoint.x, opts.startPoint.y);
		        ctx.lineTo(endPoint.x, endPoint.y);
		        ctx.stroke();
		        return { endPoint: endPoint, endColor: nextColor };
		    };
		
		    var mutationDefaults = {
		        minLeftAngle: 10,
		        maxLeftAngle: 40,
		        minRightAngle: 10,
		        maxRightAngle: 40,
		        minHeightChange: 0.6,
		        maxHeightChange: 0.9,
		        minThicknessChange: 0.6,
		        maxThicknessChange: 0.9
		    };
		
		    this.treeOptions = treeOptions;
		    this.mutationOptions = mutationOptions || mutationDefaults;
		    this.draw = function () {
		        drawTree(this.treeOptions);
		    };
		    this.kill = function () {
		        this.alive = false;
		    };
		    return this;
		};
		var Topiary = {};
		Topiary.new = function (treeOptions, mutationOptions) {
		    return new TopiaryObject(treeOptions, mutationOptions);
		};
		Topiary.Color = {};
		Topiary.Vector2d = {};
		Topiary.Color.new = function (h, s, l) {
		    return new _color2.default(h, s, l);
		};
		Topiary.Color.random = function () {
		    return _color2.default.random();
		};
		Topiary.Vector2d.new = function (x, y) {
		    return new _vector2d2.default(x, y);
		};
		
		exports.default = Topiary;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=bundle.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map