import InputStream from './input-stream'

class Tokenizer {
  $input: InputStream
  keywords: string

  constructor($input: InputStream) {
    this.$input = $input
    this.keywords = "if then else end true false def return"
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

    input.croak("Can't handle character: " + ch);
    // console.log(`Skipped: ${ch}`)
  }

  // not sure if I understand this correctly
  isWhiteSpace(ch: string) {
    return " \t\n".indexOf(ch) >= 0;
  }

  isDigit(ch: string) {
    return /[0-9]/i.test(ch);
  }

  isID(ch: string) {
    return /[a-z_]/i.test(ch);
  }

  skipComment() {
    // Move to the next char while in the comment line
    this.readWhile((ch: string) => {
      return ch != "\n"
    })
    this.$input.next()
  }

  readNum() {
    let num = this.readWhile((ch) => {
      return this.isDigit(ch)
    })
    console.info(parseFloat(num))
    return { type: "number", value: parseFloat(num) };
  }

  readID() {
    const id = this.readWhile(this.isID)
    return {
      type: this.isKeyword(id) ? "kw" : "var",
      value: id
    }
  }

  isKeyword(word: string) {
    return this.keywords.indexOf(" " + word + " ") >= 0; 
  }

  readEscaped(end: '"') {
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

  readString() {
    console.info( this.readEscaped('"'))
    return { type: "string", value: this.readEscaped('"')}
  }

  readWhile(callback) {
    let str = ""
    // Pass current char to the callback
    // and put that in str var while true
    while(!this.$input.eof() && callback(this.$input.peek())) {
      str += this.$input.next()
    }
    console.info(str)
    return str
  }
}

export default Tokenizer
