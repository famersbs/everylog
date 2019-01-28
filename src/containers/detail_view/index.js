import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Line} from 'react-chartjs-2';

import './css.scss'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'pull up per day',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

const DetailView = props => (
  <div className="detail-bg">
    <div className="panel-scrollable" >
        <div className="contents">
            <div className="header">
                <div className="left">
                    <div className="title">
                        Pull up 10 x 3
                    </div>
                </div>
                <button className="button">
                    <i className="fas fa-times" />
                </button>
            </div>
            <div className="body">
                <div className="control-bar">
                    <div className="item">
                        <div>
                            <div>
                                <div className="icon">
                                    <i className="far fa-calendar" />
                                </div>
                                <div className="form">
                                    <div className="label">Last updated</div>
                                    <div className="date">Jan 27, 2019</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <div>
                                <div className="icon">
                                <i className="far fa-clock" />
                                </div>
                                <div className="form">
                                    <div className="label">Duration</div>
                                    <div className="date">Every Day</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-container"
                    style={{zIndex:"0", position: "relative", minHeight:"150px", height:"60vh", width:"100%"}}>
                    <Line data={data}
                        options={{
                            legend: {
                                display: false
                              },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}/>
                </div>
            </div>
        </div>
    </div>
    <div className="footer">
        <div className="input-container">
            <div className="label">
                Count
            </div>
            <div className="body">
                <textarea></textarea>
            </div>
        </div>

    </div>
  </div>
)

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView)
