// Vue.directive Vue.filter Vue.component
import { mergeOptions } from "../utils";

export function initGlobalAPI(Vue) {
  // 全局api 肯定接受很多参数
  Vue.options = {}; // 所有的全局api 用户传递的参数 都会绑定到这个对象中
  Vue.zidingyi = { abc: "123" }; // 举例
  // 提取公共的方法 逻辑，通过此方法混合到每个实例中
  // 写几个调用几次
  Vue.mixin = function(mixin) {
    //   console.log(this,'this')
    // 此时this指向vue函数
    this.options = mergeOptions(this.options, mixin);
    // console.log(this.options,'options')

  };
}
