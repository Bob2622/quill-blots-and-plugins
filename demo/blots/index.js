import _ from 'lodash'
import FontSize from './font-size'
import Image from './image'
import LetterSpacing from './letter-spacing'
import LineHeight from './line-height'
import PaddingClass from './padding'
import Swiper from './swiper'
import Parchment from 'parchment'
import { handler as FontSizeHandler } from './font-size'
import { generateHandler as ImageGenerateHandler } from './image'
import { handler as LetterSpacingHandler } from './letter-spacing'
import { handler as LineHeightHandler } from './line-height'
import { handler as PaddingHandler } from './padding'
import { handleSelectedChange as handlerSelected } from './padding'
import { generateHandler as SwiperGeneratorHandler } from './swiper'

export default {
  registerWith (Quill) {
    Quill.register(FontSize)
    Quill.register(Image)
    Quill.register(LetterSpacing)
    Quill.register(LineHeight)
    Quill.register('modules/handleChangeForPadding', handlerSelected)
    Quill.register({ 'formats/padding': PaddingClass }, false)
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
    toolbar.addHandler('padding', PaddingHandler)
    toolbar.addHandler('letter-spacing', LetterSpacingHandler)
    toolbar.addHandler('line-height', LineHeightHandler)
    toolbar.addHandler('image', ImageGenerateHandler(options.image))
    toolbar.addHandler('swiper', SwiperGeneratorHandler(options.swiper))
  }
}
