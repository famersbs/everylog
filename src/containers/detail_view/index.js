import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Line } from "react-chartjs-2";

import BookCard from "../list/card/book";

import "./css.scss";
import { CardStatus } from "../../modules/card";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "pull up per day",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class DetailView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showFooter: true
    }
  }

  render() {
    const WriteCard = BookCard[CardStatus.WRITE];

    return (
      <div className="detail-bg">
        <div className="panel-scrollable">
          <div className="contents">
            <div className="header">
              <div className="left">
                <div className="title">Book</div>
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
              <div
                className="chart-container"
                style={{
                  zIndex: "0",
                  position: "relative",
                  minHeight: "150px",
                  height: "50px",
                  width: "100%"
                }}
              >
                <Line
                  data={data}
                  options={{
                    legend: {
                      display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </div>
              <div className="comments">
                <div>test</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="hidebtn">
            <button onClick={() => this.setState({showFooter: !this.state.showFooter})}>
              {this.state.showFooter ?
              (<i className="fas fa-angle-down"></i>):
              (<i className="fas fa-angle-up"></i>)
              }
            </button>
          </div>
          <div className={this.state.showFooter?"contents": "contents hide"}>
            <div className="input-container">
              <WriteCard setting={{ unit: "page" }} />
            </div>
          </div>
        </div>
      </div>
    )
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);
