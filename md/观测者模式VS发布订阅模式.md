## 前世今生

其实在24种基本的设计模式中并没有发布订阅模式，它只是观察者模式的一个别称。
但是经过时间的沉淀，似乎他已经强大了起来，已经独立于观察者模式，成为另外一种不同的设计模式。所以有必要聊一聊两者的区别。

![](https://user-gold-cdn.xitu.io/2020/6/5/17284c8897ffd0cb?w=505&h=402&f=png&s=123573)

## 观察者模式

观察者模式有两个重要的角色，即目标和观察者。在目标和观察者之间是没有事件通道的。一方面，观察者要想订阅目标事件，由于没有事件通道，因此必须将自己添加到目标(Subject) 中进行管理；另一方面，目标在触发事件的时候，也无法将通知操作(dispatch) 委托给事件通道，因此只能亲自去通知所有的观察者。

```js
// 目标（订阅者）
class Subject {
    constructor() {
        this.observers = []
    }
    //注册
    rejist(observer) {
        this.observers.push(observer)
    }
    // 派发
    dispatch(args) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].update(args)
        }
    }

}
// 观察者
class Observer {
    update(args) {
        console.log(args)
    }
}

let ob1 = new Observer()
let ob2 = new Observer()
let subject = new Subject()
// 观察者需要在目标中注册  观察和目标建立了依赖关系
subject.rejist(ob1)
subject.rejist(ob2)
// 目标主动通知观察者
subject.dispatch('abc')

```

> 理解：当你需要观察一组目标的时候，每个目标都要暴露一个缺口，让观察者去监听(注册到目标当中)，最后目标再主动通知观察者，触发事件。

## 发布订阅模式

发布订阅模式相比观察者模式多了个事件通道，事件通道作为调度中心，管理事件的订阅和发布工作，彻底隔绝了订阅者和发布者的依赖关系。即订阅者在订阅事件的时候，只关注事件本身，而不关心谁会发布这个事件；发布者在发布事件的时候，只关注事件本身，而不关心谁订阅了这个事件。

举一个例子，你在微博上关注了A，同时其他很多人也关注了A，那么当A发布动态的时候，微博就会为你们推送这条动态。A就是发布者，你是订阅者，微博就是调度中心，你和A是没有直接的消息往来的，全是通过微博来协调的（你的关注，A的发布动态）

```js
class Observer {
    constructor() {
        this._observer = []
    }
    //订阅
    reject(type, fn) {
        if (typeof this._observer[type] === 'undefined') {
            this._observer[type] = [fn]
        } else {
            this._observer[type].push(fn)
        }
    }
    //发布
    diapatch(type, args) {
        if (this._observer[type].length) {
            for (let i = 0; i < this._observer[type].length; i++) {
                this._observer[type][i].call(this, { type: type, args: args || {} })
            }
        }
    }
    //删除
    remove(type, fn) {
        if (this._observer[type] instanceof Array) {
            for (let i = this._observer[type].length - 1; i >= 0; i--) {
                this._observer[type][i] === fn && this._observer[type].splice(i, 1)

            }
        }
    }
}
let observer = new Observer()
let fn = function (data) {
    console.log(this)
    console.log(data)
}
observer.reject('example', fn)
observer.diapatch('example', '消息')

```

## 区别

从代码实现可以看出，观察者模式则是面向目标和观察者编程的,而发布-订阅模式是面向调度中心编程的。前者用于**解耦**发布者和订阅者（解决各个模块之间的耦合，类或对象之间的耦合），后者用于**耦合**目标和观察者，不可同日而语也。
