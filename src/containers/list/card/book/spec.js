import {InputType} from '../../../../component/cardform'

export default [
  {
    type: InputType.TEXT,
    property_name: 'title',
    label: 'Title',
    focus: true,
  },
  {
    type: InputType.TEXT,
    property_name: 'isbn',
    label: 'ISBN'
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
      {label: "page", value: "page"},
      {label: "chapter", value: "chapter"},
    ]
  },
  {
    type: InputType.NUMBER,
    property_name: 'amount',
    label: 'page or chapter count'
  },
]
