let oldArrayMethods = Array.prototype; // 获取数组原型上的方法

// 创建一个全新的对象 可以找到数组原型上的方法，而且修改对象时不会影响原数组的原型方法
// 这样的话就只会拦截data中定义的数据了

// vue为什么要重写原数组方法？的原因
// https://www.zhihu.com/question/427389825

export let arrayMethods = Object.create(oldArrayMethods);

let methods = [ // 这七个方法都可以改变原数组
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
]
// 为什么要写reverse，sort  因为这会改变原数组，假如不写reserve 会去数组原型上找值 然后返回
// 但是我们是要劫持数组，然后监听数组中的对象，那这样的话虽然能返回值，因为要去·通知依赖 更新模板


//  一上来 就走这个地方
methods.forEach(method=>{                    // 剩余运算符   在函数中拿到是一个数组
    arrayMethods[method] = function (...args) {  // 函数劫持 AOP 切片编程
        // 当用户调用数组方法时 会先执行我自己改造的逻辑 在执行数组默认的逻辑
        const ob = this.__ob__;
        // this指数组本身 this指向arrayMethods  arrayMethods 又指向data  data等于数组
        let result  = oldArrayMethods[method].apply(this,args);

        // let result  = oldArrayMethods[method].call(this,...args);
        let inserted;
        // push unshift splice 都可以新增属性  （新增的属性可能是一个对象类型）
        // 内部还对数组中引用类型也做了一次劫持  [].push({name:'zf'})
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // 也是新增属性  可以修改 可以删除  [].splice(arr,1,'div')
                inserted = args.slice(2);
                break;
            default:
                break;
        }
        if(inserted){
            ob.observeArray(inserted);
        }
        // 通知依赖搞得鬼
         ob.dep.notify(); // 通知依赖 [通知的是整个数组的依赖]
        // console.log(ob,'--')
        return result;  // 原生数组有返回值
    }
})




