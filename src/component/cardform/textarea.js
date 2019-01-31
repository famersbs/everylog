import React from 'react'

const InputBox = props => (
  <div>
    <textarea
      autoFocus={props.focus}
      placeholder={props.label}
      value={props.value}
      onChange={ e => props.onChange(e.target.value) }
    >
    </textarea>
  </div>
)

export default InputBox
