(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["better-gesture"]=t():e["better-gesture"]=t()})("undefined"!==typeof self?self:this,(function(){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s="fb15")}({8875:function(e,t,i){var s,n,r;(function(i,o){n=[],s=o,r="function"===typeof s?s.apply(t,n):s,void 0===r||(e.exports=r)})("undefined"!==typeof self&&self,(function(){function e(){const t=Object.getOwnPropertyDescriptor(document,"currentScript");if(!t&&"currentScript"in document&&document.currentScript)return document.currentScript;if(t&&t.get!==e&&document.currentScript)return document.currentScript;try{throw new Error}catch(v){var i,s,n,r=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,o=/@([^@]*):(\d+):(\d+)\s*$/gi,h=r.exec(v.stack)||o.exec(v.stack),u=h&&h[1]||!1,a=h&&h[2]||!1,l=document.location.href.replace(document.location.hash,""),c=document.getElementsByTagName("script");u===l&&(i=document.documentElement.outerHTML,s=new RegExp("(?:[^\\n]+?\\n){0,"+(a-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),n=i.replace(s,"$1").trim());for(var p=0;p<c.length;p++){if("interactive"===c[p].readyState)return c[p];if(c[p].src===u)return c[p];if(u===l&&c[p].innerHTML&&c[p].innerHTML.trim()===n)return c[p]}return null}}return e}))},fb15:function(e,t,i){"use strict";if(i.r(t),"undefined"!==typeof window){var s=window.document.currentScript,n=i("8875");s=n(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:n});var r=s&&s.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);r&&(i.p=r[1])}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function u(e,t,i){return t&&h(e.prototype,t),i&&h(e,i),e}function a(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function l(e,t){return e.x*t.x+e.y*t.y}function c(e,t){var i=a(e)*a(t);if(0===i)return 0;var s=l(e,t)/i;return s>1&&(s=1),Math.acos(s)}function p(e,t){return e.x*t.y-t.x*e.y}function v(e,t){var i=c(e,t);return p(e,t)>0&&(i*=-1),180*i/Math.PI}function m(){try{return/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?"Mobile":"PC"}catch(e){return"Mini"}}var d=function(){function e(t){o(this,e),this._Observer={},this.el=t}return u(e,[{key:"register",value:function(e,t){"function"===typeof t&&("undefined"===typeof this._Observer[e]?this._Observer[e]=[t]:this._Observer[e].push(t))}},{key:"dispatch",value:function(e,t){if(this._Observer[e]){var i=this;t.gesture={event:Object.keys(this._Observer),on:function(e,t){i.register(e,t)},off:function(e){i.remove(e)},destroy:function(){i._Observer={}}};for(var s=0,n=this._Observer[e].length;s<n;s++){var r=this._Observer[e][s];"function"===typeof r&&r.call(this.el,t,"123")}}}},{key:"remove",value:function(e){if(this._Observer[e]instanceof Array)for(var t=this._Observer[e].length-1;t>=0;t--)this._Observer[e].splice(t,1)}}]),e}(),f=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e),this.element="string"==typeof t?document.querySelector(t):t,this.userAgent=m(),this.Observer=new d(this.element),"Mini"===this.userAgent?(this.element.start=this.start.bind(this),this.element.move=this.move.bind(this),this.element.end=this.end.bind(this),this.element.cancel=this.cancel.bind(this)):(this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.mouseOver=this.mouseOver.bind(this),this.mouseOut=this.mouseOut.bind(this)),"Mobile"===this.userAgent&&(this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1)),"PC"===this.userAgent&&(this.mouseLeave=this.mouseLeave.bind(this),this.element.addEventListener("mousedown",this.start,!1),this.element.addEventListener("mousemove",this.move,!1),this.element.addEventListener("mouseup",this.end,!1),this.element.addEventListener("mouseover",this.mouseOver,!1),this.element.addEventListener("mouseout",this.mouseOut,!1),this.element.addEventListener("mouseleave",this.mouseLeave,!1)),this.Observer.register("start",i.start),this.Observer.register("end",i.end),this.Observer.register("pressMove",i.pressMove),this.Observer.register("swipe",i.swipe),this.Observer.register("tap",i.tap),this.Observer.register("doubleTap",i.doubleTap),this.Observer.register("longTap",i.longTap),this.Observer.register("singleTap",i.singleTap),"Mobile"===this.userAgent||"Mini"===this.userAgent?(this.Observer.register("touchStart",i.touchStart),this.Observer.register("touchMove",i.touchMove),this.Observer.register("touchEnd",i.touchEnd),this.Observer.register("touchCancel",i.touchCancel),this.Observer.register("moreFingerStart",i.moreFingerStart),this.Observer.register("multipointEnd",i.multipointEnd),this.Observer.register("pinch",i.pinch),this.Observer.register("twoFingerPressMove",i.twoFingerPressMove),this.Observer.register("rotate",i.rotate)):(this.Observer.register("mouseDown",i.mouseDown),this.Observer.register("mouseMove",i.mouseMove),this.Observer.register("mouseUp",i.mouseUp),this.Observer.register("mouseOver",i.mouseOver),this.Observer.register("mouseOut",i.mouseOut)),this._cancelAllHandler=this.cancelAll.bind(this),"undefined"!==typeof window&&window.addEventListener("scroll",this._cancelAllHandler),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1,this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.lastTime=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null},this.isPress=!1}return u(e,[{key:"start",value:function(e){this.now=Date.now(),this.isPress=!0,"Mobile"===this.userAgent||"Mini"===this.userAgent?(this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY):(this.x1=e.pageX,this.y1=e.pageY),this.delta=this.now-(this.last||this.now),this.Observer.dispatch("start",e),this.Observer.dispatch("Mobile"===this.userAgent||"Mini"===this.userAgent?"touchStart":"mouseDown",e),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var t=this.preV;if(e.touches&&e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var i={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};t.x=i.x,t.y=i.y,this.pinchStartLen=a(t),this.Observer.dispatch("moreFingerStart",e)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.Observer.dispatch("longTap",e),this._preventTap=!0}.bind(this),750)}},{key:"move",value:function(e){var t=this.preV,i=0,s=0;if("Mobile"===this.userAgent||"Mini"===this.userAgent?(i=e.touches[0].pageX,s=e.touches[0].pageY):(i=e.pageX,s=e.pageY),this.isDoubleTap=!1,e.touches&&e.touches.length>1){var n=e.touches[1].pageX,r=e.touches[1].pageY,o={x:e.touches[1].pageX-i,y:e.touches[1].pageY-s};null!==t.x&&(this.pinchStartLen>0&&(e.zoom=a(o)/this.pinchStartLen,this.Observer.dispatch("pinch",e)),e.angle=v(o,t),this.Observer.dispatch("rotate",e)),t.x=o.x,t.y=o.y,null!==this.x2&&null!==this.sx2?(e.deltaX=(i-this.x2+n-this.sx2)/2,e.deltaY=(s-this.y2+r-this.sy2)/2):(e.deltaX=0,e.deltaY=0),this.Observer.dispatch("twoFingerPressMove",e),this.sx2=n,this.sy2=r}else{if(null!==this.x2){e.deltaX=i-this.x2,e.deltaY=s-this.y2;var h=Math.abs(this.x1-this.x2),u=Math.abs(this.y1-this.y2);(h>10||u>10)&&(this._preventTap=!0)}else e.deltaX=0,e.deltaY=0;null!==this.lastTime?e.deltaTime=Date.now()-this.lastTime:e.deltaTime=0,this.isPress&&this.Observer.dispatch("pressMove",e)}this.Observer.dispatch("Mobile"===this.userAgent||"Mini"===this.userAgent?"touchMove":"mouseMove",e),this._cancelLongTap(),this.x2=i,this.y2=s,this.lastTime=Date.now(),e.touches&&e.touches.length>1&&e.preventDefault()}},{key:"end",value:function(e){this._cancelLongTap(),this.isPress=!1;var t=this;e.touches&&e.touches.length<2&&(this.Observer.dispatch("multipointEnd",e),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(e.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout((function(){t.Observer.dispatch("swipe",e)}),0)):(this.tapTimeout=setTimeout((function(){t._preventTap||t.Observer.dispatch("tap",e),t.isDoubleTap&&(t.Observer.dispatch("doubleTap",e),t.isDoubleTap=!1)}),0),t.isDoubleTap||(t.singleTapTimeout=setTimeout((function(){t.Observer.dispatch("singleTap",e)}),250))),this.Observer.dispatch("end",e),this.Observer.dispatch("Mobile"===this.userAgent||"Mini"===this.userAgent?"touchEnd":"mouseUp",e),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=this.lastTime=null}},{key:"mouseLeave",value:function(e){this.isPress=!1,this.Observer.dispatch("mouseLeave",e)}},{key:"mouseOver",value:function(e){this.Observer.dispatch("mouseOver",e)}},{key:"mouseOut",value:function(e){this.Observer.dispatch("mouseOut",e)}},{key:"cancel",value:function(e){this.cancelAll(),this.Observer.dispatch("touchCancel",e)}},{key:"cancelAll",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)}},{key:"_cancelLongTap",value:function(){clearTimeout(this.longTapTimeout)}},{key:"_cancelSingleTap",value:function(){clearTimeout(this.singleTapTimeout)}},{key:"_swipeDirection",value:function(e,t,i,s){return Math.abs(e-t)>=Math.abs(i-s)?e-t>0?"Left":"Right":i-s>0?"Up":"Down"}},{key:"on",value:function(e,t){this.Observer.register(e,t)}},{key:"off",value:function(e,t){this.Observer.remove(e,t)}},{key:"destroy",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),"Mobile"===this.userAgent||"Mini"===this.userAgent?(this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel)):(this.element.removeEventListener("mousedown",this.start),this.element.removeEventListener("mousemove",this.move),this.element.removeEventListener("mouseup",this.end),this.element.removeEventListener("mouseup",this.end),this.element.removeEventListener("mouseover",this.mouseOver),this.element.removeEventListener("mouseLeave",this.mouseLeave)),this.Observer._Observer={},this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.lastTime=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=null,"undefined"!==typeof window&&window.removeEventListener("scroll",this._cancelAllHandler),null}}]),e}();(function(){"undefined"!==typeof window&&(window.BetterGesture=f)})();var g=[],b=function(e){for(var t=0,i=g.length;t<i;t++)if(g[t].elem===e)return t;return null},T=function(e,t){var i=t.eventName,s=t.elem,n=t.func,r=t.oldFunc;e&&e.gesture?(e.gesture.off&&r&&e.gesture.off(i,r),e.gesture.on&&n&&e.gesture.on(i,n)):(t={},t[i]=n,g.push({elem:s,gesture:new f(s,t)}))},y=function(e){return e.replace(/-(\w)/g,(function(e,t){return t.toUpperCase()}))},O=null;O="Mini"===m()?f:{BetterGesture:f,install:function(e){e.directive("gesture",{bind:function(e,t){var i=t.value,s=t.oldValue,n=g[b(e)];T(n,{elem:e,func:i,oldFunc:s,eventName:y(t.arg)})},unbind:function(e){var t=b(e);if(!isNaN(t)){var i=g.splice(t,1);i.length&&i[0]&&i[0].gesture.destroy&&i[0].gesture.destroy()}}})}};var x=O;t["default"]=x}})}));
//# sourceMappingURL=better-gesture.umd.min.js.map