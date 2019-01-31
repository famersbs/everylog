import React from 'react'

import { CardType } from '../../../modules/card'

import Row from './Row'

const rowMappingTable = {
  [CardType.BODY]:    "Body",
  [CardType.WORKOUT]: "Workout",
  [CardType.BOOK]:    "Book",
  [CardType.TEXT]:    "Note",
}

const Layout = (props) => {
  const cards = Object.keys(props.cards).map( k => props.cards[k] )

  return (
    <div className="board">
      {Object.keys(rowMappingTable).map( (type, idx) => {
        const filteredCards = cards
          .filter( c => c.type === type )
          .sort((a,b) => b.updated_at - a.updated_at)
        return (
          <Row
            key={idx}
            id={idx}
            title={rowMappingTable[type]}
            cards={filteredCards}
            type={type}
          />
        )
      })}
    </div>
  )
}

export default Layout
