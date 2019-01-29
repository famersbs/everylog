import React from 'react'
import moment from 'moment'

import './base.card.scss'

const Base = (props) => {

  return (
    <button className="item-box">
      {props.noTitle?null:(
        <div className="title-box">
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
          {moment.unix(props.updated_at).fromNow()}
        </div>
      )}

    </button>
  )
}

  export default Base
