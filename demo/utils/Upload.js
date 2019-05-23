import Axios from 'axios'

class Upload {

  constructor (options) {
    this.options = Object.assign({
      upload: true,
      url: '',
      multiple: false,
      acceptFileType: [ 'image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/x-icon' ]
    }, options || {})

    this.fileInput = document.createElement('input')
    this.fileInput.setAttribute('type', 'file')
    this.fileInput.setAttribute('accept', this.options.acceptFileType.join(','))
    if (this.options.multiple) {
      this.fileInput.setAttribute('multiple', 'multiple')
    }
    this.fileInput.style.display = 'none'
    document.querySelector('body').appendChild(this.fileInput)
  }

  getFileUrl (callback) {
    this.fileInput.addEventListener('change', () => {
      let formData = new FormData()
      Array.from(this.fileInput.files).forEach(file => {
        formData.append('files[]', file)
      })
      Axios.post(this.options.url, formData, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        callback(res)
        this.fileInput.remove()
      })
    })
    this.fileInput.click()
  }

  getFileBase64Data (callback) {
    this.fileInput.addEventListener('change', () => {
      let fileReadpromises = []
      Array.from(this.fileInput.files).forEach(file => {
        fileReadpromises.push(new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.onload = (e) => { 
            resolve(e.target.result)
          }
          reader.readAsDataURL(file)
        }))
      })
      Promise.all(fileReadpromises).then(res => {
        callback(res)
        this.fileInput.remove()
      })
    })
    this.fileInput.click()
  }
}

export default Upload
