import * as msgbox from '../utils/msgbox'
import * as cardDB from '../db/card'

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
    cardDB.watchCard(
      uid,
      (changedCards, deletedCards) => {
        const currentCards = getState().list.card
        const currentUpdatedCards = {}

        changedCards.forEach( card => {
          if(currentCards[card.id] != null) {
            card.logs = currentCards[card.id].logs
          } else {
            card.logs = []
          }
          currentUpdatedCards[card.id] = card
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

    cardDB.watchCardsLog(
      uid,
      (changedLogs, deletedLogs) => {

        if(deletedLogs.length > 0) {
          console.log("Removed card's logs", deletedLogs)
        }

        const currentUpdatedCards = []
        const currentCards = getState().list.card
        changedLogs.forEach( l => {
          const card = currentCards[l.card_id]
          if (card == null) return  // It is archived card's log
          card.logs.push(l)
          currentUpdatedCards[card.id] = card;
        })

        // for Rerender ( realloc card object )
        Object.keys(currentUpdatedCards).forEach( k => {
          currentUpdatedCards[k] = {...currentUpdatedCards[k]}
        })

        dispatch(update(currentUpdatedCards))
      }
    )
  }
}
