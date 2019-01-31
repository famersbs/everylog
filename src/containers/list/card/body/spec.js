import {InputType} from '../../../../component/cardform'
import {getDurationItemsForCardForm} from '../../../../type'

export default [
  {
    type: InputType.TEXT,
    property_name: 'title',
    label: 'Title',
    focus: true,
    is_required: true,
  },
  {
    type: InputType.TAGSELECT,
    property_name: 'duration',
    label: 'Duration',
    items: [
      {label: "Day", value: "Day"},
      {label: "Week", value: "Week"},
      {label: "Month", value: "Month"},
    ],
    is_required: true,
  },
  {
    type: InputType.TAGSELECT,
    property_name: 'unit',
    label: 'Unit',
    items: getDurationItemsForCardForm(),
    is_required: true,
  },
  {
    type: InputType.NUMBER,
    property_name: 'baseline',
    label: 'Base Line',
    is_required: true,
  },
]
