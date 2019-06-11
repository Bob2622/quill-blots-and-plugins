<template>
  <div id="app">
    <div id="editor" ref="editor"></div>
    <button @click="commit">commit</button>
    <div class="video-edit-cover"></div>
    <div>狮山广发书法家客户吗，发的哈咖啡大师了，按付款的撒谎发了扩，大和开发的撒谎； 奋斗啦；了；撒娇歌；垃圾广告骄傲了攻击力安家了‘</div>
  </div>
</template>

<script>
import SwiperCss from 'swiper/dist/css/swiper.min.css'
import Delta from 'quill-delta'
import Quill from 'quill'
import Snow from 'quill/dist/quill.snow.css'
import Blots from '../blots'
Blots.registerWith(Quill)
// import SwpierBlot from '../../blots/swiper/index'
// import { SwiperHandler } from '../../blots/swiper/index'
// import FontSizeBlot from '../../blots/font-size/index'
// import { handler as fontSizeHandler } from '../../blots/font-size/index'
// import LinePaddingBlot from '../../blots/line-padding/index'
// import { handler as linePaddingHandler } from '../../blots/line-padding/index'
// import LineHeightBlot from '../../blots/line-height/index'
// import { handler as lineHeightHandler } from '../../blots/line-height/index'
// import LetterSpacingBlot from '../../blots/letter-spacing/index'
// import { handler as letterSpacingHandler } from '../../blots/letter-spacing/index'
// import ImageBlot from '../../blots/image/index'
// import { handler as imageHandler } from '../../blots/image/index'
// Quill.register(SwpierBlot)
// Quill.register(FontSizeBlot)
// Quill.register(LinePaddingBlot)
// Quill.register(LineHeightBlot)
// Quill.register(LetterSpacingBlot)
// Quill.register(ImageBlot)
import testDelta from './assets/delta'

export default {
  name: 'app',
  data () {
    return {
      quill: null,
      file: null,
      // delta: {
      //   ops: [
      //     {
      //       "insert": {
      //         "swiper": {
      //           "imgs": [
      //             {
      //               "fileName": "Bitmap.png",
      //               "url": "https://t4.a.market.xiaomi.com/download/AdCenter/0a5fc4ee24cfc44813137526c8e1f9e3d394215aa/445790752.png"
      //             },
      //             {
      //               "fileName": "Bitmap1.png",
      //               "url": "https://t5.a.market.xiaomi.com/download/AdCenter/0a5fc4ee26cfc64815137326cee1f0e3d894215aa/1761269139.png"
      //             },
      //             {
      //               "fileName": "Bitmap4.png",
      //               "url": "https://t2.a.market.xiaomi.com/download/AdCenter/0dbeb6411db834e2a1327973a0ffa83ba758a2322/1866930801.png"
      //             }
      //           ],
      //           width: 50,
      //           align: 'center'
      //         }
      //       }
      //     }
      //   ]
      // },
      delta: {
        "ops": [
          {
            "insert": "231321321"
          },
          {
            "attributes": {
              "block": {
                "padding-right": "14px"
              }
            },
            "insert": "\n"
          },
          {
            "insert": "\n"
          }
        ]
      }
    }
  },
  methods: {
    commit () {
      const contents = this.quill.getContents()
      console.log('contents', JSON.stringify(contents, null, '  '))
      const delta = new Delta(contents.ops)
      console.log('delta', JSON.stringify(delta, null, '  '))
      delta.eachLine(line => {
        console.log(arguments)
        console.log('line:', JSON.stringify(line, null, '  '))
      })
    }
  },
  mounted () {
    this.quill = new Quill('#editor', {
      modules: { 
        toolbar: [ 
          [ 'swiper' ],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [ { 'font-size': [ '12', '14', '18', '22', '28', '32', '36' ] } ],
          [ { 'padding': [ 
            '0', '2', '4', '6', '8', '10',
            '12', '14', '18', '22', '28', '32', '36' 
          ] } ],
          [ { 'line-height': [ '1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2' ] } ],
          [ { 'letter-spacing': [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ] } ],
          [ 'image' ],
          [ 'bold', 'italic', 'underline', 'blockquote'],
          [ { 'list': 'bullet' } ],
        ],
      },
      theme: 'snow'
    })

    // this.quill.setContents(this.delta)

    // this.quill.on('selection-change', (a, b , c) => {
    //   console.log(a, b, c)
    // })
    Blots.addHandlderTo(this.quill)
  }
}
</script>

<style lang="less">
@import '../blots/index.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-editor {
  width: 100%;
  height: 500px;
  padding: 0 !important;
  .swiper-container {
    width: 100%;
    height: 200px;
  }
}
</style>
