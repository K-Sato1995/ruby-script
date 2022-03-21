"use strict";
exports.__esModule = true;
var Tokenizer = /** @class */ (function () {
    function Tokenizer($input) {
        this.$input = $input;
    }
    Tokenizer.prototype.readNext = function () {
        this.readWhile(this.isWhiteSpace);
        var input = this.$input;
        console.log(input);
        if (input.eof())
            return null;
        var ch = input.peek();
        console.log(ch);
        // Comments
        if (ch === "#") {
            this.skipComment();
            return this.readNext();
        }
        // String
        if (ch === '"') {
            // return readString()
        }
        // Numbers
        if (this.isDigit(ch)) {
            // readNum() 
        }
        // Identifications
        if (this.isID(ch)) {
            // readID()
        }
        input.croak("Can't handle character: " + ch);
        // console.log(`Skipped: ${ch}`)
    };
    // not sure if I understand this correctly
    Tokenizer.prototype.isWhiteSpace = function (ch) {
        return " \t\n".indexOf(ch) >= 0;
    };
    Tokenizer.prototype.isDigit = function (ch) {
        return /[0-9]/i.test(ch);
    };
    Tokenizer.prototype.isID = function (ch) {
        return /[a-zλ_]/i.test(ch);
    };
    Tokenizer.prototype.skipComment = function () {
        // Move to the next char while in the comment line
        this.readWhile(function (ch) {
            return ch != "\n";
        });
        this.$input.next();
    };
    Tokenizer.prototype.readWhile = function (callback) {
        var str = "";
        // Pass current char to the callback
        // and put that in str var while true
        while (!this.$input.eof() && callback(this.$input.peek())) {
            str += this.$input.next();
        }
        console.info(str);
        return str;
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
