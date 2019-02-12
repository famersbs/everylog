import moment from 'moment'

import { CardType } from "../../type";

import { diffByDay } from '../../utils/time'

export const SUMMARY_DAY = 14     // 14 일 기준으로 써머리 한다.

// updated_at 시간으로 초기화 되어 있는 pData 배열을
// 현재 시간을 기준으로 재 정렬 하는 함수 0: 오늘, 1: 오늘 -1일 ...
export function syncDataArrayByNow(updated_at, pData) {
  let data = new Array(SUMMARY_DAY).fill(null)
  let now = moment().hours(0)
  let diffOfDays = diffByDay(now, moment.unix(updated_at),  'days')

  // 일단 Summary 테이블의 날짜를 맞춘다. (오늘 기준으로 )
  if( pData != null && diffOfDays < SUMMARY_DAY) {
    const copyUntil = Math.min( SUMMARY_DAY, diffOfDays + pData.length)
    for(let i = diffOfDays ; i < copyUntil; i ++ ) {
      data[i] = pData[i - diffOfDays]
    }
  }
  return data
}

export function trimByNull(data) {
  let lastIndex = 0
  data.forEach( (d, i) => {
    if(d != null) lastIndex = i + 1
  })

  if(lastIndex < data.length) {
    data.splice(lastIndex)
  }
  return data
}

function BodyTypeCardSummary(card, target_date, log) {
  const now = moment().hours(0)
  const pSummary = card.summary
  let pData = null
  if (pSummary != null) pData = pSummary.data

  let data = syncDataArrayByNow(card.updated_at, pData)

  // 방금 추가된 log를 넣는다.
  let diffOfDays = diffByDay(now, moment.unix(target_date), 'days')
  if (diffOfDays < SUMMARY_DAY && diffOfDays >= 0) {
    data[diffOfDays] = Number(log.amount)
  }

  // Find last null and cut it
  data = trimByNull(data)

  return { data }
}

function WorkoutTypeCardSummary(card, target_date, log) {
  const now = moment().hours(0)
  const pSummary = card.summary
  let pData = null
  if (pSummary != null) pData = pSummary.data

  let data = syncDataArrayByNow(card.updated_at, pData)

  // 방금 추가된 log를 넣는다.
  let diffOfDays = diffByDay(now, moment.unix(target_date), 'days')
  if (diffOfDays < SUMMARY_DAY && diffOfDays >= 0) {
    if(data[diffOfDays] == null) data[diffOfDays] = 0
    data[diffOfDays] += Number(log.amount)
  }

  // Find last null and cut it
  data = trimByNull(data)

  return { data }
}

function BookTypeCardSummary(card, _, log) {
  const newSummary = { progress: Number(log.progress) }
  if (
    card.summary != null &&
    card.summary.progress != null &&
    Number(card.summary.progress) > Number(log.progress)
  ) {
    return card.summary
  }
  return newSummary
}

export function getCardSummary(card, target_date, log) {

  switch(card.type) {
    case CardType.BODY:
      return BodyTypeCardSummary(card, target_date, log)
    case CardType.WORKOUT:
      return WorkoutTypeCardSummary(card, target_date, log)
    case CardType.BOOK:
      return BookTypeCardSummary(card, target_date, log)
    default:
      return {}
  }
}
