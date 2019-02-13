import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CardStatus } from '../../../modules/card'

import * as msgbox from '../../../utils/msgbox'
import BaseCardLayout from './__basecardlayout'
import { getCardComponent } from './mapper'

import { clear, edit, write, showDetail } from '../../../modules/card'
import {
  createANewCard,
  editACard,
  addALog,
  archive,
} from '../../../db/card'

function CardLayout(props) {
  const {
    card,
    cardStatus,
  } = props

  // Get Current Card Component
  const CardComponent = getCardComponent(card, cardStatus)
  const FooterCardComponent = getCardComponent(card, CardStatus.WRITE)

  return (
    <BaseCardLayout
      key={card.id} card={card} status={cardStatus}
      options={getBaseCardOptions(cardStatus)}
      actions={getBaseCardActions(props)}
      popupFooter={(
        <FooterCardComponent
          card={card}
          actions={getCardActions({...props, cardStatus: CardStatus.WRITE})} />
      )}  //이게 좀 너무 복잡하다... 흠.. 어떻게 해야 할까?
    >
      <CardComponent card={card} actions={getCardActions(props)} />
    </BaseCardLayout>
  )
}

const mapStateToProps = ({ card, auth }, ownProps) => {
  return {
    uid: auth.uid,
    card: (card.id === ownProps.card.id? {...ownProps.card, ...card} : ownProps.card)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clear,// 이 부분을 global 하게 바꾸면, map 하는 부분이 없어진다.
      write,
      edit,
      showDetail,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLayout)

//////////////////////////////////////////////////////////////////
// private functions
const getBaseCardOptions = (status) => {
  const baseOptions = { noTitle: false, noFooter: false, isPopup: false }
  switch(status) {
    case CardStatus.NEW:
    case CardStatus.EDIT:
      return { ...baseOptions, noTitle: true, noFooter: true }
    case CardStatus.WRITE:
      return { ...baseOptions, noTitle: true, noFooter: true }
    case CardStatus.DETAILVIEW:
      return { ...baseOptions, isPopup: true }
    default:
      return baseOptions
  }
}

const getBaseCardActions = ({
  card,
  clear,
  write,
  edit,
  showDetail,
}) =>  ({
  onClickWrite: () => write(card.id, card.type),
  onClickArchive:  () => {
    msgbox.confirm('Archive card', `Do you want to archive [ ${card.setting.title} ] card?`)
    .then(r => r.value === true ? archive(card.id) : null )
  },
  onClickEdit : () => edit(card.id, card.setting, card.type),
  onClickDetailView: () => showDetail(card.id, card.type),
  onClickClear : clear,
})

const getCardActions = (props) => {
  const baseActions = {
    clear: props.clear,
    save: null,
  }

  switch(props.cardStatus) {
    case CardStatus.NEW:
      return {...baseActions, save: (form) => {
        createANewCard(props.uid, props.card.type, form)
        .then(() => props.clear())
      }}
    case CardStatus.EDIT:
      return {...baseActions, save: (form) => {
        editACard(props.card.id, form)
        .then(() => props.clear())
      }}
    case CardStatus.WRITE:
      return {...baseActions, save: (form) => {
        addALog(props.uid, props.card, form)
        .then(() => props.clear())
      }}
    default:
      return baseActions
  }
}
