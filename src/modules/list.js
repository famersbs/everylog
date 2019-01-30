import moment from 'moment'

import * as msgbox from '../utils/msgbox'

import { colorMap } from '../type'
import { CardType } from './card'

import { store } from '../utils/fb'

const UPDATE = 'list/update'

const initialState = {
  rows: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {...state, rows: action.payload}
    default:
      return state
  }
}

export const update = (rows) => {
  return {
    type: UPDATE,
    payload: rows,
  }
}


const sampleSummary =  {
  labels: [-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0],
  datasets: [
    {
      borderWidth: 2,
      data: [10,10,10,10,14,10,13,10,10,10,100,10,10,10],  // 2주 데이터
      ...colorMap.good,
    }
  ],
  goal: 15,
}

const sampleBookSummary = {
  progress: 15,
}

export const load = (uid) => {
  return (dispatch, getState) => {

    const state =  getState()
    let lastestCardUpdateDate = 0
    uid = uid == null ? state.auth.uid : uid

    const rowMappingTable = {
      [CardType.BODY]:0,
      [CardType.WORKOUT]:1,
      [CardType.BOOK]:2,
      [CardType.TEXT]:3,
    }
    let rows = []

    // Make rows
    Object.keys(rowMappingTable).forEach(k => {
      rows[rowMappingTable[k]] = {
        id: rowMappingTable[k],
        title: k,
        type: k,
        cards: [],
      }
    })

    let works = []
    works.push(
      store.collection('card')
        .where("uid", "==", uid)
        .get()
      )

    Promise.all(works)
    .then(result => {

      // let cardMap = {}
      const cards = result[0]
      cards.forEach(doc => {
        const cardID = doc.id
        const data = doc.data()

        // Build cards
        // cardMap[cardID] =
        const card = {
          id: cardID,
          ...data,
          summary: data.type === CardType.BOOK ? sampleBookSummary: sampleSummary,
        }

        rows[rowMappingTable[card.type]].cards.push(card)

        lastestCardUpdateDate = Math.max(lastestCardUpdateDate, card.updated_at)
      })

      rows.forEach(r => {
        r.card = r.cards.sort((a,b) => b.updated_at - a.updated_at)
      })

      // Dispatch
      dispatch(update(rows))


      store.collection('card')
        .where("uid", "==", uid)
        .where("updated_at", ">", lastestCardUpdateDate)
        .onSnapshot( {},
          q => {
            q.docChanges().forEach( change => {
              console.log("Changed ", change)
              if(change.type === 'added') {
                const doc = change.doc
                const rows = getState().list.rows

                const cardID = doc.id
                const data = doc.data()

                // Build cards
                const card = {
                  id: cardID,
                  ...data,
                  summary: data.type === CardType.BOOK ? sampleBookSummary: sampleSummary,
                }

                rows[rowMappingTable[card.type]].cards.push(card)
                rows[rowMappingTable[card.type]].cards.sort((a,b) => b.updated_at - a.updated_at)
              }
            }
          )
        }
      )
    })
    .catch(e => {
      msgbox.error('load fail', e)
      console.log(e)
    })
  }
}
