import React from 'react'
// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Line} from 'react-chartjs-2'

import './css.scss'

const colorMap = {
  good :{
    backgroundColor: 'rgba(50,205,50,0.5)',
    borderColor: 'rgba(0,128,0,1)',
    pointHoverBackgroundColor: '#181818',
  },
  normal: {
    backgroundColor: 'rgba(50,205,50,0.5)',
    borderColor: 'rgba(0,128,0,1)',
    pointHoverBackgroundColor: '#181818',
  },
  bad: {
    backgroundColor: 'rgba(50,205,50,0.5)',
    borderColor: 'rgba(0,128,0,1)',
    pointHoverBackgroundColor: '#181818',
  }
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      borderWidth: 2,
      data: [65, 59, 84, 84, 51, 55, 40],
      ...colorMap.good,
    }
  ]
};

// Pinterest ui에 flexbox order를 이용하여 왼쪽에서 오른 쪽으로 순서 정렬 하기
// https://hackernoon.com/masonry-layout-technique-react-demo-of-100-css-control-of-the-view-e4190fa4296
class List extends React.Component {
  componentDidMount() {
  }
  render() {
  return (
    <div className="main_bg">
      <div className="page-topbar">
        <div className="icon-bg">
          <img className="icon" src="/favicon.ico" alt='logo'>
          </img>
        </div>
        <div className="title">
        Everylog
        </div>
        <div className="right-menu" >
          <div className="actions">
            <button className="circle-btn" > {/** refresh button*/}
              <i className="fas fa-sync-alt" ></i>
            </button>
            <div className="avatar"
              style={{backgroundImage: `url("https://s3.amazonaws.com/profile_photos/134145908735242.ceGXQ1D4PCHnigAagqYS_27x27.png")`}}>
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="board">
          <div className="row">
            <div className="title">
            work out
            </div>
            <div className="item-button">
              <i className="fas fa-plus" />
            </div>
            <div className="item-scrollable-container">
              <div className="scrollable-vertical">
                <div className="item-list">
                  <button className="item-box">
                    <div className="title-box">
                      <div className="title">
                        Push up 20 x 3
                      </div>
                      <div></div>
                    </div>
                    <div className="status">
                      <div className="chart-container"
                        style={{zIndex:"0", position: "relative", height:"30px", width:"100%"}}>
                        <Line
                            data={data}
                            width={100}
                            height={50}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              legend: {
                                display: false
                              },
                              scales: {
                                xAxes: [{
                                  display: false
                                }],
                                yAxes: [{
                                  display: false
                                }]
                              },
                              elements: {
                                point: {
                                  radius: 0,
                                  hitRadius: 10,
                                  hoverRadius: 4,
                                  hoverBorderWidth: 3
                                }
                              }
                            }}
                          />
                      </div>
                    </div>
                  </button>
                  <div className="item-box">
                  hahah
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="title">
            book
            </div>
            <button className="item-button">
              <i className="fas fa-plus" />
            </button>
            <div className="item-scrollable-container">
              <div className="item-box">
              hahah
              </div>
            </div>
          </div>
        </div>
      </div>



  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Everylog</span>
        <div className="mdl-layout-spacer" />
        <nav className="mdl-navigation mdl-layout--large-screen-only">
        </nav>
      </div>
    </header>
    <main className="mdl-layout__content">
      <div className="one-column" >
        <div className="page-content">
          <section className="section--center mdl-grid">
            <div className="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone ">
              <div className="mdl-card__supporting-text">
                <h5>Weight</h5>
              </div>
              {/*
              <div className="chart-container" style={{background:'red', position: "relative", height:"250px", width:"300px"}}>
                  <canvas width="100vh" ref={chart => (this.chart = chart)}></canvas>
              </div>
              */}
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons">expand_more</i>
            </button>
          </section>
        </div>
        <div className="page-content">
          <section className="section--center mdl-grid">
            <div className="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone ">
              <div className="mdl-card__supporting-text">
                <h5>Weight 2 </h5>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons">expand_more</i>
            </button>
          </section>
        </div>
        <div className="page-content">
          <section className="section--center mdl-grid">
            <div className="mdl-card mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone ">
              <div className="mdl-card__supporting-text">
                <h5>Weight 3</h5>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i className="material-icons">expand_more</i>
            </button>
          </section>
        </div>
      </div>
    </main>
  </div>
  </div>
  )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
