import Quill from 'quill'
const Block = Quill.import('blots/block')

class lineHeightBlot extends Block {
  static blotName = 'line-height'
  static tagName = 'div'

  static create(value) {
    let node = super.create(value)
    node.classList.add('line-height-' + value*10)
    node.dataset.lineHeight = value + ''
    return node
  }

  static formats(domNode) {
    return domNode.dataset.lineHeight + ''
  }

  static value(node) {
    console.log(node)
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