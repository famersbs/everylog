import React from 'react'

const InputBox = props => (
  <div>
    <textarea
      autoFocus={props.spec.focus}
      placeholder={props.spec.label}
      value={props.value}
      onChange={ e => props.onChange(e.target.value) }
    >
    </textarea>
  </div>
)

export default InputBox
