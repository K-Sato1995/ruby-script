import InputStream from './input-stream'

class Tokenizer {
  $input: InputStream

  constructor($input: InputStream) {
    this.$input = $input
  }

  readNext() {
    const input = this.$input
    if(input.eof()) return null
    const ch = input.peek()
    console.log(ch)
  
    // Comments
    if(ch === "#")  {
      this.skipComment()
      return this.readNext()
    }

    // String
    if(ch === '"') {
      // return readString()
    }

    // Numbers
    if(this.isDigit(ch)) {
      // readNum() 
    }

    // Identifications
    if(this.isID(ch)) {
      // readID()
    }

    input.croak("Can't handle character: " + ch);
    // console.log(`Skipped: ${ch}`)
  }

  isWhiteSpace(ch: string) {
    return " \t\n".indexOf(ch) >= 0;
  }

  isDigit(ch: string) {
      return /[0-9]/i.test(ch);
  }

  isID(ch: string) {
    return /[a-zλ_]/i.test(ch);
  }

  skipComment() {
    // Move to the next char while in the comment line
    this.readWhile((ch: string) => {
      return ch != "\n"
    })
    this.$input.next()
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
