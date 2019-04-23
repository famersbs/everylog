import { Action } from "redux";
import { selectRow } from "./settings";

import * as cardDB from "../db/card";

import {
  UPDATE as LIST_UPDATE,
  UpdateAction as ListUpdateAction
} from "./list";

export const SELECT_CARD = "card/select_card";

import {
  Card,
  CardType,
  CardStatus,
  CardID,
  CardSetting,
  CardLog
} from "../type";
export { CardStatus };

const initialState: Card = {
  id: "",
  type: CardType.NONE,
  status: CardStatus.NONE,
  setting: null,
  logs: null,
  updated_at: 0,
  created_at: 0
};

interface CreateAction {
  type: typeof SELECT_CARD;
  payload: {
    type: string;
    status: typeof CardStatus.NEW;
  };
}
interface EditAction {
  type: typeof SELECT_CARD;
  payload: {
    id: string;
    type: string; // It should be Card Type
    status: typeof CardStatus.EDIT;
  };
}
interface WriteAction {
  type: typeof SELECT_CARD;
  payload: {
    id: string;
    type: string; // It should be Card Type
    status: typeof CardStatus.WRITE;
  };
}
interface ClearAction {
  type: typeof SELECT_CARD;
  payload: {
    id: CardID;
    type: CardType; // It should be Card Type
    status: typeof CardStatus.NONE;
    setting: CardSetting;
    logs: CardLog;
  };
}
interface ShowDetailAction {
  type: typeof SELECT_CARD;
  payload: {
    id: CardID;
    type: string; // It should be Card Type
    status: typeof CardStatus.DETAILVIEW;
    setting: CardSetting;
    logs: CardLog;
  };
}

export type ActionTypes =
  | CreateAction
  | EditAction
  | WriteAction
  | ClearAction
  | ShowDetailAction
  | ListUpdateAction;

const card_reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case LIST_UPDATE:
      const updated_card_id = Object.keys(action.payload).find(
        v => v === state.id
      );
      if (updated_card_id != null) {
        const updated_card = action.payload[updated_card_id];
        return {
          ...state,
          summary: updated_card.summary,
          setting: updated_card.setting,
          updated_at: updated_card.updated_at
        };
      } else {
        return state;
      }
    case SELECT_CARD:
      return { ...action.payload };
    default:
      return state;
  }
};
export default (state: any, action: Action<string>) =>
  card_reducer(state, action as ActionTypes);

export const create = (type: string): CreateAction => {
  return {
    type: SELECT_CARD,
    payload: {
      type, // It should be Card Type
      status: CardStatus.NEW
    }
  } as CreateAction;
};

export const edit = (card_id: string, _: any, type: string): EditAction => {
  return {
    type: SELECT_CARD,
    payload: {
      id: card_id,
      type,
      status: CardStatus.EDIT
    }
  } as EditAction;
};

export const write = (card_id: string, type: string): WriteAction => {
  return {
    type: SELECT_CARD,
    payload: {
      id: card_id,
      type,
      status: CardStatus.WRITE
    }
  } as WriteAction;
};

let WatchLogUnSubscribe: null | any = null;

export const clear = () => {
  return (dispatch: any, getState: any) => {
    if (WatchLogUnSubscribe != null) {
      WatchLogUnSubscribe();
      WatchLogUnSubscribe = null;
    }
    dispatch({
      type: SELECT_CARD,
      payload: initialState
    });
  };
};

export const showDetail = (card_id: CardID, type: CardType) => {
  return (dispatch: any, getState: any) => {
    const uid = getState().auth.uid;
    const current_card = getState().list.card[card_id];

    dispatch(selectRow(type));
    dispatch({
      type: SELECT_CARD,
      payload: {
        ...current_card,
        id: card_id,
        type,
        status: CardStatus.DETAILVIEW
      }
    });

    /* Watch Logs */
    WatchLogUnSubscribe = cardDB.watchLogs(
      uid,
      card_id,
      (q: any) => {
        // it should be update when carddb is transfer to tsx
        const card = getState().card;
        let logs = [...card.logs];

        q.docChanges().forEach((change: any) => {
          // It should be update when carddb is transfer to tsx
          if (change.type !== "removed") {
            const d = change.doc.data();
            logs.push({
              ...d.log,
              id: change.doc.id,
              target_date: d.target_date,
              created_at: d.created_at,
              updated_at: d.updated_at
            });
          } else {
            logs = logs.filter(l => l.id === change.doc.id);
          }
        });

        dispatch({
          type: SELECT_CARD,
          payload: {
            ...card,
            logs
          }
        });
      },
      (err: any) => {
        console.log("cardlog watch error ", err);
      }
    );
  };
};
