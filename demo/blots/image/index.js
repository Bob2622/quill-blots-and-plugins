import Quill from 'quill'
import Vdom from 'virtual-dom'
import hyperx from 'hyperx'
import Upload from '../../utils/Upload'
const Embed = Quill.import('blots/block/embed')

class ImageBlot extends Embed {
  static blotName = 'image'
  // static tagName = 'div'
  // 此处不能设置为通用标签
  // 粘贴内容到 quill 编辑器时, 粘贴内容如果有换行
  // 会触发 tagName 为 div 的 blot 命令
  static tagName = 'image'

  static create (options) {
    let node = document.createElement('div')
    options = Object.assign({
      url: '',
      width: '100%',
      padding: 0
    }, options || {})
    node.setAttribute('data-options', JSON.stringify(options))
    return this.renderImage(node)
  }

  static value(node) {
    return JSON.parse(node.dataset.options)
  }

  static renderImage (node) {
    const options = JSON.parse(node.dataset.options)
    let imgDom = node.querySelector('img')
    if (imgDom === null) {
      imgDom = document.createElement('img')
    }
    imgDom.setAttribute('src', options.url)
    imgDom.setAttribute('width', options.width)
    node.setAttribute('style', `
      padding-left: ${options.padding};
      padding-right: ${options.padding};
    `)
    // imgDom.addEventListener('dblclick', () => {
    //   this.showImageEditDialog.call(this, node)
    // })
    node.appendChild(imgDom)
    return node
  }

  static showImageEditDialog (node) {
    const _this = this
    const options = JSON.parse(node.dataset.options)
    let dialogDom = node.querySelector('.image-edit-dialog')
    if (dialogDom === null) {
      const hx = hyperx(Vdom.h)
      dialogDom = hx`
        <div class="image-edit-dialog">
          <div class="image-edit-dialog-content">
            <h3>编辑图片样式</h3>
            <div><label for="">宽度</label><input type="text" class="image-width"></div>
            <div><label for="">边距</label><input type="text" class="image-padding"></div>
            <div class="tips">Tips: 设置数值必须为带单位 20px 或者 20%</div>
            <button class="image-btn-style-edit">确定</button>
          </div>
        </div>
      `
      dialogDom = Vdom.create(dialogDom)
      dialogDom.style.display = 'block'
      node.appendChild(dialogDom)
      // close dialog
      dialogDom.addEventListener('click', e => {
        dialogDom.style.display = 'none'
        e.stopPropagation()
      })
      dialogDom.querySelector('.image-edit-dialog-content').addEventListener('click', e => {
        e.stopPropagation()
      })
      // change image style
      dialogDom.querySelector('.image-btn-style-edit').addEventListener('click', () => {
        options.width = dialogDom.querySelector('.image-width').value,
        options.padding = dialogDom.querySelector('.image-padding').value
        node.setAttribute('data-options', JSON.stringify(options))
        _this.renderImage.call(_this, node)
        dialogDom.style.display = 'none'
      })
    } else {
      dialogDom.style.display = 'block'
    }
    // set defalut value
    dialogDom.querySelector('.image-width').value = options.width
    dialogDom.querySelector('.image-padding').value = options.padding
  }
}

const generateHandler = function (options) {
  options = Object.assign({
    upload: false,
    url: '',
    uploadResFormat: res => res
  }, options)
  return function () {
    if (options.upload) {
      const UploadInstance = new Upload({
        upload: true,
        url: options.url
      })
      UploadInstance.getFileUrl(res => {
        res = options.uploadResFormat(res)
        let range = this.quill.getSelection(true)
        this.quill.insertText(range.index, '\n', Quill.sources.API)
        this.quill.insertEmbed(range.index + 1, 'image', {
          url: res
        }, Quill.sources.API)
      })
    } else {
      const UploadInstance = new Upload({
        upload: false,
      })
      UploadInstance.getFileBase64Data(res => {
        let range = this.quill.getSelection(true)
        this.quill.insertText(range.index, '\n', Quill.sources.API)
        this.quill.insertEmbed(range.index + 1, 'image', {
          url: res[0]
        }, Quill.sources.API)
      })
    }
  }
}

export {
  generateHandler,
  ImageBlot as default
}