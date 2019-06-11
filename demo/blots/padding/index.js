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

let currentRange = {
  index: 0,
  length: 0
}

const handler = function (value) {
  const currentRange = this.quill._currentRange
  this.quill.formatLine(currentRange.index, currentRange.length, 'padding', value)
}

export { PaddingClass as default, handler }
