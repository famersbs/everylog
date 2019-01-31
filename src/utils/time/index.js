import moment from 'moment'
/**
 * 날짜만을 이용해서 duration 에 따른 비교를 수행 한다. ( 가끔 몇초 차이로 일자 계산이 틀어질 때가 있다.)
 * @param {moment} a
 * @param {moment} b
 * @param {day, week, month} duration
 */
export const diffByDay = (a,b, duration) => {
  if( !moment.isMoment(a) || !moment.isMoment(b) ) throw new Error("should be use moment object")

  return a.clone().hour(0).hour(0).minute(0).second(0).millisecond(0).diff(b.clone().hour(0).minute(0).second(0).millisecond(0), duration)
}
