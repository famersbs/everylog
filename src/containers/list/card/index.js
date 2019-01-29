import React from 'react'

import {CardType} from '../../../modules/list'

import BaseCard from './base'
import WorkOutCard from './workout'
import TextCard from './text'
import BookCard from './book'

export default function render(card) {
    let Card = null

    switch(card.type){
        case CardType.WORKOUT:
        Card = WorkOutCard;
        break;
        case CardType.TEXT:
        Card = TextCard;
        break;
        case CardType.BOOK:
        Card = BookCard;
        break;
        default:
        return null
    }

    return (
        <BaseCard key={card.id} title={card.title} updated_at={card.updated_at} >
            <Card {...card} />
        </BaseCard>
    )
}
