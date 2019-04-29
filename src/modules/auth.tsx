import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, googleProvider } from "../utils/fb";
import { Action, AnyAction } from "redux";

import * as msgbox from "../utils/msgbox";

export const SET_STATUS = "login/set_status";

const initialState: AUTH_STATE = {
  isLogin: null
};

interface SetStatusAction {
  type: typeof SET_STATUS;
  payload: AUTH_STATE;
}

export type ActionTypes = SetStatusAction;

const auth_reducer = (
  state: AUTH_STATE = initialState,
  action: ActionTypes
): AUTH_STATE => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default (state: any, action: Action<string>) =>
  auth_reducer(state, action as ActionTypes);

export const setLoginStatus = (status: AUTH_STATE): SetStatusAction => {
  return {
    type: SET_STATUS,
    payload: {
      ...status
    }
  } as SetStatusAction;
};

export const login = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async () => {
    auth()
      .signInWithRedirect(googleProvider)
      .then(r => {
        console.log("Login success");
      })
      .catch(e => {
        // console.log( e.code )
        msgbox.error("Login fail", e);
      });
  };
};
