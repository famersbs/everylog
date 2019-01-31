import {InputType} from '../../../../component/cardform'
import {getDurationItemsForCardForm} from '../../../../type'

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
    items: getDurationItemsForCardForm(),
    is_required: true,
  },
  {
    type: InputType.TAGSELECT,
    property_name: 'unit',
    label: 'Unit',
    items: [
      {label: "page", value: "page"},
      {label: "chapter", value: "chapter"},
    ],
    is_required: true,
  },
  {
    type: InputType.NUMBER,
    property_name: 'amount',
    label: 'page or chapter count',
    is_required: true,
  },
]
