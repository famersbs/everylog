import { Action } from "redux";
import * as msgbox from "../utils/msgbox";
import * as cardDB from "../db/card";

import { Card } from "../type";

export const UPDATE = "list/update";
export const DELETE = "list/delete";

interface DeleteCardsAction {
  type: typeof DELETE;
  payload: [string];
}
interface Cards {
  [id: string]: Card;
}

export interface UpdateAction {
  type: typeof UPDATE;
  payload: Cards;
}

const initialState: {
  card: Cards;
} = {
  card: {}
};

export type ActionTypes = DeleteCardsAction | UpdateAction;

const list_reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, card: { ...state.card, ...action.payload } };
    case DELETE:
      let newCards: Cards = { ...state.card };
      action.payload.forEach(id => {
        if (newCards[id] != null) {
          delete newCards[id];
        }
      });
      return { ...state, card: { ...newCards } };
    default:
      return state;
  }
};
export default (state: any, action: Action<string>) =>
  list_reducer(state, action as ActionTypes);

export const deleteCards = (card_ids: [string]): DeleteCardsAction => ({
  type: DELETE,
  payload: card_ids
});

export const update = (cards: Cards): UpdateAction => ({
  type: UPDATE,
  payload: cards
});

////////////////////////////////////////////////////////////////////////////////////
/// These are should be call only once when this app are starting below actions
let nowWatchedCard = false;
export const watchCard = (uid: string) => {
  return (dispatch: any, getState: any) => {
    if (nowWatchedCard) return;
    nowWatchedCard = true;
    cardDB.watchCard(
      uid,
      (changedCards: [Card], deletedCards: [string]) => {
        const currentCards: Cards = getState().list.card as Cards;
        const currentUpdatedCards: Cards = {};

        changedCards.forEach((card: Card) => {
          if (currentCards[card.id] != null) {
            card.logs = currentCards[card.id].logs;
          } else {
            card.logs = [];
          }
          currentUpdatedCards[card.id] = card;
        });

        if (deletedCards.length > 0) {
          dispatch(deleteCards(deletedCards));
        }
        dispatch(update(currentUpdatedCards));
      },
      (e: any) => {
        msgbox.error("load fail", e);
        console.log(e);
      }
    );
  };
};
