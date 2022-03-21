class InputStream {
  input: string
  position: number
  line: number
  col: number

  constructor(input: string) {
    this.input = input
    this.position = 0
    this.line = 1
    this.col = 0
  }

  //  Returns the next value and also discards it from the stream.
  next() {
    const ch = this.input.charAt(this.position++)
    if(ch === "\n") {
      this.line++
      this.col = 0
    } else {
      this.col++        
    }
    return ch
  }

  // Returns the next value but without removing it from the stream.
  peek() {
    return this.input.charAt(this.position)
  }

  eof() {
    return this.peek() === ""
  }

  croak(msg) {
    throw new Error(msg + " (" + this.line + ":" + this.col + ")")
  }
}

export default InputStream
