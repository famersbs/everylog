import moment from "moment";

import {
  CardType,
  Card,
  CardLog,
  CardSummaryData,
  CardSummary,
  UNIXTIME,
  SUMMARY_DAY
} from "../../type";

import { diffByDay } from "../../utils/time";

// updated_at 시간으로 초기화 되어 있는 pData 배열을
// 현재 시간을 기준으로 재 정렬 하는 함수 0: 오늘, 1: 오늘 -1일 ...
export function syncDataArrayByNow(
  updated_at: UNIXTIME,
  pData: CardSummaryData
): CardSummaryData {
  let data: CardSummaryData = new Array(SUMMARY_DAY).fill(null);
  let now: moment.Moment = moment().hours(0);
  let diffOfDays = diffByDay(now, moment.unix(updated_at), "days");

  // 일단 Summary 테이블의 날짜를 맞춘다. (오늘 기준으로 )
  if (pData != null && diffOfDays < SUMMARY_DAY) {
    const copyUntil = Math.min(SUMMARY_DAY, diffOfDays + pData.length);
    for (let i = diffOfDays; i < copyUntil; i++) {
      data[i] = pData[i - diffOfDays];
    }
  }
  return data;
}

export function trimByNull(data: CardSummaryData) {
  let lastIndex = 0;
  data.forEach((d, i) => {
    if (d != null) lastIndex = i + 1;
  });

  if (lastIndex < data.length) {
    data.splice(lastIndex);
  }
  return data;
}

function BodyTypeCardSummary(
  card: Card,
  target_date: UNIXTIME,
  log: CardLog
): CardSummary {
  const now = moment().hours(0);
  const pSummary = card.summary;
  let pData = null;
  if (pSummary != null) pData = pSummary.data;

  let data = syncDataArrayByNow(card.updated_at, pData);

  // 방금 추가된 log를 넣는다.
  let diffOfDays = diffByDay(now, moment.unix(target_date), "days");
  if (diffOfDays < SUMMARY_DAY && diffOfDays >= 0) {
    data[diffOfDays] = Number(log.amount);
  }

  // Find last null and cut it
  data = trimByNull(data);

  return { data };
}

function WorkoutTypeCardSummary(
  card: Card,
  target_date: UNIXTIME,
  log: CardLog
) {
  const now = moment().hours(0);
  const pSummary = card.summary;
  let pData: CardSummaryData = new Array(0);
  if (pSummary != null) pData = pSummary.data;

  let data = syncDataArrayByNow(card.updated_at, pData);

  // 방금 추가된 log를 넣는다.
  let diffOfDays = diffByDay(now, moment.unix(target_date), "days");
  if (diffOfDays < SUMMARY_DAY && diffOfDays >= 0) {
    if (data[diffOfDays] == null) data[diffOfDays] = 0;
    data[diffOfDays] = (data[diffOfDays] as number) + Number(log.amount);
  }

  // Find last null and cut it
  data = trimByNull(data);

  return { data };
}

function BookTypeCardSummary(card: Card, _: UNIXTIME, log: CardLog) {
  const newSummary = { progress: Number(log.progress) };
  if (
    card.summary != null &&
    card.summary.progress != null &&
    Number(card.summary.progress) > Number(log.progress)
  ) {
    return card.summary;
  }
  return newSummary;
}

export function getCardSummary(
  card: Card,
  target_date: UNIXTIME,
  log: CardLog
) {
  switch (card.type) {
    case CardType.BODY:
      return BodyTypeCardSummary(card, target_date, log);
    case CardType.WORKOUT:
      return WorkoutTypeCardSummary(card, target_date, log);
    case CardType.BOOK:
      return BookTypeCardSummary(card, target_date, log);
    default:
      return {};
  }
}
