import React from 'react'

import PlusBtn from './card/plusbtn'
import cardRender from './card'

import './row.scss'

const Row = (props) => (
    <div className="row">
        <div className="title">
            {props.title}
        </div>
        <PlusBtn />
        <div className="item-scrollable-container">
            <div className="scrollable-vertical">
                <div className="item-list">
                    {props.cards.map(c => cardRender(c))}
                </div>
            </div>
        </div>
    </div>
  )

  export default Row
