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

let WatchLogUnSubscribe = null
export const clear = () => {
  return (dispatch, getState) => {

    if (WatchLogUnSubscribe != null) {
      WatchLogUnSubscribe()
      WatchLogUnSubscribe = null
    }
    dispatch( {
      type: SELECT_CARD,
      payload: initialState
    })
  }
}

export const showDetail = (card_id, type) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const current_card = getState().list.card[card_id]

    dispatch(selectRow(type))
    dispatch({
      type: SELECT_CARD,
      payload: {
        ...current_card,
        id: card_id,
        type,
        status: CardStatus.DETAILVIEW,
      }
    })

    /* Watch Logs */
    WatchLogUnSubscribe = cardDB.watchLogs(
      uid,
      card_id,
      (q) =>{
        const card = getState().card
        const logs = [...card.logs]

        q.docChanges().forEach( change => {
          if(change.type !== 'removed') {
            const d = change.doc.data()
            logs.push({
              ...d.log,
              id: d.id,
              target_date: d.target_date,
              created_at: d.created_at,
              updated_at: d.updated_at
            })
          } else {
            logs = logs.filter( l => l.id === change.doc.id )
          }
        })

        dispatch({
          type: SELECT_CARD,
          payload: {
            ...card,
            logs,
          }
        })

      },
      (err) => {
        console.log("cardlog watch error ", err)
      }
    )
  }
}
