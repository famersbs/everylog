import React from 'react'

import SummaryStyle from './summarystyle'
import PopupStyle from './popupstyle'

import './base.card.scss'

const Base = (props) => {
  if(props.options.isPopup) {
    return <PopupStyle {...props} />
  } else {
    return <SummaryStyle {...props} />
  }
}

  export default Base
