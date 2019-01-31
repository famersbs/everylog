import { auth, googleProvider } from '../utils/fb'
import * as msgbox from '../utils/msgbox'

export const SET_STATUS = 'login/set_status'

const initialState = {
  isLogin: null // null -> before check, false -> not logined, true -> login
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const setLoginStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: {
      ...status
    }
  }
}

export const login = () => {
  return (dispatch) => {
    auth().signInWithRedirect(googleProvider)
      .then( r => {
        console.log( "Login success" )
      })
      .catch( e => {
        // console.log( e.code )
        msgbox.error("Login fail", e)
      })
  }
}
