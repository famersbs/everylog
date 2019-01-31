import React from 'react'

import CardForm, {InputType}from '../../../../component/cardform'

const Book = (props) => {
  const spec = [
    {
      type: InputType.DATETIME,
      property_name: 'target_date',
      label: 'Target Date',
      is_required: true,
    },
    {
      type: InputType.NUMBER,
      property_name: 'progress',
      label: props.setting.unit,
      focus: true,
      is_required : true,
      maximum_value: props.setting.amount,
    },
    {
      type: InputType.TEXTAREA,
      property_name: 'comment',
      label: 'Comment',
    },
  ]

  return (
    <CardForm spec={spec} />
  )
}

export default Book
