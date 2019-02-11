import React from 'react'
import moment from 'moment'

import './popupstyle.scss'

const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY'

const PopupStyle = (props) => {
  const { card, children } = props
  return (
    <div className="item-popup">
      <div className="detail-bg">
        <div className="panel-scrollable">
          <div className="contents">
            <div className="header">
              <div className="left">
                <div className="title">{props.card.setting.title}</div>
              </div>
              <button className="button" onClick={props.actions.onClickClear}>
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
                        <div className="date">{moment.unix(card.updated_at).format(DISPLAY_DATE_FORMAT)}</div>
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
                        <div className="date">{card.setting.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="hidebtn">
            <button>
              <i className="fas fa-angle-up"></i>
            </button>
          </div>
          <div className={"contents"}>
            <div className="input-container">
              footer input
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupStyle
