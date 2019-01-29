import React from 'react'

import './card.form.scss'

import InputBox from './input'
import TagSelectBox from './tagselect'

export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  TAGSELECT: 'tagselect',
}

const Form = props => {
  const { form, spec, updateForm, onSave, onCancel } = props

  return (
    <div className="new_form">
      {spec.map(i => {
        switch(i.type) {
          case InputType.TEXT:
          case InputType.NUMBER:
          return (
            <InputBox
              key={i.property_name}
              label={i.label}
              onChange={(value) => updateForm({[i.property_name]: value})}
              value={form[i.property_name]} />
          )
          case InputType.TAGSELECT:
          return (
            <TagSelectBox
              key={i.property_name}
              label={i.label}
              items={i.items}
              onChange={(value) => updateForm({[i.property_name]: value})}
              value={form[i.property_name]} />
          )
          default:
          return null
        }
      })}
      <div className="button-bar">
        <button onClick={() => onSave()}>Save</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default Form
