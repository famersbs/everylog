import React from 'react'

import {CardType, CardStatus} from '../../../modules/card'

import BaseCard from './base'
import WorkOutCard from './workout'
import NoteCard from './note'
import BookCard from './book'
import BodyCard from './body'

const CardMapper = {
  [CardType.WORKOUT]: WorkOutCard,
  [CardType.BOOK]: BookCard,
  [CardType.NOTE]: NoteCard,
  [CardType.BODY]: BodyCard,
}

function getCardTypeByStatus(status) {
  return status === CardStatus.WRITE ? CardStatus.WRITE :
         status === CardStatus.NEW ? CardStatus.NEW :
         CardStatus.VIEW
}

export default function render(card, cardStatus, onClickWrite, onClickArchive = () => {} ) {

  const mapedCards = CardMapper[card.type]
  if (mapedCards == null) return null

  const targetCard = getCardTypeByStatus(cardStatus)

  const title = card.setting ? card.setting.title : ''

  const Card = mapedCards[targetCard]

  // Base Card Status
  let noTitle = false, noFooter = false
  if(cardStatus === CardStatus.NEW) {
    noTitle = true
    noFooter = true
  } else if(cardStatus === CardStatus.WRITE) {
    noFooter = true
  }

  return (
    <BaseCard
      key={card.id}
      title={title}
      updated_at={card.updated_at}
      status={cardStatus}
      noTitle={noTitle}
      noFooter={noFooter}
      onClickWrite={onClickWrite}
      onClickArchive={onClickArchive}
    >
      <Card {...card} />
    </BaseCard>
  )
}
