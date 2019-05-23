### 简介

quill 相关 blot, 主要提供一下功能 
* 字体大小
* 行 padding 大小
* 行间距大小
* 字间距大小
* 图片base64/上传
* swiper base64/上传



### 使用

```
npm i quill swiper axios virtual-dom hyperx --save
npm i quill-blots-and-plugins --save
```

App.vue
```
import Quill from 'quill'
import Blots from 'quill-blots-and-plugins'
Blots.registerWith(Quill)

export default {
  data () {
    return {
      ...
    }
  },
  mounted () {
    this.quill = new Quill('#editor', {
      modules: { 
        toolbar: [ 
          [ 'swiper' ],
          [ { 'font-size': [ '12', '14', '18', '22', '28', '32', '36' ] } ],
          [ { 'line-padding': [ '12', '14', '18', '22', '28', '32', '36' ] } ],
          [ { 'line-height': [ '1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2' ] } ],
          [ { 'letter-spacing': [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ] } ],
          [ 'image' ]
        ]
      },
      theme: 'snow'
    })
    Blots.addHandlderTo(this.quill)
  }
}
```

> 注意事项

* 文件都没有编译为 es2015, 所以需要在 babel 中添加
```
{
  "plugins": [
    "@babel/plugin-transform-modules-commonjs",
    "transform-class-properties"
  ]
}
```
* can't insert line-padding into ***    
诸如此类错误是由于 quill 的引用不是同一份的缘故引起
请检查是否有多个 node_modules/quill 被引用



### DEMO

```
git clone https://github.com/Bob2622/quill-blots-and-plugins.git

cd demo 

npm i 

npm run serve
// 

```



### TODO

* input file cancel 需要监听来删除创建出来的 input 按钮
* 单独编译本模块文件, quill、lodash 等不进入最终文件
* 行描述 如何叠加在一块