import React from 'react'

import CardForm, {InputType}from '../../../../component/cardform'

const Body = (props) => {
  const spec = [
    {
      type: InputType.DATETIME,
      property_name: 'target_date',
      label: 'Target Date',
      is_required: true,
    },
    {
      type: InputType.NUMBER,
      property_name: 'amount',
      label: props.setting.unit,
      focus: true,
      is_required: true,
    },
  ]

  return (
    <CardForm spec={spec} />
  )
}

export default Body
