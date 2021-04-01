import { isObject } from "../utils.js";
import { arrayMethods } from "./array";
import Dep from "./dep.js";

// es6的类来实现的
class Observer {
  constructor(data) {
    // 这个对象上面只挂了一个dep
    this.dep = new Dep(); // 给每一个数组增加一个dep 目的是当数组方法变更的时候通知 notify();  因为不挂载的话 没办法通知
    // 对数索引进行拦截 性能差而且直接更改索引的方式并不多
    Object.defineProperty(data, "__ob__", {
      // __ob__ 是一个响应式表示 对象数组都有
      enumerable: false, // 不可枚举
      configurable: false,
      value: this
      // get:()=>this
    });
    // data.__ob__ = this; // 相当于在数据上可以获取到__ob__这个属性 指代的是Observer的实例
    if (Array.isArray(data)) {
      // vue如何对数组进行处理呢？ 数组用的是重写数组的方法  函数劫持
      // 改变数组本身的方法我就可以监控到了
      data.__proto__ = arrayMethods; // 通过原型链 向上查找的方式
      // [{a:1}]    => arr[0].a = 100
      this.observeArray(data);
    } else {
      this.walk(data);  // 可以对数据一步一步的处理
    }
  }
  // 循环数组中的每一项
  observeArray(data) {
    for (let i = 0; i < data.length; i++) {
      observe(data[i]); // 检测数组的对象类型
    }
  }
  walk(data) {
    // 对象的循环   data:{msg:'zf',age:11}
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]); // 定义响应式的数据变化
    });
  }
}

// vue2 的性能 递归重写get和set  proxy
// 此方法第当向数组中添加[].push[123]不会走此方法
function defineReactive(data, key, value) {
  let childOb = observe(value); // 如果传入的值还是一个对象的话 就做递归循环检测   初始监听时都是null  因为不是对象
  let dep = new Dep(); // msg.dep =[watcher]  age.dep = [watcher]  // 渲染watcher中.deps [msg.dep,age.dep]
  Object.defineProperty(data, key, {
    get() {
      // 这里会有取值的操作,给这个属性增加一个dep，这个dep 要和刚才我放到全局变量的上的watcher 做一个对应关系
      if (Dep.target) {

        dep.depend(); // 让这个dep 去收集 watcher
        // 数组或者数组方法会走此逻辑  但是是为了数组方法更改后的依赖收集
        if (childOb) {
          // 如果是数组 watcher中每次都会有两个dep
          // 假如数组方法添加的不是对象 那么根本不会触发walk()方法
          // 如果模板中定义了走set  对象/数组的date 都会有一个dep,但是只有更改了原数组的方法,时才会触发 这个数据上的dep
          childOb.dep.depend();
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue == value) return;
      observe(newValue); // 监控当前设置的值，有可能用户给了一个新值，并且这个值也可能是一个对象，也需要递归去监测  比如：设置新值 vm.msg={a:1}
      value = newValue;
      // 当我们更新数据后 要把当前自己对应的watcher 去重新执行以下
      dep.notify();
    }
  });
}

export function observe(data) {
  // 对象就是使用defineProperty 来实现响应式原理
  // 如果这个数据不是对象 或者是null 那就不用监控了

  if (!isObject(data)) return;

  if (data.__ob__ instanceof Observer) return; // 防止对象被重复观测

  // 对数据进行defineProperty
  return new Observer(data); // 可以看到当前数据是否被观测过
}
