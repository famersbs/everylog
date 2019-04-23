import { Action, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { CardType } from "../type";

const SELECT_ROW = "settings/select_row";
const UPDATE_ALL = "settings/update_all";

const saveingSettingsProperties = ["selected_row"];

interface SETTINGS_STATE {
  selected_row: CardType; // 이걸 enum으로 처리 하는건 어떨까?
}

const initialState: SETTINGS_STATE = {
  selected_row: CardType.BODY
};

interface SelectRowAction {
  type: typeof SELECT_ROW;
  payload: CardType;
}

interface UpdateAllAction {
  type: typeof UPDATE_ALL;
  payload: SETTINGS_STATE;
}

export type ActionTypes = SelectRowAction | UpdateAllAction;

const settings_reducer = (
  state: SETTINGS_STATE = initialState,
  action: ActionTypes
): SETTINGS_STATE => {
  switch (action.type) {
    case SELECT_ROW:
      return { ...state, selected_row: action.payload };
    case UPDATE_ALL:
      return { ...state, ...(action.payload as SETTINGS_STATE) };
    default:
      return state;
  }
};
export default (state: any, action: Action<string>) =>
  settings_reducer(state, action as ActionTypes);

export const selectRow = (row_type: CardType) => {
  return (dispatch: any) => {
    localStorage.setItem("selected_row", row_type.toString());
    const action: SelectRowAction = {
      type: SELECT_ROW,
      payload: row_type
    };
    dispatch(action);
  };
};

export const loadSettings = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    let settings: any = {};

    saveingSettingsProperties.forEach((value: string, key: number) => {
      settings[value] = localStorage.getItem(value);
    });

    const action: UpdateAllAction = {
      type: UPDATE_ALL,
      payload: settings
    };
    dispatch(action);
    console.log("Loading settings");
  };
};
