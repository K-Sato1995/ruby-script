"use strict";
exports.__esModule = true;
var input_stream_1 = require("./input-stream");
var tokenizer_1 = require("./tokenizer");
var sourceCode = "# comment\n  def test\n    return 1\n  end\n";
var $input = new input_stream_1["default"](sourceCode);
var token = new tokenizer_1["default"]($input);
// console.log($input.peek())
while (!$input.eof()) {
    token.readNext();
}
