import React from 'react'
import moment from 'moment'

import './base.card.scss'

const Base = (props) => {
  return (
    <div className="item-box" >
      {props.noTitle?null:(
        <div className="title-box" onClick={() => console.log('test 222')}>
          <div className="title">
            {props.title}
          </div>
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
