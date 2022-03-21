import InputStream from './input-stream'
import Tokenizer from './tokenizer'

const sourceCode = `
  # comment
  def test
    "string"
  end
`
const $input = new InputStream(sourceCode)
const token = new Tokenizer($input)

while(!$input.eof()) {
  token.readNext()
}
