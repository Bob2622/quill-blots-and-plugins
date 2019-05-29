import Quill from 'quill'
import Vdom from 'virtual-dom'
import hyperx from 'hyperx'
const BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {

  static blotName = 'video'
  static className = 'ql-video'
  static tagName = 'div'

  static options = {
    src: '',
    vid: null,
    width: 100,
    aspectRatio: 16/9
  }

  static create(options) {
    options = Object.assign({
      src: '',
      vid: null,
      width: 100,
      aspectRatio: 16/9
    }, options)

    let node = super.create(options.src)

    // edit node
    const hx = hyperx(Vdom.h)
    // <div><label for="">高度</label><input type="number" class="swiper-height"></div>
    let editNode = hx`
      div 
    `
    editNode = Vdom.create(editNode)

    // video node
    let iframeNode = document.createElement('iframe')
    iframeNode.setAttribute('frameborder', '0')
    iframeNode.setAttribute('allowfullscreen', true)
    iframeNode.setAttribute('src', options.src)
    iframeNode.setAttribute('width', options.width)
    // iframeNode.setAttribute('height', '400px')
    iframeNode.addEventListener('mouseover', () => {

    })
    node.appendChild(iframeNode)
    return node
  }

  static position (index, inclusive) {
    console.log('video position')
    console.log(arguments)
  }

  static value(domNode) {
    return this.options
  }
}