import Quill from 'quill'
const Parchment = Quill.import('parchment')

class PaddingAttributor extends Parchment.Attributor.Class {
  add(node, value) {
    return super.add(node, value)
  }

  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value))
  }

  value(node) {
    return parseInt(super.value(node)) || undefined  // Don't return NaN
  }
}

const PaddingClass = new PaddingAttributor('padding', 'ql-padding', {
  scope: Parchment.Scope.BLOCK
})

const handler = function (value) {
  let range = this.quill.getSelection()
  this.quill.formatLine(range.index, 1, 'padding', value)
}

export { PaddingClass as default, handler }
