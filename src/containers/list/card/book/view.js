import React from 'react'
import moment from 'moment'

import "./book.card.scss"

import {colorMap} from '../../../../type'

const Book = (props) => {
    const { summary, updated_at } = props
    const differnecy = moment().diff(moment.unix(updated_at), 'days')

    let color = colorMap.good
    if(differnecy === 1) color = colorMap.normal
    else if(differnecy > 1) color = colorMap.bad

    return (
    <div className="progress-with-percentage">
        <div className="progress-board" style={{ backgroundColor: `${color.backgroundColor}`}} >
            <div className="progress-bar" style={{width:`${summary.progress}%`, backgroundColor: `${color.borderColor}`}}/>
        </div>
        <span>
            {summary.progress}%
        </span>
    </div>
    )
}


  export default Book
