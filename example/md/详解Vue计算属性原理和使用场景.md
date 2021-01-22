计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。特点：
- 监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算
- 数据可以进行逻辑处理，减少模板中计算逻辑。
- 对计算属性中的数据进行监视

计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性。默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改自身的值，而是修改它的依赖。

```javascript
computed: {
  fullName: {
    // getter
    get () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set (newValue) {
      //this.fullName = newValue 这种写法会报错
      var names = newValue.split(' ')
      this.firstName = names[0]//对它的依赖进行赋值
      this.lastName = names[names.length - 1]
    }
  }
}

```

现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新
# 计算属性必须写get,set的场景

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
当你去设置计算属性时，也就是去修改计算属性时，需要写成get,set的方式

如果没有写会直接报错，比如
```javascript
<template>
  <div class="a">
    <button @click="add">点击{{closure}}</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      a: 1
    }
  },
  computed: {
    closure() {
      return 'abc'
    }
  },
  methods: {
    add() {
      this.closure = 'defg'
    }
  }
}
</script>

```
![](http://182.92.243.204/usr/uploads/2020/03/3101069816.png)

正确写法
```javascript
  computed: {
    closure: {
      get() {
        console.log(123)
        return 'abc'
      },
      set(value) {
        // 那这个地方就只能拿值而不能修改closure的值了
	   // this.closure = 'value'  会报错
	   //做一些其他逻辑
        console.log(value)
      }
    }
  },
  methods: {
    add() {
      // 修改无效
      this.closure = 'defg'
    }
  }
```

get set应用场景1

**用v-model来实现双向绑定（推荐用watch）**

```javascript
   visible: {
       get() {
         return this.value
       },
      set(val) {}
     }
```
get set应用场景2

**双向绑定的计算属性+vuex**

```javascript
<input v-model="message">

	// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
#可缓存性

```javascript
<p>Reversed message: "{{ reversedMessage() }}"</p>
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

```javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```

# 计算属性可以通过闭包来实现传参：
```javascript
:data="closure(item, itemName, blablaParams)"
computed: {
 closure () {
   return  (a, b, c)=> {
        /** do something */
        return data
    }
 }
}

```
> 如果用闭包来实现传参，那么计算属性不具有可缓存性。

# 与watch进行对比
![WechatIMG266.png](http://182.92.243.204/usr/uploads/2020/03/208737137.png)

- watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。
- computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。
- 计算属性不能执行异步任务，计算属性必须同步执行，watch可执行异步任务，遇到异步任务，就交给侦听属性
- watch也可以检测computed属性

# 总结
计算属性适合用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

- computed能做的，watch都能做，反之则不行
- 能用computed的尽量用computed
