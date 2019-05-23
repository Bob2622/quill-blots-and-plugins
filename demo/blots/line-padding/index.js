import Quill from '../../node_modules/quill'
const Inline = Quill.import('blots/inline')

class linePaddingBlot extends Inline {
  static blotName = 'line-padding'
  static tagName = 'p'

  static create(value) {
    let node = super.create(value)
    node.className = 'line-padding-' + value
    node.dataset.value = value + ''
    return node
  }

  static formats(domNode) {
    return domNode.dataset.value + ''
  }

  static value(node) {
    return node.dataset.value + ''
  }
}

const handler = function (value) {
  // 格式化当前内容
  this.quill.format('line-padding', value, Quill.sources.USER)
}

export {
  handler,
  linePaddingBlot as default
}