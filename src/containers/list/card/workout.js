import React from 'react'
import { Line } from 'react-chartjs-2'
import '../../../utils/chartjs/horizonalline.plugin'

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

const Workout = (props) => (
    <div className="chart-container"
        style={{zIndex:"0", position: "relative", height:"30px", width:"100%"}}>
        <Line
            data={props.summary}
            width={100}
            height={50}
            options={chartOption(props.summary.goal)}
            />
    </div>
  )

  export default Workout
