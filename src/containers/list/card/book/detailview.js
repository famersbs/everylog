import React, { useState } from 'react'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

import "./book.card.detail.scss"

import BookView from './view'

const ORDER = { asc: "asc", desc:"desc" }
const ORDERFunc = {
  [ORDER.asc] : (a,b) => a - b,
  [ORDER.desc] : (a,b) => b - a,
}

const Book = (props) => {
  const [orderby, changeOrder] = useState(ORDER.desc)
  let logs = props.card.logs
  if(logs == null) logs = []
  logs = logs.sort((a,b) => ORDERFunc[orderby](Number(a.progress), Number(b.progress)))

  const unit = props.card.setting.unit

  return (
    <div>
        <BookView {...props} />
        <div className="logs-control-bar">
          <span>Sort by - </span>
          <button
            onClick={() => changeOrder(orderby === ORDER.asc ? ORDER.desc :ORDER.asc ) }>
            {unit} [{orderby}]
          </button>
        </div>
        <div className="logs">
          {logs.map( (log) => {
            return (
            <div key={log.id} className="log-container">
              <div className="log-header">
                <span className="progress">
                  {log.progress} {unit}
                </span>
                <span className="updated-at">
                  {moment.unix(log.updated_at).fromNow()}
                </span>
              </div>
              <div className="log-comment">
                <ReactMarkdown source={log.comment} />
              </div>
            </div>
            )
          })}
        </div>
    </div>
  )
}


  export default Book
