* 在移动端上，在你用overflow-y:scorll属性的时候，你会发现滚动的效果很木，很慢，这时候可以使用-webkit-overflow-scrolling:touch这个属性，让滚动条产生滚动回弹的效果，就像ios原生的滚动条一样流畅。

* 一些默认事件会阻止ios滚动

   ```
   document.body.addEventListener('touchmove', function(evt) {
     evt.preventDefault() // 需要把默认事件注释掉
    })
   ```

* 给需要滚动的页面加overflow:auto/scroll

* 尝试给滚动页面加宽高
