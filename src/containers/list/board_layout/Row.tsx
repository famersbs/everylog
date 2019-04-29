import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { create, clear, CardStatus, CARD_STATE } from "../../../modules/card";

import PlusBtn from "../card/plusbtn";
import CardComponent from "../card";

import "./row.scss";
import { Card, CardType } from "../../../type";

const Row = (props: {
  card: Card;
  cards: Array<Card>;
  type: CardType;
  title: string;
  isSelected: boolean;
  clear: () => void;
  create: (type: CardType) => void;
}) => {
  let additionalCard = null;
  let selectedCard = props.card;
  let onPlusBtnClick = null;

  // 여기서 card는 현재 쓰기 혹은 생성 용 카드를 말함
  if (
    selectedCard.status === CardStatus.NEW &&
    selectedCard.type === props.type
  ) {
    additionalCard = (
      <CardComponent
        card={{ ...props.card, id: "additional" }}
        cardStatus={selectedCard.status}
      />
    );
    onPlusBtnClick = props.clear;
  } else {
    onPlusBtnClick = () => props.create(props.type);
  }

  return (
    <div className={`row ${props.isSelected ? "selected" : ""}`}>
      <div className="title">{props.title}</div>
      <PlusBtn onClick={onPlusBtnClick} />
      <div className="item-scrollable-container">
        <div className="scrollable-vertical">
          <div className="item-list">
            {additionalCard}
            {props.cards.map(c => {
              return (
                <CardComponent
                  key={c.id}
                  card={c}
                  cardStatus={
                    c.id === selectedCard.id
                      ? (selectedCard.status as CardStatus)
                      : CardStatus.VIEW
                  }
                />
              );
            })}
            <div className="space" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ card }: { card: CARD_STATE }) => ({
  card
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  create: (type: CardType) => dispatch(create(type)),
  clear: () => dispatch(clear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row);
