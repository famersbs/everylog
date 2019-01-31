import React from 'react'

import './card.form.scss'

import { InputType } from './type'

import InputBox from './input'
import NumberBox from './number'
import TagSelectBox from './tagselect'
import TextAreaBox from './textarea'
import DateTimeBox from './datetime'

import Validator from './validator'

const Form = props => {
  const { form, spec, updateForm, onSave, onCancel } = props

  return (
    <div className="new_form">
      {spec.map(i => {
        let Input = null
        switch(i.type) {
          case InputType.TEXT:
            Input = InputBox
            break;
          case InputType.NUMBER:
            Input = NumberBox
            break;
          case InputType.TEXTAREA:
            Input = TextAreaBox
            break;
          case InputType.TAGSELECT:
            Input = TagSelectBox
            break;
          case InputType.DATETIME:
            Input = DateTimeBox
            break;
          default:
          return null
        }

        const value = form[i.property_name] == null? '': form[i.property_name]

        return <Input key={i.property_name}
          focus={i.focus}
          label={i.label}
          items={i.items}
          onChange={(value) => updateForm({[i.property_name]: value})}
          value={value} />
      })}
      <div className="button-bar">
        <button onClick={() => Validator(form, spec) ? onSave() : null}>Save</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  )
}

export default Form
