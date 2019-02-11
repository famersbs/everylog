import React, { useState } from 'react'

import { getInputComponent } from './getInputComponent'
import Validator from './validator'

import './card.form.scss'

import { DISPLAY_DATE_TIME, InputType } from './type'
export { DISPLAY_DATE_TIME, InputType }

const CardForm = props => {
  const { spec, clear, save } = props
  const [formState, setForm] = useState(props.form?props.form:{})
  return (
    <div className="new_form">
      {spec.map(i => {
        let Input = getInputComponent(i.type)
        if( Input == null) return null

        const input = i
        const value = formState[i.property_name] == null? '': formState[i.property_name]

        return <Input
          key={i.property_name}
          spec={i}
          onChange={(value) => setForm({...formState, [input.property_name]: value})}
          value={value} />
      })}
      <div className="button-bar">
        <button onClick={() => Validator(formState, spec) ? save(formState) : null}>Save</button>
        <button onClick={() => clear()}>Cancel</button>
      </div>
    </div>
  )
}
export default CardForm
