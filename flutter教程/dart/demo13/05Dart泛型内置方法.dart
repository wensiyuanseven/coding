void main() {
  var names = [];
  names.addAll(['Seth', 'Kathy', 'Lars']);
  var nameSet = Set<String>.from(names);
  print(nameSet);

  List<String> createState() {
    return ["1233", "123"];
  }

  print(createState());
}
