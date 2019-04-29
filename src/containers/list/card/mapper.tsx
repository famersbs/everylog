import React, { JSXElementConstructor } from "react";
import { CardType, Card, CardStatus } from "../../../type";

import WorkOutCard from "./workout";
import NoteCard from "./note";
import BookCard from "./book";
import BodyCard from "./body";

const CardMapper: {
  [key: string]: {
    [type: number]: any; // It is react component
  };
} = {
  [CardType.WORKOUT]: WorkOutCard,
  [CardType.BOOK]: BookCard,
  [CardType.NOTE]: NoteCard,
  [CardType.BODY]: BodyCard
};

export interface CardProps {
  card: Card;
  actions: {
    clear: () => void;
    save: (from: any) => Promise<any>;
  };
}
export function getCardComponent(
  card: Card,
  cardStatus: CardStatus
): React.SFC<CardProps> {
  const mapedCardsComponent = CardMapper[card.type as string];
  if (mapedCardsComponent == null) return (props: CardProps) => <div />;

  return mapedCardsComponent[cardStatus];
}
