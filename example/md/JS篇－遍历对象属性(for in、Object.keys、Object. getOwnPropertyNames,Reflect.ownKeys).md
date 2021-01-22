js中几种遍历对象的方法，包括for in、Object.keys、Object.getOwnProperty,Reflect.ownKeys 它们在使用场景方面各有不同。
# for in
主要用于遍历对象的可枚举属性,(不含Symbol属性),包括自有属性、继承自原型的属性
```javascript
var obj = {"name":"Poly", "career":"it"}
Object.defineProperty(obj, "age", {value:"forever 18", enumerable:false});
Object.prototype.protoPer1 = function(){console.log("proto");};
Object.prototype.protoPer2 = 2;
console.log("For In : ");
for(var a in obj) console.log(a);
```
输出如下

![](http://182.92.243.204/usr/uploads/2020/03/3528197801.png)
# Object.keys
返回一个数组，元素均为对象自有的可枚举属性
```javascript
var obj = {"name":"Poly", "career":"it"}
Object.defineProperty(obj, "age", {value:"forever 18", enumerable:false});
Object.prototype.protoPer1 = function(){console.log("proto");};
Object.prototype.protoPer2 = 2;
console.log("Object.keys:")
console.log(Object.keys(obj));
```
输出如下：

![](http://182.92.243.204/usr/uploads/2020/03/3270699385.png)

# Object.getOwnPropertyNames
用于返回对象的自有属性(不含Symbol属性)，包括可枚举和不可枚举的
```javascript
var obj = {"name":"Poly", "career":"it"}
Object.defineProperty(obj, "age", {value:"forever 18", enumerable:false});
Object.prototype.protoPer1 = function(){console.log("proto");};
Object.prototype.protoPer2 = 2;
console.log("Object.getOwnPropertyNames: ");
console.log(Object.getOwnPropertyNames(obj));
```
输出如下：

![](http://182.92.243.204/usr/uploads/2020/03/133747059.png)

# Reflect.ownKeys

返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.，不包含继承自原型的属性
```javascript
var obj = {"name":"Poly", "career":"it"}
Object.defineProperty(obj, "age", {value:"forever 18", enumerable:false});
Object.prototype.protoPer1 = function(){console.log("proto");};
Object.prototype.protoPer2 = 2;
console.log("Reflect.ownkeys: ");
console.log(Reflect.ownKeys(obj));
```
![](http://182.92.243.204/usr/uploads/2020/03/3985080489.png)
