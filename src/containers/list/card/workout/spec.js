import {InputType} from '../../../../component/cardform'

export default [
  {
    type: InputType.TEXT,
    property_name: 'title',
    label: 'Title'
  },
  {
    type: InputType.TAGSELECT,
    property_name: 'duration',
    label: 'Duration',
    items: [
      {label: "Day", value: "Day"},
      {label: "Week", value: "Week"},
      {label: "Month", value: "Month"},
    ]
  },
  {
    type: InputType.TAGSELECT,
    property_name: 'unit',
    label: 'Unit',
    items: [
      {label: "kg", value: "kg"},
      {label: "cm", value: "cm"},
      {label: "%", value: "%"},
      {label: "lbs", value: "lbs"},
      {label: "ft", value: "ft"},
      {label: "inch", value: "inch"},
    ]
  },
  {
    type: InputType.NUMBER,
    property_name: 'baseline',
    label: 'Base Line'
  },
]
