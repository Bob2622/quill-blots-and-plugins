import Quill from 'quill'
const Inline = Quill.import('blots/inline')

class linePaddingBlot extends Inline {
  static blotName = 'line-padding'
  static tagName = 'p'

  static create(value) {
    console.log('line padding create')
    let node = super.create(value)
    node.className = 'line-padding-' + value
    node.dataset.value = value + ''
    return node
  }

  static formats(domNode) {
    console.log('line padding formats')
    return domNode.dataset.value + ''
  }

  value(node) {
    return node.dataset.value + ''
  }
}

const handler = function (value) {
  // console.log(value)
  const range = this.quill.getSelection()
  const [ line, offset ] = this.quill.getLine(range.index)
  // if (line.cache.delta === undefined) {
  //   line.cache.delta = {
  //     ops: [{ 
  //       attributes: {
  //         padding: '20px'
  //       },
  //       insert: '\n'
  //     }]
  //   }
  // }
  const ops = line.cache.delta.ops
  if (ops[ops.length - 1].attributes === undefined) {
    ops[ops.length - 1].attributes = {}
  }
  ops[ops.length - 1].attributes = {
    padding: '20px'
  }
  // line.cache.delta.ops
  // debugger
  // this.quill.formatLine(range.index, 10, 'line-padding', 10)
  // 格式化当前内容
  // this.quill.format('line-padding', value, Quill.sources.USER)
}

export {
  handler,
  linePaddingBlot as default
}