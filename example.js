var util = require("util");

function vmConsole() {
  this.output = "";
}

vmConsole.prototype.log = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

var vm = require("vm");

var context = vm.createContext({
  console: new vmConsole()
});

vm.runInContext('console.log("hello"); console.log("hi"); console.log([4])', context);

console.dir(context);
console.log(context.console.output);
