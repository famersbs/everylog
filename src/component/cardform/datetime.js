import React from 'react'
import Cleave from 'cleave.js/react'

// value = unix time stamp
const DateTimeBox = props => {
  const datetime = props.value

  return (
    <div>
      <Cleave
        placeholder={props.label}
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
