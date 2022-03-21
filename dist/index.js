"use strict";
exports.__esModule = true;
var input_stream_1 = require("./input-stream");
var tokenizer_1 = require("./tokenizer");
var sourceCode = "\n  # comment\n  def test\n    \"string\"\n  end\n\n  1\n";
var $input = new input_stream_1["default"](sourceCode);
var token = new tokenizer_1["default"]($input);
while (!$input.eof()) {
    token.readNext();
}
