import { store } from '../utils/fb'
import * as msgbox from '../utils/msgbox'
import moment from 'moment'

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
export const write = (row_id, type) => {
  return {
    type: SELECT_CARD,
    payload: {
      row_id,
      type,
      status: CardStatus.WRITE,
      form: {}
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

export const save = () => {
  // 현재 card form에 있는 정보를 저장 한다.
  // 새로운 카드라면, 해당 카드 자체를 업데이트 하고, 기존 카드라면 로그를 업데이트 한다... ( 이게 맞나? )
  return (dispatch, getState) => {
    const state = getState()
    if (state.card.status === CardStatus.NEW) {
      store.collection('card').add({
        uid: state.auth.uid,
        type: state.card.type,
        setting: state.card.form,
        created_at: moment().unix(),
        updated_at: moment().unix(),
      }).then( r => {
        // console.log(r.id)
        dispatch(clear())
      }).catch( e => {
        // console.log(e)
        msgbox.error("Save Fail", e)
      })
    } else if (state.card.status === CardStatus.WRITE) {

    }
  }

}
