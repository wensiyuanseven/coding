import 'package:flutter/material.dart';

void main() => runApp(MyApp("Hello World"));

// StatefulWidget 的主要功能就是创建 State
//ignore: must_be_immutable
class MyApp extends StatefulWidget {
  // This widget is the root of your application.

  String content;

  MyApp(this.content);

  @override
  // 实现 createState() 的方法，返回一个 State
  // 函数需要返回一个State 类型，并且这个类型还必须得是StatefulWidget的子类
  State<StatefulWidget> createState() {
    return MyAppState();
  }
}

//MyAppState本身就是一个状态组件， MyAppState 首先继承 State，State 的泛型类型是上面定义的 Widget 的类型
class MyAppState extends State<MyApp> {
  bool isShowText = true;
  // 需要更改数据，刷新 UI 的话，调用 setState()
//  setState() —— 刷新 UI
  void increment() {
    // 无参的函数
    setState(() {
      widget.content += "d";
    });
  }

  @override
  // 实现 build() 的方法，返回一个 Widget  build() —— 创建 Widget
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
          appBar: AppBar(
            title: Text("Widget -- StatefulWidget及State"),
          ),
          body: Center(
              child: GestureDetector(
            child: isShowText ? Text(widget.content) : null,
            onTap: increment,
          )),
        ));
  }
}
