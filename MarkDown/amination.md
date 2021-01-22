## 使用场景

**v-if**

- 某一块代码在运行时条件很少改变，使用 v-if 较好 (v-if 有更高的切换开销)
- 和key结合使用， 管理可复用的元素(Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染)
- 和template配合使用，可以分组渲染代码块
- 和v-else或者v-else-if结合使用
- 在组件上使用v-if可触发组件的生命周期函数
- 与 v-for 结合使用时，v-for 比 v-if 的优先级更高
- 与transition结合使用 当条件变化时该指令可以触发过渡效果(用于动画切换)
- 与keep-alive结合使用可保留组件状态,避免重新渲染

**v-show**

- 需要非常频繁地切换某块代码，使用 v-show渲染
- 当条件变化时该指令触发过渡效果(用于动画切换)
- 不可用于组件
- 没有条件语句

## 两者共同点

- 当两者都为false时，都不会占据页面位置（v-if是删除dom,v-show是切换dispaly的状态）
- 当条件变化时都会触发过渡效果(用于动画切换)

## **原理分析**

我们需要清楚vue的渲染逻辑，首先我们需要先把模板转换成js代码，也就是把模板中的v-if啊，v-for啊，v-modal,事件监听，转换成可执行的js代码(也就是render函数)，因为js有逻辑是一种图灵完备的语言。然后执行render函数处理模板转换成html。而在这个过程中v-if和v-show就会被解析。
**v-if** 就像if()else()一样动态的区创建元素，注意在这个过程中如果v-if控制的是组件，切换过程中条件块内的事件监听器和子组件会被适当地**销毁和重建**,也就是会触组件和子组件的生命周期  比如

```javascript
//v-if在转换成render时会被解析成字符串
if('v-if===true''){
 document.createElement('div')
 appendChild()
 ......
}else{
removeChild()
.....
}
```

里面还有其他的一些逻辑，比如需要判断元素是否可复用，元素是否于key结合，是否与for循环结合，等等

**v-show** 初始化时为false时会添加style='display:none'
为true时会移除display:none,注意并不是把diaplay变为block 因为要保持元素style的原始性  不管初始条件是什么，元素总是会**被渲染** 也就是说如果找到了v-show，不管是true还是false都会先去创建元素，然后在进行css操作

```javascript
//v-show在转换成render时会被解析成字符串
if('v-show'){
 //创建元素
let ele=document.createElement('div');
 //控制显隐
 if('v-show'===true){
  ele.setAttribute('diaplay','block')
 }else{
     ele.setAttribute('diaplay','none')
 }
}
```

这也就解释了 为什么 v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。

# 需要注意的地方

不推荐在同一元素上使用 v-if 和 v-for

> <https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81>
