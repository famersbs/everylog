import { CardType } from './card'

export const SELECT_ROW = 'settings/select_row'

const initialState = {
  selected_row: CardType.BODY,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ROW:
      return { ...state, selected_row: action.payload }
    default:
      return state
  }
}

export const selectRow = (row_type) => {
  return {
    type: SELECT_ROW,
    payload: row_type,
  }
}
