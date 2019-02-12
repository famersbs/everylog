import React from 'react'
// import moment from 'moment'

import "./book.card.scss"

// import {colorMap} from '../../../../type'
// import {getDurationByValue} from '../../../../type'
// import {diffByDay} from '../../../../utils/time'

const Book = (props) => {
  /*
    const { setting, summary, updated_at } = props.card
    const differnecy = diffByDay(moment(), moment.unix(updated_at), getDurationByValue(setting.duration).momentDiffUnit)


    let percentage = 0
    if (summary != null && summary.progress != null) {
      percentage = Math.ceil((summary.progress / setting.amount ) * 100)
    }

    let color = colorMap.good
    if(differnecy === 1) color = colorMap.normal
    else if(differnecy > 1) color = colorMap.bad
  */
    return (
    <div className="progress-with-percentage">
        Detail View
    </div>
    )
}


  export default Book
