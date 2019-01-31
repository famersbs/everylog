import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { create, clear, write, CardStatus } from '../../../modules/card'

import PlusBtn from '../card/plusbtn'
import cardRender from '../card'

import './row.scss'

const Row = (props) => {

  let additionalCard = null
  let selectedCard = props.card
  let onPlusBtnClick = () => props.create(props.id, props.type)

  // 여기서 card는 현재 쓰기 혹은 생성 용 카드를 말함ㅊ
  if( selectedCard.status === CardStatus.NEW && selectedCard.type === props.type  )
  {
    additionalCard = cardRender({...props.card, id: 'additional'}, selectedCard.status)
    onPlusBtnClick = props.clear
  }

  return (
    <div className={`row ${props.isSelected?'selected':''}`}>
      <div className="title">
        {props.title}
      </div>
      <PlusBtn onClick={onPlusBtnClick}/>
      <div className="item-scrollable-container">
        <div className="scrollable-vertical">
          <div className="item-list">
            {additionalCard}
            {props.cards.map(c =>
              {
                const stauts =  c.id === selectedCard.id ? selectedCard.status : CardStatus.VIEW
                const write = () => props.write(c.id, props.id, props.type)
                return cardRender(c, stauts, write)
              })
            }
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
      clear,
      write
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row)

