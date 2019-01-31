import React from 'react'

import { rowMappingTable } from './board_layout'

const Header = (props) => (
  <div className="page-topbar">
    <div className="icon-bg">
      <img className="icon" src="/favicon.ico" alt='logo' />
    </div>
    <div className="title">
      Everylog
    </div>
    <div className="right-menu" >
      <div className="actions">
        {Object.keys(rowMappingTable).map( k => {
          console.log("What!!! ", k, props.selected_row)
          return (
            <button
              key={k}
              className={`tag${k === props.selected_row?' active':''}`}
              onClick={() => props.onSelectRow(k)}
            >
              {rowMappingTable[k]}
            </button>
          )
        })}
        <div className="avatar"
          style={{backgroundImage: `url("${props.photoURL}")`}}>
        </div>
      </div>
    </div>
  </div>
)

export default Header




