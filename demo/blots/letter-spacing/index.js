import Quill from 'quill'
import { deflate } from 'zlib';
const Block = Quill.import('blots/block')
const Inline = Quill.import('blots/inline')

class letterSpacingBlot extends Inline {
  static blotName = 'letter-spacing'
  static tagName = 'span'

  constructor (domNode, value) {
    super(domNode, value)
    domNode.classList.add('letter-spacing-' + value)
    domNode.dataset.letterSpacing = value + ''
  }

  static formats(domNode) {
    return domNode.dataset.letterSpacing + ''
  }

  static value(node) {
    return node.dataset.letterSpacing + ''
  }
}

const handler = function (value) {
  const currentRange = this.quill._currentRange
  console.log(currentRange)
  this.quill.formatText(currentRange.index, currentRange.length, 'letter-spacing', value)
}

export {
  handler,
  letterSpacingBlot as default
}