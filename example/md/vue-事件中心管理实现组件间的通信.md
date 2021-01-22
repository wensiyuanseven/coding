应用场景
**跨多层父子组件通信**
**兄弟组件通信**

Vue 通过事件发射器接口执行实例，实际上你可以使用一个空的 Vue 实例，原理其实就是发布订阅。

可以通过单独的事件中心管理组件间的通信：

```javascript
// 将在各处使用该事件中心
// 组件通过它来通信
var eventHub = new Vue()
```

然后在组件中，可以使用 $emit, $on, $off 分别来分发、监听、取消监听事件。

案例：兄弟组件通信

newVue.js文件

```javascript
import Vue from 'vue'
const eventCenter= new Vue()
export default eventCenter
```
a.vue文件

```html
<template>
  <div class="a">
    <button @click="add">增加</button>
  </div>
</template>

<script>
import eventCenter from './../newVue'
export default {
  props: {},
  data() {
    return {
      a: 1
    }
  },
  methods: {
    add() {
      eventCenter.$emit('add', this.a++)
    }
  }
}
</script>

```
b.vue文件

```html
<template>
  <div class="b">
    {{count}}
  </div>
</template>

<script>
import eventCenter from './../newVue'
export default {
  data() {
    return {
      count: 0
    }
  },
  created() {
    eventCenter.$on('add', this.addCount)
  },
  methods: {
    addCount(count) {
      this.count = count
    }
  },
  // 最好在组件销毁前
  // 清除事件监听
  beforeDestroy: function() {
    eventCenter.$off('add', this.addCount)
  }
}
</script>

```

app.vue文件

```html
<template>
  <div id="app">
    <!-- 兄弟关系 -->
    <aBase />
    <bBase />
  </div>
</template>

<script>
import aBase from './components/a.vue'
import bBase from './components/b.vue'
export default {
  name: 'App',
  components: {
    aBase,
    bBase
  }
}
</script>

```
> 官方：https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2

这样就可以愉快的传递数据了
![Mar-16-2020 16-49-26.gif](http://182.92.243.204/usr/uploads/2020/03/119692979.gif)
