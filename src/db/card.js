import { store } from '../utils/fb'
import moment from 'moment'

import { CardType } from '../type'
import { DISPLAY_DATE_TIME } from '../component/cardform'

export function createANewCard(uid, type, setting) {
  const d = moment().unix()
  return store.collection('card').add({
    uid, type, setting,
    archive: false,
    created_at: d,
    updated_at: d,
  })
}

export function editACard(id, setting) {
  const d = moment().unix()
  return store.collection('card')
  .doc(id)
  .update(
    {
      setting,
      updated_at: d,
    }
  )
}

export function addALog(uid, card_id, type, log) {
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

export function archive(card_id) {
  return store.collection('card')
  .doc(card_id)
  .update({ archive: true, updated_at: moment().unix() })
}

export function getCardWithLogs(uid, card_id) {
  return Promise.all(
    [
      store.collection('card').doc(card_id).get(),
      store.collection('cardlog')
        .where('uid', '==', uid)
        .where('card_id', '==', card_id).get()
        .catch(e => {
          return null
        })
    ]
  ).then(r => {
    const cardSnap = r[0]
    const logsSnap = r[1]
    if( !cardSnap.exists ) throw new Error(`Cannot found card [${card_id}]`)

    const card = cardSnap.data()
    card.logs = []
    if(logsSnap != null) {
      logsSnap.forEach( doc => {
        const data = doc.data()
        card.logs.push({
          ...data.log,
          created_at: data.created_at,
          updated_at: data.updated_at
        })
      })
    }
    return card
  })
}


//// Watch
function watchPreProcess(onChange) {
  return q => {
    const deleted = []
    const changed = []

    q.docChanges().forEach( change => {
      if(change.type !== 'removed') {
        changed.push({...change.doc.data(), id: change.doc.id})
      } else {
        deleted.push(change.doc.id)
      }
    })

    onChange(changed, deleted)
  }
}

export function watchCard(uid, onChange, onError) {
  return store.collection('card')
    .where("uid", "==", uid)
    .where("archive", "==" , false)
    .onSnapshot( {}, watchPreProcess(onChange), onError)
}

export const SUMMARY_DAY = 14     // 14 일 기준으로 써머리 한다.
export function watchCardsLog(uid, onChange, onError) {
  return store.collection('cardlog')
    .where("uid", "==", uid)
    .where("target_date", ">=" , moment().subtract(SUMMARY_DAY, 'd').unix())  // get 14 days log
    .onSnapshot( {}, watchPreProcess(onChange), onError)
}
