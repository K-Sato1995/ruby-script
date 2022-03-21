"use strict";
exports.__esModule = true;
var Tokenizer = /** @class */ (function () {
    function Tokenizer($input) {
        this.$input = $input;
    }
    Tokenizer.prototype.readNext = function () {
        var input = this.$input;
        if (input.eof())
            return null;
        var ch = input.peek();
        // Comments
        if (ch === "#") {
            // skipComment()
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
    };
    Tokenizer.prototype.isDigit = function (ch) {
        return /[0-9]/i.test(ch);
    };
    Tokenizer.prototype.isID = function (ch) {
        return /[a-zλ_]/i.test(ch);
    };
    Tokenizer.prototype.readNum = function () {
        var _this = this;
        var hasDot = false;
        var num = this.readWhile(function (ch) {
            if (ch === ".") {
                if (hasDot)
                    return false;
                hasDot = true;
                return true;
            }
            return _this.isDigit(ch);
        });
    };
    Tokenizer.prototype.readWhile = function (callback) {
        var str = "";
        while (!this.$input.eof() && callback(this.$input.peek())) {
            str += this.$input.next();
        }
        return str;
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
