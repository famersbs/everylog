import {InputType} from '../../../../component/cardform'
import {getDurationItemsForCardForm} from '../../../../type'

export default [
  {
    type: InputType.TEXT,
    property_name: 'title',
    label: 'Note',
    focus: true,
  },
  /*
  {
    type: InputType.TAGSELECT,
    property_name: 'duration',
    label: 'Duration',
    items: [
      {
        label: "Todo",
        value: "todo",
      },
      {
        label: "Note",
        value: "note",
      }
    ],
    is_required: true,
  },
  */
]
