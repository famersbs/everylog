import React from 'react'
import moment from 'moment'

import './base.card.scss'

const Base = (props) => {
  return (
    <div className="item-box" >
      {props.noTitle?null:(
        <div className="title-box">
          <div className="title">
            {props.title}
          </div>
          <button className="button" onClick={props.onClickArchive}>
            <i className="fas fa-archive" />
          </button>
        </div>
      )}
      <div className="status">
        {props.children}
      </div>
      {props.noFooter?null:(
        <div className="item-footer">
          <div className="left" >
            <button onClick={(e) => {
              props.onClickWrite()
              e.stopPropagation()
            } }>
              <i className="fas fa-pen" />
            </button>
          </div>
          <div className="right">
            {moment.unix(props.updated_at).fromNow()}
          </div>
        </div>
      )}
    </div>
  )
}

  export default Base
