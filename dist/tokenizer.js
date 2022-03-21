"use strict";
exports.__esModule = true;
var Tokenizer = /** @class */ (function () {
    function Tokenizer($input) {
        this.$input = $input;
        this.keywords = "if then else end true false def return";
    }
    Tokenizer.prototype.readNext = function () {
        // Remove all white space
        this.readWhile(this.isWhiteSpace);
        var input = this.$input;
        if (input.eof())
            return null;
        var ch = input.peek();
        // Comments
        if (ch === "#") {
            this.skipComment();
            return this.readNext();
        }
        // String
        if (ch === '"') {
            return this.readString();
        }
        // Numbers
        if (this.isDigit(ch)) {
            return this.readNum(ch);
        }
        // Identifications
        if (this.isID(ch)) {
            return this.readID();
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
        return /[a-z_]/i.test(ch);
    };
    Tokenizer.prototype.skipComment = function () {
        // Move to the next char while in the comment line
        this.readWhile(function (ch) {
            return ch != "\n";
        });
        this.$input.next();
    };
    Tokenizer.prototype.readNum = function (ch) {
        console.info(parseFloat(ch));
        return { type: "number", value: parseFloat(ch) };
    };
    Tokenizer.prototype.readID = function () {
        var id = this.readWhile(this.isID);
        return {
            type: this.isKeyword(id) ? "kw" : "var",
            value: id
        };
    };
    Tokenizer.prototype.isKeyword = function (word) {
        return this.keywords.indexOf(" " + word + " ") >= 0;
    };
    Tokenizer.prototype.readEscaped = function (end) {
        var escaped = false, str = '';
        this.$input.next();
        while (!this.$input.eof()) {
            var ch = this.$input.next();
            if (escaped) {
                str += ch;
                escaped = false;
            }
            else if (ch == '\\') {
                escaped = true;
            }
            else if (ch === end) {
                break;
            }
            else {
                str += ch;
            }
        }
        return str;
    };
    Tokenizer.prototype.readString = function () {
        console.info(this.readEscaped('"'));
        return { type: "string", value: this.readEscaped('"') };
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
