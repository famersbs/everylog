import React from 'react'
import { CardType } from '../../../type'

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

export function getCardComponent(card, cardStatus) {
  const mapedCardsComponent = CardMapper[card.type]
  if (mapedCardsComponent == null) return (<div></div>)

  return mapedCardsComponent[cardStatus]
}
