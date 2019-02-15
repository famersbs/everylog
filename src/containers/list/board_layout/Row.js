import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { create, CardStatus } from '../../../modules/card'

import PlusBtn from '../card/plusbtn'
import Card from '../card'

import './row.scss'

const Row = (props) => {

  let additionalCard = null
  let selectedCard = props.card
  let onPlusBtnClick = null

  // 여기서 card는 현재 쓰기 혹은 생성 용 카드를 말함
  if( selectedCard.status === CardStatus.NEW && selectedCard.type === props.type  )
  {
    additionalCard = <Card card={{...props.card, id: 'additional' }} cardStatus={selectedCard.status} />
    onPlusBtnClick = props.clear
  } else {
    onPlusBtnClick = () => props.create(props.type)
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
                return <Card
                  key={c.id}
                  card={c}
                  cardStatus={c.id === selectedCard.id ? selectedCard.status : CardStatus.VIEW}
                />
              })
            }
            <div className="space" ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({card}) => (
  {
    card,
  }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row)

