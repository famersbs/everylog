import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { create, clear } from '../../modules/card'

import PlusBtn from './card/plusbtn'
import cardRender from './card'

import './row.scss'

const Row = (props) => {

  let additionalCard = null
  if(props.card.row_id === props.id) {
    additionalCard = cardRender({...props.card, id: 'additional'})
  }

  return (
    <div className="row">
      <div className="title">
        {props.title}
      </div>
      <PlusBtn onClick={() => { props.card.row_id !== props.id ? props.create(props.id, props.type) : props.clear() } }/>
      <div className="item-scrollable-container">
        <div className="scrollable-vertical">
          <div className="item-list">
            {additionalCard}
            {props.cards.map(c => cardRender(c))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ card }) => ({
  card
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create,
      clear
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row)

