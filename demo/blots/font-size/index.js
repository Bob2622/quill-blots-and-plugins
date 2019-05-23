import Quill from 'quill'
const Inline = Quill.import('blots/inline')

class FontSizeBlot extends Inline {
  static blotName = 'font-size'
  static tagName = 'span'

  static create(value) {
    let node = super.create(value)
    node.classList.add('font-size-' + value)
    node.dataset.fontSize = value + ''
    return node
  }

  // Return formats represented by blot, including from Attributors.
  // 需要和 create 设置的属性相同, 不然整个 Blot 都无法生效
  // this.quill.getFormats 会调用该函数的值 作为 格式化的值
  static formats(domNode) {
    return domNode.dataset.fontSize + ''
  }

  static value(node) {
    return node.dataset.fontSize + ''
  }
}

const handler = function (value) {
  this.quill.format('font-size', value, Quill.sources.USER)
}

export {
  handler,
  FontSizeBlot as default
}