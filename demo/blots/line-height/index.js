import Quill from 'quill'
const Inline = Quill.import('blots/inline')

class lineHeightBlot extends Inline {
  static blotName = 'line-height'
  static tagName = 'p'

  static create(value) {
    let node = super.create(value)
    node.classList.add('line-height-' + value)
    node.dataset.lineHeight = value + ''
    return node
  }

  static formats(domNode) {
    return domNode.dataset.lineHeight + ''
  }

  static value(node) {
    return node.dataset.lineHeight + ''
  }
}

const handler = function (value) {
  // 格式化当前内容
  this.quill.format('line-height', value, Quill.sources.USER)
}

export {
  handler,
  lineHeightBlot as default
}