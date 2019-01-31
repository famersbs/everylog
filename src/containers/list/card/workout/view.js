import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import '../../../../utils/chartjs/horizonalline.plugin'
import { colorMap } from '../../../../type'

import { SUMMARY_DAY } from '../../../../modules/list'

const label = new Array(SUMMARY_DAY).fill(0).map((v,i) => `${SUMMARY_DAY - i} days ago` )

// 이 계산 부분을 Redux쪽으로 옮겨야 될듯, 이 계산을 해당 카드 타입에 따른 계산 모듈 쪽으로 옮겨서 처리 하
// 도록 바꿔야 할듯...
const getData = (logs) =>  {
  let data = new Array(SUMMARY_DAY).fill(0)
  let now = moment()

  logs.forEach(l => {
    const diffrence = now.diff(moment.unix(l.target_date), 'days')
    if(diffrence >= SUMMARY_DAY || diffrence < 0) return // ignore paster than SUMMARY_DAY or future data
    data[diffrence] = l.log.amount
  })

  return {
    labels: label,
    datasets: [
      {
        borderWidth: 2,
        data: data.reverse(),  // 2주 데이터
        ...colorMap.good,
      }
    ],
  }
}

const chartOption = (goal) => ({
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{display: false}],
        yAxes: [{display: false}]
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
        },
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
        style={{zIndex:"0", position: "relative", height:"30px", width:"100%"}}>
        <Line
            data={getData(logs)}
            options={chartOption(setting.baseline)}
            />
    </div>
  )
}

  export default Workout
