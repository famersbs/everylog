import { combineReducers } from 'redux'
import list from './list'
import card from './card'
import auth from './auth'
import settings from './settings'

export default combineReducers({
  list,
  card,
  auth,
  settings,
})
