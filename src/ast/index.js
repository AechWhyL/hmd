class Compiler {
  root = {
    type: "root",
    children: [],
  };
  rootStack = [];
  constructor(input) {
    this.input = input;
    this.root = {
      type: "root",
      children: [],
    };
    this.rootStack.push(this.root);
  }

  parse(){
    
  }
}
