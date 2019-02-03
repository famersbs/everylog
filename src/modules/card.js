import { store } from '../utils/fb'
import * as msgbox from '../utils/msgbox'
import moment from 'moment'

import {DISPLAY_DATE_TIME} from '../component/cardform'

export const SELECT_CARD = 'card/select_card'
export const UPDATE_FORM = 'card/update_form'

export const CardType = {
  WORKOUT: 'workout',
  TEXT: 'text',
  BOOK: 'book',
  BODY: 'body',
}

export const CardStatus = {
  NONE: -1,
  NEW : 0,
  WRITE : 1,
  VIEW: 2,
}

const initialState = {
  // Card ID (write일 경우)
  id: null,

  // 현재 선택된 카드가 위치한 row
  row_id: null,

  // 현재 선택된 카드의 타입 (CardType)
  type: "",
  status: CardStatus.NONE,
  form: {}
}
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CARD:
        return {...action.payload}
    case UPDATE_FORM:
        return {...state, form: {...state.form, ...action.payload.form}}
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

export const create = (row_id, type) => {
  return {
    type: SELECT_CARD,
    payload: {
      row_id,
      type,
      status: CardStatus.NEW,
      form: {}
    }
  }
}

export const write = (card_id, row_id, type) => {
  return {
    type: SELECT_CARD,
    payload: {
      id: card_id,
      row_id,
      type,
      status: CardStatus.WRITE,
      form: {
        target_date: moment().format(DISPLAY_DATE_TIME)   // it should be modifie to unix timestamp when It will be save
      }
    }
  }
}


export const updateForm = (form) => {
  return {
    type: UPDATE_FORM,
    payload: {
      form
    }
  }
}

function createANewCard(uid, type, setting) {
  const d = moment().unix()
  return store.collection('card').add({
    uid, type, setting,
    archive: false,
    created_at: d,
    updated_at: d,
  })
}

function addALog(uid, card) {
  const card_id = card.id
  const type = card.type
  const log = card.form

  const d = moment().unix()
  const target_date = moment(log.target_date, DISPLAY_DATE_TIME).unix()
  delete log.target_date

  //  Validate 해야 할까? --> 각 컴포넌트에서 하는것이 나을까?


  return store.collection('cardlog').add({
    uid, card_id, type, log,
    created_at: d,
    updated_at: d,
    target_date: target_date,  // Serch option
  }).then( r => {
    const cardUpdateData = {
      updated_at: d
    }
    // 업데이트 card 요약 정보 (Book일 경우)
    if (type === CardType.BOOK) {
      // 일단 마지막 걸로 업데이트 하는데, 이는 이전의 기록 보다 무조건 커야 한다는 조건이 필요 함
      cardUpdateData.summary = {
        progress: log.progress
      }
    }

    return store.collection('card')
    .doc(card_id)
    .update(cardUpdateData)
    .then( () => r )
  })
}

export const save = () => {
  // 현재 card form에 있는 정보를 저장 한다.
  // 새로운 카드라면, 해당 카드 자체를 업데이트 하고, 기존 카드라면 로그를 업데이트 한다... ( 이게 맞나? )
  return (dispatch, getState) => {
    const state = getState()
    const uid = state.auth.uid
    const card = state.card

    let work = Promise.resolve("none")

    if (state.card.status === CardStatus.NEW) {
      work = createANewCard( uid, card.type, card.form )
    } else if (state.card.status === CardStatus.WRITE) {
      work = addALog(uid, card)
    }

    // After work
    work
      .then( r => {
        dispatch(clear())
      }).catch( e => {
        msgbox.error("Save Fail", e)
        console.log(e)
      })
  }

}

export const archive = (card_id) => {
  return () => {
    return store.collection('card')
    .doc(card_id)
    .update({ archive: true, updated_at: moment().unix() })
  }
}
