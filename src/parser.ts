import InputStream from './input-stream'
import Token from './tokenizer'
import type { Char } from './types'

class Parser {
  $input: Token

  constructor($input: Token) {
    this.$input = $input
  }

  parseTopLevel() {
    let body = []
    while(!this.$input.eof()) {
      body.push(this.parseExpression())
    }
    return { type: "Program", body: body };
  }

  private isPunc(ch: Char) {
    let token = this.$input.peek()
    return token && token.type === "punc" && (!ch || token.value == ch)
  }

  private isKW(kw: string) {
    let token = this.$input.peek()
    return token && token.type === "kw"  && token.value === kw
  }

  private skipPunc(ch: Char) {
    if(this.isPunc(ch)) {
      this.$input.next() 
    } else {
      this.$input.croak("Expecting punctuation: \"" + ch + "\"");
    }
  }

  private skipKW(kw: string) {
    if(this.isKW(kw)) {
      this.$input.next()
    } else {
      this.$input.croak("Expecting keyword: \"" + kw + "\"");
    }
  }

  private unexpectedToken() {
    this.$input.croak("Unexpected token: " + JSON.stringify(this.$input.peek()));
  }

  private delimited(start, stop, separator, parser) {
    let arr = [], first = true
    this.skipPunc(start)
    while(!this.$input.eof()) {
      if(this.isPunc(stop)) {
        break
      }
      if(first) {
        first = false
      } else {
        this.skipPunc(separator)
      }
      if(this.isPunc(stop)) {
        break
      }
      arr.push(parser())
    }
    this.skipPunc(stop)
    return arr
  }

  private parseCall(func) {
    return {
      type: 'call',
      func: func,
      // args: this.delimited("(", ")", ",", this.parseExpression)
    }
  }

  private parseVarname() {
    let token = this.$input.next()

    if(token.type != "var") {
      this.$input.croak("Expecting variable name")
    }

    return token.value
  }

  private parseDef() {
    return {
      type: "def",
      args: this.delimited("(", ")", ",", this.parseVarname)
      // body: this.parseExpression
    }
  }

  private parseBool() {
    return {
      type: "bool",
      value: this.$input.next().value === "true"
    }
  }

  private maybeCall(expr) {
    expr = expr()

    return this.isPunc("(") ? this.parseCall(expr) : expr
  }

  // Run to parse tokens
  private parseAtom() {
    return this.maybeCall(() => {
      if(this.isPunc('(')) {
        this.$input.next()
        let exp = this.parseExpression()
        this.skipPunc(')')
        return exp
      }
      if(this.isPunc("{")) {
        // this.parseProg()
      }
      if(this.isKW('true') || this.isKW('false')) {
        this.parseBool()
      }
      if(this.isKW('def')) {
        this.$input.next()
        return this.parseDef()
      }
      let token = this.$input.next()

      if(token.type === "var" || token.type === "num") {
        return token
      }
      this.unexpectedToken()
    })
  }

  private parseProg() {
    let prog = this.delimited("{", "}", ";", this.parseExpression)
    if(prog.length === 0) return { type: "bool", value: false}
    if (prog.length == 1) return prog[0];
    return { type: "prog", prog: prog };
  }

  private parseExpression() {
    return this.maybeCall(() => {
      return this.parseAtom()
    })
  }
}

