**官方说**
由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength
```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新：
```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```
为了解决第二类问题，你可以使用 splice：

````javascript
vm.items.splice(newLength)
````
**但是有一点需注意**，不是不能使用数组索引，可以使用，使用场景是将对象数组内部的对象属性更新，而不是直接设置修改数组，这就像使用push方法是更新数组而不是设置数组一样。例如对对象数组某项的属性的修改：vm.items[indexOfItem].prop = newValue
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
    <div>
        <div id="app">
            <p @click="abc">点击</p>
            <div>{{arr[0].a}}</div>
        </div>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                arr: [{ a: 1 }]
            },
            methods: {
                abc() {
                    this.arr[0].a = 2
				   // this.arr[0] = 2 不会被监听到
                }
            }
        })
    </script>
</body>

</html>
```
