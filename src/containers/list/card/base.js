import React from 'react'
import moment from 'moment'

import './base.card.scss'

const Base = (props) => (
    <button className="item-box">
        <div className="title-box">
            <div className="title">
            {props.title}
            </div>
        </div>
        <div className="status">
            {props.children}
        </div>
        <div className="item-footer">
            {moment.unix(props.updated_at).fromNow()}
        </div>
    </button>
  )

  export default Base
