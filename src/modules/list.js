import moment from 'moment'
import * as msgbox from '../utils/msgbox'

import { store } from '../utils/fb'

export const SUMMARY_DAY = 14     // 14 일 기준으로 써머리 한다.

const UPDATE = 'list/update'
const DELETE = 'list/delete'

const initialState = {
  card: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {...state, card: {...state.card, ...action.payload}}
    case DELETE:
      let newCards = {...state.card}
      action.payload.forEach(id =>{
        if(newCards[id] != null){
          delete newCards[id]
          console.log("Delete ", id )
        }
      })
      return {...state, card:{...newCards}}
    default:
      return state
  }
}

export const deleteCards = (card_ids) => {
  return {
    type: DELETE,
    payload: card_ids,
  }
}

export const update = (cards) => {
  return {
    type: UPDATE,
    payload: cards,
  }
}

////////////////////////////////////////////////////////////////////////////////////
/// These are should be call only once when this app are starting below actions
let nowWatchedCard = false
let nowWatchedCardLog = false
export const watchCard = (uid) => {
  return (dispatch, getState) => {
    if(nowWatchedCard) return
    nowWatchedCard = true
    store.collection('card')
      .where("uid", "==", uid)
      .where("archive", "==" , false)
      .onSnapshot( {},
        q => {
          let currentUpdatedCards = {}
          let deletedCards = []
          const currentCards = getState().list.card
          q.docChanges().forEach( change => {
            if(change.type !== 'removed') {
              const doc = change.doc
              const cardID = doc.id
              const card = doc.data()
              card.id = doc.id    // added ID on doc --> it should be delete when it update

              if(currentCards[cardID] != null) {
                card.logs = currentCards[cardID].logs
              } else {
                card.logs = []
              }
              currentUpdatedCards[cardID] = card;
            } else {
              deletedCards.push(change.doc.id)
            }
          })

        if (deletedCards.length > 0) {
          dispatch(deleteCards(deletedCards))
        }
        dispatch(update(currentUpdatedCards))

        // Call after Card load once
        watchCardLog(uid)(dispatch, getState)
      },
      e => {
          msgbox.error('load fail', e)
          console.log(e)
      }
    )
  }
}

export const watchCardLog = (uid) => {
  return (dispatch, getState) => {
    if(nowWatchedCardLog) return
    nowWatchedCardLog = true
    store.collection('cardlog')
    .where("uid", "==", uid)
    .where("target_date", ">=" , moment().subtract(SUMMARY_DAY, 'd').unix())  // get 14 days log
    .onSnapshot( {},
      q => {
        let currentUpdatedCards = {}
        const currentCards = getState().list.card
        q.docChanges().forEach( change => {
          if(change.type !== 'removed') {
            const doc = change.doc
            const log = doc.data()
            const card = currentCards[log.card_id]
            const cardID = card.id
            if(card == null) return

            card.logs.push(log)
            currentUpdatedCards[cardID] = card;
          } else {
            // Removed
            console.log("Removed card log : ", change.doc.id)
          }
        })
        dispatch(update(currentUpdatedCards))
    },
    e => {
        msgbox.error('load fail', e)
        console.log(e)
    }
  )
  }
}
