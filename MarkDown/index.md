# 定义
atan2 方法返回一个 -pi 到 pi 之间的数值，表示点 (x, y) 对应的偏移角度。这是一个逆时针角度，以弧度为单位，正X轴和点 (x, y) 与原点连线之间。函数接受的参数：先传递 y 坐标，然后是 x 坐标。

### 注意点

1. 不区分象限 返回值介于 [-π, π] 之间
2. 函数接受的参数：先传递 y 坐标，然后是 x 坐标，注意：它是一个点的坐标
3. 返回的的是一个逆时针旋转的弧度值
4. atan2 接受单独的 x 和 y 参数，而 atan 接受两个参数的比值
5. 角度=弧度*180/Math.PI

**从概念上怎么理解从原点(0,0)到(x,y)点的线段?这个原点(0,0)是相对于谁来定义的呢？**

通过坐标系的自动调整,我们可以很自由的计算出处于不同象限的位置相对应的角度

那在一个页面中，原点指的是什么？那就是左上角的顶点，它就是原点。原点到一个点(坐标)的线段逆时针旋转的弧度值就是Math.atan2()的返回值

![](https://user-gold-cdn.xitu.io/2020/6/5/17282cd0f2fdbd10?w=790&h=826&f=png&s=44620)

练习一下

```javascript
Math.atan2(45,0)*180/Math.PI    //90
Math.atan2(0,0)*180/Math.PI     // 0
Math.atan2(0,45)*180/Math.PI     // 0
Math.atan2(-180,180)*180/Math.PI  //-45
```

**怎么计算两点间连线的倾斜角？**

Math.atan2()函数返回点(x,y)和原点(0,0)之间直线的倾斜角.那么如何计算任意两点间直线的倾斜角呢?
只需要将两点x,y坐标分别相减得到一个新的点(x2-x1,y2-y1).然后利用这个新点与原点坐标的连线求出角度就可以了
使用下面的一个转换可以实现计算出两点间连线的夹角
```javascript
Math.atan2(y2-y1,x2-x1)*180/Math.PI
```
举栗

  计算点(5,5)到点(3,3)构成的连线的夹角

![](https://user-gold-cdn.xitu.io/2020/6/5/17282cd0f4e9ace4?w=886&h=934&f=png&s=46234)

  计算点(4,2,5)到点(2,4)构成的连线的夹角

 ![](https://user-gold-cdn.xitu.io/2020/6/5/17282cd0f4de7c82?w=970&h=1110&f=png&s=54492)

**
为什么用atan2计算出来的新点和原点之间的夹角与两点间连线的倾斜角相等呢?**

因为两条线之间是平行关系，两条平行线之间所行成的夹角相等（初中知识）

# 应用场景

- 图片跟随双指旋转，根据atan2()计算旋转角度差

- 根据角度判断滑屏方向

- 制作特效的基础，好多特效的都需要用到此API来做一些角度换算，尤其是canvas当中


