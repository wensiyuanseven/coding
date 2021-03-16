/* AlloyFinger v0.1.15
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */
// todo为什么前面要有一个逗号？？？
; (function () {
    // 计算两点长度
    function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    //判断旋转方向
    function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }
    // 得到旋转角度
    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2)
        if (cross(v1, v2) > 0) {
            angle *= -1;
        }
        return angle * 180 / Math.PI;
    }
    // 发布订阅，中间站
    var HandlerAdmin = function(el) {
        this.handlers = [];
        this.el = el;
    };

    HandlerAdmin.prototype.add = function(handler) {
        this.handlers.push(handler);
    }

    HandlerAdmin.prototype.del = function(handler) {
        if(!handler) this.handlers = [];
        for(var i=this.handlers.length; i>=0; i--) {
            if(this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
            }
        }
    }

   // 事件派发
    HandlerAdmin.prototype.dispatch = function() {
        // 执行事件
        for(var i=0,len=this.handlers.length; i<len; i++) {
            var handler = this.handlers[i];
            // arguments是指的dispatch传入的参数
            // 依次取出拿到参数传入
            if(typeof handler === 'function') handler.apply(this.el, arguments);
        }
    }


    function wrapFunc(el, handler) {
        var handlerAdmin = new HandlerAdmin(el);
        // 添加定义的事件[]
        handlerAdmin.add(handler);
        return handlerAdmin;
    }

        /*
        *@description:初始化实例
        *@author: 温思远
        *@date: 2020-05-12 22:09:41
        *@variable1:string||el
        *@variable2: {}
        */
    var AlloyFinger = function (el, option) {

        this.element = typeof el == 'string' ? document.querySelector(el) : el;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.cancel = this.cancel.bind(this);

        // 监听start
        this.element.addEventListener("touchstart", this.start, false);
        this.element.addEventListener("touchmove", this.move, false);
        this.element.addEventListener("touchend", this.end, false);
        this.element.addEventListener("touchcancel", this.cancel, false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.zoom = 1;
        this.isDoubleTap = false;

        var noop = function () { }; //传入默认函数

        this.rotate = wrapFunc(this.element, option.rotate || noop);
        this.touchStart = wrapFunc(this.element, option.touchStart || noop); // 把用户写的原生事件也放到此事件中心上
        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
        //当手指离开，屏幕只剩一个手指或零个手指触发
        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
        // 捏
        this.pinch = wrapFunc(this.element, option.pinch || noop);
        this.swipe = wrapFunc(this.element, option.swipe || noop);
        this.tap = wrapFunc(this.element, option.tap || noop);//点按事件
        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
        this.longTap = wrapFunc(this.element, option.longTap || noop);
        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
        this.twoFingerPressMove = wrapFunc(this.element, option.twoFingerPressMove || noop);
        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

        this._cancelAllHandler = this.cancelAll.bind(this);

        window.addEventListener('scroll', this._cancelAllHandler);

        this.delta = null;//点按间隔
        this.last = null;
        this.now = null;//当前点按的时间
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        // 初始化手指坐标
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    };

    // 挂载在原型上面的事件 可以在函数中用this访问
    AlloyFinger.prototype = {
        start: function (evt) {
            // touches 屏幕中手指信息
            if (!evt.touches) return;
            this.now = Date.now();
            this.x1 = evt.touches[0].pageX; // 当前手指X坐标
            this.y1 = evt.touches[0].pageY; // 当前手指Y坐标
            this.delta = this.now - (this.last || this.now);
            // console.log(this.delta,'---点按间隔---')
            // 触发回调执行逻辑
            this.touchStart.dispatch(evt, this.element);
            //------------------tap end------------------

            // 第一次不触发，第二次点击会触发 然后判断是否是双击

            if (this.preTapPosition.x !== null) {

                // 是否是双击
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
                if (this.isDoubleTap) {
                    clearTimeout(this.singleTapTimeout);
                }
            }

            this.preTapPosition.x = this.x1;
            this.preTapPosition.y = this.y1;
            this.last = this.now;
            var preV = this.preV,
                len = evt.touches.length; //屏幕上面的手指数量
            if (len > 1) {
                // 取消长按
                this._cancelLongTap();
                // 取消单击
                this._cancelSingleTap();
                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                // 得到第一根和第二根手指之间的距离,【其余的手指距离都不要】但是并没有传递给multipointStart事件
                this.pinchStartLen = getLen(preV);
                // 一个手指以上触摸屏幕触发
                this.multipointStart.dispatch(evt, this.element);
            }
            this._preventTap = false;
            this.longTapTimeout = setTimeout(function () {
                // 长按
                this.longTap.dispatch(evt, this.element);
                this._preventTap = true;
            }.bind(this), 750);
        },
        move: function (evt) {
            if (!evt.touches) return;
            var preV = this.preV,
                len = evt.touches.length,
                currentX = evt.touches[0].pageX, //第一根手指X距离
                currentY = evt.touches[0].pageY; //第一根手指Y距离
            this.isDoubleTap = false;
            if (len > 1) {
                var sCurrentX = evt.touches[1].pageX,
                    sCurrentY = evt.touches[1].pageY
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (this.pinchStartLen > 0) {
                        evt.zoom = getLen(v) / this.pinchStartLen;
                        // 捏的操作
                        this.pinch.dispatch(evt, this.element);
                    }
                    evt.angle = getRotateAngle(v, preV);
                    this.rotate.dispatch(evt, this.element);
                }
                preV.x = v.x;
                preV.y = v.y;

                if (this.x2 !== null && this.sx2 !== null) {
                    evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
                    evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                // 两根手指移动
                this.twoFingerPressMove.dispatch(evt, this.element);

                this.sx2 = sCurrentX;
                this.sy2 = sCurrentY;
            } else {
                if (this.x2 !== null) {
                    // 8-2=6
                    evt.deltaX = currentX - this.x2;
                    evt.deltaY = currentY - this.y2;

                    // move事件中添加对当前触摸点到初始触摸点的判断，
                    // 如果曾经大于过某个距离(比如10),就认为是移动到某个地方又移回来，应该不再触发tap事件才对。
                    var movedX = Math.abs(this.x1 - this.x2),
                        movedY = Math.abs(this.y1 - this.y2);

                    if(movedX > 10 || movedY > 10){
                        // 防止触发tap事件
                        this._preventTap = true;
                    }

                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }

                // 按着移动【只有一根手指的情况下】
                this.pressMove.dispatch(evt, this.element);
            }
             // 不管有几根手指都会触发
            this.touchMove.dispatch(evt, this.element);
            // 取消长按
            this._cancelLongTap();

            // 默认赋值上去
            this.x2 = currentX; //默认赋值到第一根手指的x距离   2
            this.y2 = currentY; //

            if (len > 1) {
                evt.preventDefault();
            }
        },
        end: function (evt) {
            //是否有改变的手指集合
            if (!evt.changedTouches) return;
            // 清除长按定时器
            this._cancelLongTap();
            var self = this;
            //手指离开屏幕的时候触发
            if (evt.touches.length < 2) {
                this.multipointEnd.dispatch(evt, this.element);
                this.sx2 = this.sy2 = null;
            }

            //swipe
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
                // 判断滑屏方向
                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                this.swipeTimeout = setTimeout(function () {
                    self.swipe.dispatch(evt, self.element);
                }, 0)
            } else {
                //触发单击
                // 判断 touchstart 的手的坐标和 touchend 时候手的坐标 x、y 方向偏移要小于 30。小于 30 才会去触发 tap
                this.tapTimeout = setTimeout(function () {
                    if(!self._preventTap){
                        // 触发点按，防止android机滑屏误触
                        self.tap.dispatch(evt, self.element);
                    }
                    // trigger double tap immediately 立即触发双击
                    if (self.isDoubleTap) {
                        self.doubleTap.dispatch(evt, self.element);
                        self.isDoubleTap = false;
                    }
                }, 0)
                 // 带延迟的点按
                if (!self.isDoubleTap) {
                    // 单击
                    self.singleTapTimeout = setTimeout(function () {
                        self.singleTap.dispatch(evt, self.element);
                    }, 250);
                }
            }
            // 触发touchend
            this.touchEnd.dispatch(evt, this.element);

            this.preV.x = 0;
            this.preV.y = 0;
            this.zoom = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancelAll: function () {
            this._preventTap = true
            clearTimeout(this.singleTapTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
        },
        cancel: function (evt) {
            this.cancelAll()
            this.touchCancel.dispatch(evt, this.element);
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout);
        },
        _cancelSingleTap: function () {
            clearTimeout(this.singleTapTimeout);
        },

        // 判断滑屏方向 【start时第一根手指x坐标,move时第一根手指x坐标,start时第一根手指y坐标,move时第一根手指y坐标,】
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },
        on: function(evt, handler) {
            if(this[evt]) {
                this[evt].add(handler);
            }
        },

        off: function(evt, handler) {
            if(this[evt]) {
                this[evt].del(handler);
            }
        },

        destroy: function() {
            if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
            if(this.tapTimeout) clearTimeout(this.tapTimeout);
            if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
            if(this.swipeTimeout) clearTimeout(this.swipeTimeout);
            this.element.removeEventListener("touchstart", this.start);
            this.element.removeEventListener("touchmove", this.move);
            this.element.removeEventListener("touchend", this.end);
            this.element.removeEventListener("touchcancel", this.cancel);
        // ---------------手势事件start---------
            this.rotate.del();
            this.touchStart.del();
            this.multipointStart.del();
            this.multipointEnd.del();
            this.pinch.del();
            this.swipe.del();
            this.tap.del();
            this.doubleTap.del();
            this.longTap.del();
            this.singleTap.del();
            this.pressMove.del();
            this.twoFingerPressMove.del()
            this.touchMove.del();
            this.touchEnd.del();
            this.touchCancel.del();
        //---------------手势事件end-----------------
            this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null;

            window.removeEventListener('scroll', this._cancelAllHandler);

            return null;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    }
})();
