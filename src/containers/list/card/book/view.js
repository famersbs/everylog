import React from 'react'
import moment from 'moment'

import "./book.card.scss"

import {colorMap} from '../../../../type'

const Book = (props) => {
    const { setting, summary, updated_at } = props
    const differnecy = moment().diff(moment.unix(updated_at), 'days')
    let percentage = 0
    if (summary != null && summary.progress != null) {
      percentage = Math.ceil((summary.progress / setting.amount ) * 100)
    }

    let color = colorMap.good
    if(differnecy === 1) color = colorMap.normal
    else if(differnecy > 1) color = colorMap.bad

    return (
    <div className="progress-with-percentage">
        <div className="progress-board" style={{ backgroundColor: `${color.backgroundColor}`}} >
            <div className="progress-bar" style={{width:`${percentage}%`, backgroundColor: `${color.borderColor}`}}/>
        </div>
        <span>
            {percentage}%
        </span>
    </div>
    )
}


  export default Book
