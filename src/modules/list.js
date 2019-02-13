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

        console.log(currentUpdatedCards)

        if (deletedCards.length > 0) {
          dispatch(deleteCards(deletedCards))
        }
        dispatch(update(currentUpdatedCards))
      },
      e => {
        msgbox.error('load fail', e)
        console.log(e)
      }
    )
  }
}
