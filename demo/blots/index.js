import _ from 'lodash'
import FontSize from './font-size'
import Image from './image'
import LetterSpacing from './letter-spacing'
import LineHeight from './line-height'
import LinePadding from './line-padding'
import Swiper from './swiper'
import { handler as FontSizeHandler } from './font-size'
import { generateHandler as ImageGenerateHandler } from './image'
import { handler as LetterSpacingHandler } from './letter-spacing'
import { handler as LineHeightHandler } from './line-height'
import { handler as LinePaddingHandler } from './line-padding'
import { generateHandler as SwiperGeneratorHandler } from './swiper'

export default {
  registerWith (Quill) {
    Quill.register(FontSize)
    Quill.register(Image)
    Quill.register(LetterSpacing)
    Quill.register(LineHeight)
    Quill.register(LinePadding)
    Quill.register(Swiper)
  },

  addHandlderTo (quill, options) {
    options = _.merge({
      image: {
        upload: false,
      },
      swiper: {
        upload: false,
        url: '',
        uploadResFormat: res => res
      }
    }, options)
    let toolbar = quill.getModule('toolbar')
    toolbar.addHandler('font-size', FontSizeHandler)
    toolbar.addHandler('line-padding', LinePaddingHandler)
    toolbar.addHandler('letter-spacing', LetterSpacingHandler)
    toolbar.addHandler('line-height', LineHeightHandler)
    toolbar.addHandler('image', ImageGenerateHandler(options.image))
    toolbar.addHandler('swiper', SwiperGeneratorHandler(options.swiper))
  }
}
