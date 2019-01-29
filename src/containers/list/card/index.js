import React from 'react'

import {CardType, CardStatus} from '../../../modules/card'

import BaseCard from './base'
import WorkOutCard from './workout'
import TextCard from './text'
import BookCard from './book'
import BodyCard from './body'

const CardMapper = {
  [CardType.WORKOUT]: WorkOutCard,
  [CardType.BOOK]: BookCard,
  [CardType.TEXT]: TextCard,
  [CardType.BODY]: BodyCard,
}

function getCardTypeByStatus(status) {
  return status === CardStatus.WRITE ? CardStatus.WRITE :
         status === CardStatus.NEW ? CardStatus.NEW :
         CardStatus.VIEW
}

export default function render(card) {

  const mapedCards = CardMapper[card.type]
  if (mapedCards == null) return null

  const targetCard = getCardTypeByStatus(card.status)


  const Card = mapedCards[targetCard]
  let noTitle = false, noFooter = false
  if(card.status === CardStatus.NEW) {
    noTitle = true
    noFooter = true
  }

  return (
    <BaseCard
      key={card.id}
      title={card.title}
      updated_at={card.updated_at}
      status={card.status}
      noTitle={noTitle}
      noFooter={noFooter}
    >
      <Card {...card} />
    </BaseCard>
  )
}
