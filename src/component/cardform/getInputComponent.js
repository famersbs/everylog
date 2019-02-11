import { InputType } from './type'

import InputBox from './input'
import NumberBox from './number'
import TagSelectBox from './tagselect'
import TextAreaBox from './textarea'
import DateTimeBox from './datetime'

export function getInputComponent( type ) {
  switch(type) {
    case InputType.TEXT:
      return InputBox
    case InputType.NUMBER:
      return NumberBox
    case InputType.TEXTAREA:
      return TextAreaBox
    case InputType.TAGSELECT:
      return TagSelectBox
    case InputType.DATETIME:
      return DateTimeBox
    default:
      return null
  }
}
