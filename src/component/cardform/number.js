import React from 'react'

const NumberBox = props => (
  <div>
    <input
      type="number"
      min="0"
      inputMode="numeric" pattern="[0-9.]*"
      autoFocus={props.spec.focus}
      placeholder={props.spec.label}
      value={props.value}
      onChange={ e => props.onChange(e.target.value) }
    />
  </div>
)

export default NumberBox
