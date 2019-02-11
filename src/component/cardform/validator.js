import moment from 'moment'

import * as msgbox from '../../utils/msgbox'

import { DISPLAY_DATE_TIME, InputType } from './type'

export default function Validator(form, spec) {
  const errorTitle = 'Validation error'

  for(let i = 0 ; i < spec.length; i++ ) {
    const currentSpec = spec[i]
    const currentValue = form[currentSpec.property_name]

    // Null value check
    if ( currentValue == null || currentValue === '' ) {
      if(currentSpec.is_required) {
        msgbox.error(errorTitle, `${currentSpec.label} is Required`)
        return false
      }
    }

    if ( currentSpec.type === InputType.NUMBER && isNaN(Number(currentValue)) ) {
      msgbox.error(errorTitle, `${currentSpec.label} should be a number`)
      return false
    }

    if ( currentSpec.type === InputType.DATETIME && !moment(currentValue, DISPLAY_DATE_TIME).isValid() ) {
      msgbox.error(errorTitle, `${currentSpec.label} is not a valid date time format`)
      return false
    }

    if ( currentSpec.maximum_value != null ) {
      if(Number(currentValue) > Number(currentSpec.maximum_value)) {
        msgbox.error(errorTitle, `${currentSpec.label} cannot be bigger than ${currentSpec.maximum_value}`)
        return false
      }
    }
  }
  return true
}
