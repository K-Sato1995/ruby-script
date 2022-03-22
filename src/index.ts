import InputStream from './input-stream'
import Tokenizer from './tokenizer'

const sourceCode = `
  # comment
  var a = 1

  def(str)
    str
  end
`
const $input = new InputStream(sourceCode)
const token = new Tokenizer($input)

let arr = []

while(!$input.eof()) {
  const t = token.readNext()
  arr.push(t)
}


console.log(arr)