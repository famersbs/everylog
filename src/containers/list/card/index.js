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

export default function render(card, cardStatus, onClickWrite, onClickArchive = () => {}, onClickEdit = () => {} ) {

  const mapedCards = CardMapper[card.type]
  if (mapedCards == null) return null

  const title = card.setting ? card.setting.title : ''
  const Card = mapedCards[cardStatus]

  // Base Card Status
  let noTitle = false, noFooter = false
  if(cardStatus === CardStatus.NEW || cardStatus === CardStatus.EDIT) {
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
      onClickEdit={onClickEdit}
    >
      <Card {...card} />
    </BaseCard>
  )
}
