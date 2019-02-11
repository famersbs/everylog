import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import '../../../../utils/chartjs/horizonalline.plugin'
import { diffByDay } from '../../../../utils/time'
import { colorMap } from '../../../../type'

import { SUMMARY_DAY } from '../../../../db/card'

const labels = new Array(SUMMARY_DAY).fill(0).map((v,i) => `${SUMMARY_DAY - i} days ago` )

// 어차피 해당 카드가 업데이트 될 때만 다시 그리기 때문에 여기서 계산해도 상관 없음
const getData = (logs, settings) =>  {
  let data = new Array(SUMMARY_DAY).fill(null)
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
    data[diffrence] = Number(l.log.amount)
  })

  // If some day has no amount, it should be use previous amount
  let previousAmount = 0
  data = data.map(d => {
    if(d == null) return previousAmount
    else {
      previousAmount = d
    }
    return d
  })

  // For reduce chart days
  const otd_distance = diffByDay(now, oldest_target_date, 'days') + 1
  if (otd_distance < SUMMARY_DAY ) {
    current_labels = labels.slice(SUMMARY_DAY - otd_distance)
    data = data.slice(0, otd_distance)
  }

  // Choose a color
  let graphColor = colorMap.good
  const today = data[0]
  if(today === 0) graphColor = colorMap.bad
  else if(data.length >= 2) {
    if (Math.abs(today - settings.baseline) > Math.abs(data[1] - settings.baseline) ) {
      graphColor = colorMap.normal
    }
  }

  return {
    options: chartOption(settings.baseline, data.reduce((p,c) => Math.max(p,c), -1)),
    data: {
      labels: current_labels,
      datasets: [
        {
          borderWidth: 2,
          data: data.reverse(),
          ...graphColor,

          pointDotRadius: 1,
          pointColor: "rgba(87, 167, 134, 1)",
          pointStrokeColor: "rgba(255, 255, 255, 0)",
          pointHighlightFill: "rgba(87, 167, 134, 0.7)",
          pointHighlightStroke: "rgba(87, 167, 134, 1)",
        }
      ],
    }
  }

}


const chartOption = (goal, peakData) => ({
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    tooltips: {
      callbacks: {
        title: () => ([])
      }
    },
    scales: {
        xAxes: [{display: false}],
        yAxes: [{
          display: false,
          /*
          ticks: {
            // beginAtZero: true,
            max: (Math.max(goal, peakData) + 5) ,
          }
          */
        }]
    },
    elements: {
      /*
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
        },
      */
    },
    horizontalLine: [{
        y: goal,
        style: "rgba(0,255,0,0.4)"
    }]
})

const Body = (props) => {
  const { logs, setting } = props.card
  const data = getData(logs, setting)
  return (
    <div className="chart-container"
        style={{zIndex:"0", position: "relative", height:"30px", width:"100%"}}>
        <Line
            data={data.data}
            options={data.options}
            />
    </div>
  )
}

  export default Body
