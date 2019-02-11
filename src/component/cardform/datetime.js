import React from 'react'
import Cleave from 'cleave.js/react'
import moment from 'moment'

import { DISPLAY_DATE_TIME } from './type'

// value = unix time stamp
const DateTimeBox = props => {
  let datetime = props.value

  if ( datetime === '' && props.spec.default_set_now ) {
    setTimeout(() => props.onChange(moment().format(DISPLAY_DATE_TIME)), 0)
  }

  return (
    <div>
      <Cleave
        placeholder={props.spec.label}
        options={{
          delimiters: ['/', '/', ' ', ':'],
          blocks: [4, 2, 2, 2, 2]
        }}
        value={datetime}
        onChange={ e => props.onChange(e.target.value) }
      >
      </Cleave>
    </div>
  )
}

export default DateTimeBox
