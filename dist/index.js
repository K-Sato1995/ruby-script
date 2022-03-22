"use strict";
exports.__esModule = true;
var input_stream_1 = require("./input-stream");
var tokenizer_1 = require("./tokenizer");
var sourceCode = "\n  # comment\n  var a = 1\n\n  def(str)\n    str\n  end\n";
var $input = new input_stream_1["default"](sourceCode);
var token = new tokenizer_1["default"]($input);
var arr = [];
while (!$input.eof()) {
    var t = token.readNext();
    arr.push(t);
}
console.log(arr);
