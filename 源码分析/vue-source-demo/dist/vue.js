(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    // import { initState } from './state';
    // import {compileToFunctions} from './compiler/index.js';
    // import {mountComponent, callHook} from './lifecycle.js'
    // import { mergeOptions } from './utils';
    function initMixin(Vue) {
      debugger;

      Vue.prototype._init = function (options) {} // Vue的内部 $options 就是用户传递的所有参数
      // const vm = this;
      // // 这个options 就包含了用户创建实例时传入的所有属性 Vue.options
      // vm.$options = mergeOptions(vm.constructor.options,options); // 用户传入的参数
      // callHook(vm,'beforeCreate')
      // initState(vm); // 初始化状态
      // callHook(vm,'created')
      // // 需要通过模板进行渲染
      // if (vm.$options.el) { // 用户传入了el属性
      //     vm.$mount(vm.$options.el)
      // }
      // Vue.prototype.$mount = function (el) { // 可能是字符串 也可以传入一个dom对象
      //     const vm = this;
      //     el = vm.$el = document.querySelector(el); // 获取el属性
      //     // 如果同时传入 template 和render  默认会采用render 抛弃template，如果都没传就使用id="app"中的模板
      //     const opts = vm.$options;
      //     if(!opts.render){
      //         let template = opts.template;
      //         if(!template && el){ // 应该使用外部的模板
      //             template = el.outerHTML;
      //             console.log(template)
      //         }
      //         const render = compileToFunctions(template);
      //         opts.render = render;
      //     }
      //     // 走到这里说明不需要编译了 ，因为用户传入的就是 一个render函数
      //     mountComponent(vm,el); // 组件的挂载流程
      // }
      ;
    }

    // import {renderMixin} from './render.js';
    // import {lifeCycleMixin} from './lifecycle';
    // import {initGlobalAPI} from './global-api/index.js'
    // import { nextTick } from './observer/scheduler';

    function Vue(options) {
      debugger; // 内部要进行初始化的操作

      this._init(options); // 初始化操作

    }

    debugger;
    initMixin(Vue); // 添加原型的方法

    return Vue;

})));
//# sourceMappingURL=vue.js.map
