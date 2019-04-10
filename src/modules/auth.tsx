import { auth, googleProvider } from '../utils/fb'
import * as msgbox from '../utils/msgbox'

export const SET_STATUS = 'login/set_status'


const initialState:AUTH_STATUS  = {
  isLogin: null // null -> before check, false -> not logined, true -> login
}
interface AUTH_ACTION {
  type: string
  payload: AUTH_STATUS
}

export default (state = initialState, action: AUTH_ACTION) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const setLoginStatus = (status: AUTH_STATUS) => {
  return {
    type: SET_STATUS,
    payload: {
      ...status
    }
  }
}

export const login = () => {
  return () => {
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
