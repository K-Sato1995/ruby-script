import InputStream from './input-stream'

class Token {
  private $input: InputStream
  private keywords: string
  private currentToken: Token | null

  constructor($input: InputStream) {
    this.$input = $input
    this.keywords = "if then else end true false def return"
    this.currentToken = null
  }

  readNext() {
    // Remove all white space
    this.readWhile(this.isWhiteSpace)

    const input = this.$input
    if(input.eof()) return null
    const ch = input.peek()

    // Comments
    if(ch === "#")  {
      this.skipComment()
      return this.readNext()
    }

    // String
    if(ch === '"') {
      return this.readString()
    }

    // Numbers
    if(this.isDigit(ch)) {
      return this.readNum()
    }

    // Identifications
    if(this.isID(ch)) {
      return this.readID()
    }

    if(this.isPunc(ch)) {
      return {
        type: "punc",
        value: this.$input.next()
      }
    }

    if(this.isOpChar(ch)) {
      return {
        type: "op",
        value: this.readWhile(this.isOpChar)
      }
    }

    input.croak("Can't handle character: " + ch);
    // console.log(`Skipped: ${ch}`)
  }

  // not sure if I understand this correctly
  private isWhiteSpace(ch: string) {
    return " \t\n".indexOf(ch) >= 0;
  }

  private isDigit(ch: string) {
    return /[0-9]/i.test(ch);
  }

  private isID(ch: string) {
    return /[a-z_]/i.test(ch);
  }

  private isPunc(ch) {
    return ",;(){}[]".indexOf(ch) >= 0
  }

  private isOpChar(ch) {
    return "+-*/%=&|<>!".indexOf(ch) >= 0;
  }

  private skipComment() {
    // Move to the next char while in the comment line
    this.readWhile((ch: string) => {
      return ch != "\n"
    })
    this.$input.next()
  }

  private readNum() {
    let num = this.readWhile((ch) => {
      return this.isDigit(ch)
    })
    console.info(parseFloat(num))
    return { type: "number", value: parseFloat(num) };
  }

  private readID() {
    const id = this.readWhile(this.isID)
    return {
      type: this.isKeyword(id) ? "kw" : "var",
      value: id
    }
  }

  private isKeyword(word: string) {
    return this.keywords.indexOf(" " + word + " ") >= 0; 
  }

  private readEscaped(end: '"') {
    let escaped = false, str = ''
    this.$input.next()
    while(!this.$input.eof()) {
      let ch = this.$input.next()
      if(escaped) {
        str += ch
        escaped = false
      } else if(ch == '\\') {
        escaped = true
      } else if (ch === end) {
        break;
      } else {
        str += ch
      }
    }

    return str
  }

  private readString() {
    console.info( this.readEscaped('"'))
    return { type: "string", value: this.readEscaped('"')}
  }

  private readWhile(callback) {
    let str = ""
    // Pass current char to the callback
    // and put that in str var while true
    while(!this.$input.eof() && callback(this.$input.peek())) {
      str += this.$input.next()
    }
    console.info(str)
    return str
  }

  peek() {
    return this.currentToken || (this.currentToken = this.readNext())
  }

  next() {
    let token = this.currentToken
    this.currentToken = null
    return token || this.readNext()
  }

  eof(): boolean {
    return this.peek() === null
  }

  croak(msg: string) {
    this.$input.croak(msg)
  }
}

export default Token
