![WechatIMG260.png](http://182.92.243.204/usr/uploads/2020/03/3810517013.png)

------------

##  v-model可以用在哪些地方
输入框，文本域，单选框，多选框，下拉单选框，下拉多选框，上传，组件，第三方组件，组件级别封装普通元素（实现双向绑绑定直接更改父组件）

##   v-model原理
### **对于input输入框，文本域来，下拉选择框,组件级别封装普通元素**
- 将其 value  绑定到一个名叫 value 的 prop 上
- 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出

> 下拉选择框如果是多选的话value应传入一个数组，this.$emit('input',arr)时也应该是一个数组

### **对于单选框，多选框**
- 将其 checked  绑定到一个名叫 checked 的 prop 上
- 在其 change 事件被触发时，将新的值通过自定义的 change 事件抛出

> 如果是多选框的话checked应传入一个数组，this.$emit('change',arr)时也应该是一个数组

**因为**
- text 和 textarea ,select元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件。

> 备注：select元素官方说要用chang事件，但是我自己写的demo只有input事件才能生效

##   关于model选项

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突

两种方式
```javascript
//默认值，可省略
model:{
   props:'value',
   change:'input'
}
```
```javascript
model:{
   props:'checked',
   change:'change'
}
```
##  在普通组件上使用v-model实现双向绑定

```html
<template>
  <div
    class="no-input"
    v-if="visible"
  >
    我是显示的元素
    <button @click="close">隐藏</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //因为在不是特定元素上使用v-model时，是不能直接更改父组件的数据的。
      // 所以当prop里的值更新之后，但是data里面的值并未更新,如果想要data里面的值也更新，可以写成计算属性，或者用watch监听更改
      visible: this.value
    }
  },
  created() {
    console.log(this.visible, 'value')
  },
  watch: {
    //两个问题，1 为什么prop传过来的值没有直接修改
    // 2.计算属性get,set
    value(val) {
      this.visible = val
    }
  },
  //或者用计算属性
  computed: {
    // visible: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {}
    // }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('input', false)
    }
  }
}
</script>
```
调用，可以愉快的使用v-model了

```javascript
<dialog v-model="visible"></dialog>
```
当然你也可以用.sync修饰符来做。

##  在render函数中使用
渲染函数中没有与 v-model 的直接对应——你必须自己实现相应的逻辑：
```javascript
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```
这就是深入底层的代价，但与 v-model 相比，这可以让你更好地控制交互细节。

## v-model所有类型的值都可接收，可根据场景来判断需要什么类型的值

## v-model值绑定案例
可参考element-ui里面的switch开关，里面涉及到了相关用法

##  题外话
一般都不会使用原生的下拉框或者单选按钮，
因为，原生样式不好改变，伸缩性不强，在不同的浏览器之间也会有不可预估的bug
常见做法
用opcity:0把input框隐藏 与其他元素结合定位来复写样式，或者display:none隐藏
下拉框的item用ul,li覆写，并不会用到option标签

附上deno：
> https://github.com/wensiyuanseven/v-model-demo

![](http://182.92.243.204/usr/uploads/2020/03/1622075.png)










