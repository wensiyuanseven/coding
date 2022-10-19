// http://haolovelin.com/2021/06/12/Flutter%E5%AD%A6%E4%B9%A0%EF%BC%88%E4%BA%8C%EF%BC%89Dart%E8%AF%AD%E6%B3%95%EF%BC%886%EF%BC%89%E7%B1%BB%E5%92%8C%E6%B3%9B%E5%9E%8B/
class SomeBaseClass {}

class Foo<T extends SomeBaseClass> {
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {}

void main() {
  var someBaseClassFoo = Foo<SomeBaseClass>();
  var extenderFoo = Foo<Extender>();
  print("${someBaseClassFoo}");
  print("${extenderFoo}");
}
