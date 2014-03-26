var util = require("util");

function vmConsole() {
  this.output = "";
}

vmConsole.prototype.log = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

vmConsole.prototype.error = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

vmConsole.prototype.info = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

vmConsole.prototype.warn = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

vmConsole.prototype.dir = function(obj) {
  this.output += util.inspect(obj, { customInspect: false }) + "\n";
}

module.exports = vmConsole