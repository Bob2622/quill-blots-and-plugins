// TIP: IMPORTANT
// blotname 不能为 p 标签
// 不然会引起 delta 多次插入的情况

import Quill from 'quill'
import Swiper from 'swiper'
import Vdom from 'virtual-dom'
import hyperx from 'hyperx'
import Upload from '../../utils/Upload'
const BlockEmbed = Quill.import('blots/block/embed')
const Inline = Quill.import('blots/inline')

class SwpierBlot extends BlockEmbed {
  static swiper
  static blotName = 'swiper'
  static tagName = 'swiper'
  
  static create (options) {
    let node = document.createElement('div')
    options = Object.assign({
      imgs: [],
      width: '100%',
      padding: '0',
      align: 'center',
      aspectRatio: null
    }, options)
    node.setAttribute('data-options', JSON.stringify(options))
    return this.renderSwiper(node)
  }

  constructor (nodeDom, options) {
    super(nodeDom, options)
  }

  // blot 代表着一次变更
  // delta 生成这次变更的 delta 描述
  delta () {
    // this: 当前 blot 实例
    // this.value: 用以生成 delta 描述详情, 具体实例类需要实现
    // this.attributes: 包含 blot 对应的 domNode, 和其 attributes
    return super.delta()
  }

  static renderSwiper (node) {
    const options = JSON.parse(node.dataset.options)
    // empty content
    node.innerHTML = ''

    // set swiper style
    const swiperDom = document.createElement('div')
    swiperDom.className = 'swiper-container'
    if (options.imgs.length === 0) {
      return node
    }
    if (options.width !== undefined) {
      swiperDom.style.width = options.width
    }
    if (options.padding !== undefined) {
      node.style = `
        padding-left: ${options.padding};
        padding-right: ${options.padding};
      `
    }
    if (options.align !== undefined) {
      node.className = 'ql-align-' + options.align
    }
    
    // get swiper content
    const hx = hyperx(Vdom.h)
    let wrapper = hx`<div class="swiper-wrapper">
      ${options.imgs.map(function (img, index) {
        return  hx`<div class="swiper-slide"><img src="${img.url}" alt=""></div>`
      })}
    </div>`
    swiperDom.appendChild(Vdom.create(wrapper))

    let pagination = hx`
      <div class="swiper-pagination"></div>
    `
    let paginationDom = Vdom.create(pagination)
    swiperDom.appendChild(paginationDom)

    const _this = this
    swiperDom.addEventListener('dblclick', () => {
      this.showEditDialog.call(_this, node)
    })
    
    setTimeout(() => {
      // this.swiper = new Swiper(swiperDom, {
      new Swiper(swiperDom, {
        pagination: {
          el: paginationDom,
        } 
      })
      swiperDom.style.height = 'auto'
      options.aspectRatio = (swiperDom.clientWidth/swiperDom.clientHeight).toFixed(4)
    }, 200)
    
    node.classList.add('ql-swiper-content')
    node.appendChild(swiperDom)
    return node
  }

  static showEditDialog (node) {
    const _this = this
    const options = JSON.parse(node.dataset.options)
    let dialogDom = node.querySelector('.swiper-edit-dialog')
    if (dialogDom === null) {
      const hx = hyperx(Vdom.h)
      // <div><label for="">高度</label><input type="number" class="swiper-height"></div>
      dialogDom = hx`
        <div class="swiper-edit-dialog">
          <div class="swiper-edit-dialog-content">
            <h3>编辑轮播图样式</h3>
            <div><label for="">宽度</label><input type="text" class="swiper-width"></div>
            <div><label for="">边距</label><input type="text" class="swiper-padding"></div>
            <div><label for="">对齐方式</label>
              <select class="swiper-align">
                <option value="">请选择对齐方式</option>
                <option value="left">靠左</option>
                <option value="center">居中</option>
                <option value="right">靠右</option>
              </select>
            </div>
            <div class="tips">Tips: 设置数值必须为带单位 20px 或者 20%</div>
            <button class="swiper-btn-style-edit">确定</button>
          </div>
        </div>
      `
      dialogDom = Vdom.create(dialogDom)
      dialogDom.style.display = 'block'
      node.appendChild(dialogDom)
      dialogDom = node.querySelector('.swiper-edit-dialog')
      // close dialog
      dialogDom.addEventListener('click', e => {
        dialogDom.style.display = 'none'
        e.stopPropagation()
      })
      dialogDom.querySelector('.swiper-edit-dialog-content').addEventListener('click', e => {
        e.stopPropagation()
      })
      // change swiper style
      dialogDom.querySelector('.swiper-btn-style-edit').addEventListener('click', () => {
        options.width = dialogDom.querySelector('.swiper-width').value
        options.padding = dialogDom.querySelector('.swiper-padding').value
        options.align = dialogDom.querySelector('.swiper-align').value
        node.setAttribute('data-options', JSON.stringify(options))
        _this.renderSwiper.call(_this, node)
        dialogDom.style.display = 'none'
      })
    } else {
      dialogDom.style.display = 'block'
    }

    // set defalut value
    dialogDom.querySelector('.swiper-width').value = options.width
    dialogDom.querySelector('.swiper-padding').value = options.padding
    dialogDom.querySelector('.swiper-align').value = options.align
  }

  static value(node) {
    return JSON.parse(node.dataset.options)
  }
}

// trigger swiper blot
const trigger = function (res) {
  let range = this.quill.getSelection(true)
  this.quill.insertText(range.index, '\n', Quill.sources.API)
  this.quill.insertEmbed(range.index + 1, 'swiper', {
    imgs: res
  }, Quill.sources.API)
}

const generateHandler = function (options) {
  const _options = Object.assign({
    upload: true,
    url: '/upload',
    // @return res structure
    // [
    //   { url: 'http://www.xx.xx.jpg' },
    //   { url: 'http://www.xx.xx.jpg' },
    // ]
    uploadResFormat: res => res,
  }, options)
  return function () {
    if (_options.upload) {
      const UploadInstance = new Upload({
        upload: true,
        url: _options.url,
        multiple: true
      })
      UploadInstance.getFileUrl(res => {
        res = _options.uploadResFormat(res)
        trigger.call(this, res)
      })
    } else {
      const UploadInstance = new Upload({
        upload: false,
        multiple: true
      })
      UploadInstance.getFileBase64Data(res => {
        trigger.call(this, res.map(url => ({ url: url })))
      })
    }
  }
}

export { SwpierBlot as default, generateHandler }
