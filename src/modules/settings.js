import { CardType } from './card'

const SELECT_ROW = 'settings/select_row'
const UPDATE_ALL = 'settings/update_all'

const saveingSettingsProperties = [
  'selected_row',
]

const initialState = {
  selected_row: CardType.BODY,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ROW:
      return { ...state, selected_row: action.payload }
    case UPDATE_ALL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const selectRow = (row_type) => {
  return (dispatch) => {
    localStorage.setItem('selected_row', row_type)
    dispatch({
      type: SELECT_ROW,
      payload: row_type,
    })
  }
}

export const loadSettings = () => {
  return (dispatch) => {
    let settings = {}

    saveingSettingsProperties.forEach(key => {
      settings[key] = localStorage.getItem(key)
    })

    dispatch({
      type: UPDATE_ALL,
      payload: settings
    })
    console.log("Loading settings")
  }
}
