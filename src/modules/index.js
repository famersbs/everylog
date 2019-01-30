import { combineReducers } from 'redux'
import list from './list'
import card from './card'
import auth from './auth'

export default combineReducers({
  list,
  card,
  auth,
})
