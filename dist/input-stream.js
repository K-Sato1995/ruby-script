"use strict";
exports.__esModule = true;
var InputStream = /** @class */ (function () {
    function InputStream(input) {
        this.input = input;
        this.position = 0;
        this.line = 1;
        this.col = 0;
    }
    //  Returns the next value and also discards it from the stream.
    InputStream.prototype.next = function () {
        var ch = this.input.charAt(this.position++);
        if (ch === "\n") {
            this.line++;
            this.col = 0;
        }
        else {
            this.col++;
        }
        return ch;
    };
    // Returns the next value but without removing it from the stream.
    InputStream.prototype.peek = function () {
        return this.input.charAt(this.position);
    };
    InputStream.prototype.eof = function () {
        return this.peek() === "";
    };
    InputStream.prototype.croak = function (msg) {
        throw new Error(msg + " (" + this.line + ":" + this.col + ")");
    };
    return InputStream;
}());
exports["default"] = InputStream;
