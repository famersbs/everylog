import React from 'react'

import { CardType } from '../../../modules/card'

import Row from './Row'

export const rowMappingTable = {
  [CardType.BODY]:    "Body",
  [CardType.WORKOUT]: "Workout",
  [CardType.BOOK]:    "Book",
  [CardType.NOTE]:    "Note",
}

const Layout = (props) => {
  const cards = Object.keys(props.cards).map( k => props.cards[k] )
  const selected_row = props.selected_row == null? CardType.BODY : props.selected_row

  return (
    <div className="board">
      {Object.keys(rowMappingTable).map( (type, idx) => {
        const filteredCards = cards
          .filter( c => c.type === type )
          .sort((a,b) => b.created_at - a.created_at)
        return (
          <Row
            key={idx}
            id={idx}
            title={rowMappingTable[type]}
            cards={filteredCards}
            type={type}
            isSelected={type === selected_row}
          />
        )
      })}
    </div>
  )
}

export default Layout
