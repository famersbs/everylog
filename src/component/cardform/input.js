import React from 'react'

const InputBox = props => (
  <div>
    <input
      type="text"
      autoFocus={props.focus}
      placeholder={props.label}
      value={props.value}
      onChange={ e => props.onChange(e.target.value) }
    />
  </div>
)

export default InputBox
