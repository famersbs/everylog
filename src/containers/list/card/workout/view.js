import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import '../../../../utils/chartjs/horizonalline.plugin'
import { diffByDay } from '../../../../utils/time'
import { colorMap } from '../../../../type'

import { SUMMARY_DAY } from '../../../../modules/list'

const labels = new Array(SUMMARY_DAY).fill(0).map((v,i) => `${SUMMARY_DAY - i} days ago` )

// 이 계산 부분을 Redux쪽으로 옮겨야 될듯, 이 계산을 해당 카드 타입에 따른 계산 모듈 쪽으로 옮겨서 처리 하
// 도록 바꿔야 할듯...
const getData = (logs) =>  {
  let data = new Array(SUMMARY_DAY).fill(0)
  let now = moment().hours(0)
  let oldest_target_date = now
  let current_labels = labels;

  logs.forEach(l => {
    const target_date = moment.unix(l.target_date).hours(0)
    const diffrence = diffByDay(now, target_date, 'days')

    // For reduce chart days
    if(oldest_target_date.isAfter(target_date)) oldest_target_date = target_date

    // ignore paster than SUMMARY_DAY or future data
    if(diffrence >= SUMMARY_DAY || diffrence < 0) return

    // sum of the same day count
    data[diffrence] += Number(l.log.amount)
  })

  // For reduce chart days
  const otd_distance = diffByDay(now, oldest_target_date, 'days') + 1
  if (otd_distance < SUMMARY_DAY ) {
    current_labels = labels.slice(SUMMARY_DAY - otd_distance)
    data = data.slice(0, otd_distance)
  }

  return {
    labels: current_labels,
    datasets: [
      {
        borderWidth: 2,
        data: data.reverse(),
        ...colorMap.good,

        pointDotRadius: 1,
        pointColor: "rgba(87, 167, 134, 1)",
        pointStrokeColor: "rgba(255, 255, 255, 0)",
        pointHighlightFill: "rgba(87, 167, 134, 0.7)",
        pointHighlightStroke: "rgba(87, 167, 134, 1)",
      }
    ],
  }
}

const chartOption = (goal) => ({
    responsive: true,
    maintainAspectRatio: false,
    pointDotRadius: 1,
    pointDotStrokeWidth: 4,
    legend: {
        display: false
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, chart) => ([])
      }
    },
    scales: {
        xAxes: [{display: false}],
        yAxes: [{display: false}]
    },
    elements: {
        /*point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
        },*/
    },
    horizontalLine: [{
        y: goal,
        style: "rgba(0,255,0,0.4)"
    }]
})

const Workout = (props) => {
  const { logs, setting } = props

  return (
    <div className="chart-container"
        style={{zIndex:"0", position: "relative", height:"100px", width:"100%"}}>
        <Line
          height={100}
          data={getData(logs)}
          options={chartOption(setting.baseline)}
        />
    </div>
  )
}

  export default Workout
