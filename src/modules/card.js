import { selectRow } from './settings'

import * as cardDB from '../db/card'

export const SELECT_CARD = 'card/select_card'
export const CardStatus = {
  NONE: -1,
  NEW : 0,
  WRITE : 1,
  VIEW: 2,
  EDIT: 3,
  DETAILVIEW : 4,
}

const initialState = {
  // Card ID (write일 경우)
  id: null,
  // 현재 선택된 카드의 타입 (CardType)
  type: "",
  // 현재 선택된 카드의 상태
  status: CardStatus.NONE,

  // card -> it is fill up when card status is detail view
  setting: null,
  logs: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CARD:
        return {...action.payload}
    default:
        return state
  }
}

export const clear = () => {
  return {
    type: SELECT_CARD,
    payload: initialState
  }
}

export const create = (type) => {
  return {
    type: SELECT_CARD,
    payload: {
      type,
      status: CardStatus.NEW,
    }
  }
}

export const edit = (card_id, form, type) => {
  return {
    type: SELECT_CARD,
    payload: {
      id: card_id,
      type,
      status: CardStatus.EDIT
    }
  }
}

export const write = (card_id, type) => {
  return {
    type: SELECT_CARD,
    payload: {
      id: card_id,
      type,
      status: CardStatus.WRITE,
    }
  }
}

export const showDetail = (card_id, type) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    cardDB.getCardWithLogs(uid, card_id)
    .then( card => {

      // Set select row to this card's row_id
      // because if it does not set like this way,
      // the card deatailview disapear when window size will be changed
      dispatch(selectRow(type))
      dispatch({
        type: SELECT_CARD,
        payload: {
          ...card,
          id: card_id,
          type,
          status: CardStatus.DETAILVIEW,
        }
      })
    })
  }
}
