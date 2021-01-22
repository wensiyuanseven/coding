![](http://182.92.243.204/usr/uploads/2020/03/2326251448.png)
分析 Chrome控制台打印的结果
> - Tue  星期二
-  Mar  三月
- GMT  格林尼治标准时间 (英语：Greenwich Mean Time，GMT)
- 0800  表示时区的划分 在时区划分上，属东八区，比世界标准时间早8小时，记为0800

### 标准时间都有哪些？
- GMT(格林尼治平时)  Greenwich Mean Time

- UTC(世界标准时间)  Temps Universel Cordonné

- CST(北京时间/本地时间)   Central Standard Time

### js中默认哪种标准时间？

- 一般认为GMT和UTC是基本一样的，都与英国伦敦的本地时相同，UTC的本质强调的是比GMT更为精确的世界时间标准

- js时间是基于UTC(更标准)/GMT时间的，控制台打印的是toString执行的结果，打印出来的时间会因为各浏览器引擎的实现不同而不同,比如在firefox就不是GMT时间

- 我们实际生活中用的却是北京时间即CST时间与js不相关




1.Date()和new Date() 的区别
2. 什么是标准时间/世界标准时间
3. Date() 都能传入哪些参数
4. 时间戳之间的转换方式
4. 常用的处理时间的工具类

getTime表示当前Date距1970年1月1日午夜的毫秒数/时间戳
getTime()     同：Date.now()
例：

let myDate=new Date();

console.log(myDate.getTime())     // 1508317956004

console.log(Date.now())          // 1508319448166
