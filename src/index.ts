import InputStream from './input-stream'
import Tokenizer from './tokenizer'

const sourceCode = `# comment
  def test
    return 1
  end
`
const $input = new InputStream(sourceCode)
const token = new Tokenizer($input)


console.log(token.skipComment())
