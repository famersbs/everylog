import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { CardStatus, CARD_STATE } from "../../../modules/card";

import * as msgbox from "../../../utils/msgbox";
import BaseCardLayout from "./__basecardlayout";
import { getCardComponent } from "./mapper";

import { clear, edit, write, showDetail } from "../../../modules/card";
import { createANewCard, editACard, addALog, archive } from "../../../db/card";
import { Card, CardType } from "../../../type";
import { string } from "prop-types";

interface CardLayoutProps {
  uid: string | null | undefined;
  card: Card;
  cardStatus: CardStatus;
  clear: () => void;
  write: (id: string, type: CardType) => void;
  edit: (id: string, type: CardType) => void;
  showDetail: (id: string, type: CardType) => void;
}

function CardLayout(props: CardLayoutProps) {
  const { card, cardStatus } = props;

  // Get Current Card Component
  const CardComponent = getCardComponent(card, cardStatus);
  const FooterCardComponent = getCardComponent(card, CardStatus.WRITE);

  return (
    <BaseCardLayout
      key={card.id}
      card={card}
      options={getBaseCardOptions(cardStatus)}
      actions={getBaseCardActions(props)}
      popupFooter={
        <FooterCardComponent
          card={card}
          actions={getCardActions(
            { ...props, cardStatus: CardStatus.WRITE },
            false
          )}
        />
      } //이게 좀 너무 복잡하다... 흠.. 어떻게 해야 할까?
    >
      <CardComponent card={card} actions={getCardActions(props)} />
    </BaseCardLayout>
  );
}

const mapStateToProps = (
  { card, auth }: { card: CARD_STATE; auth: AUTH_STATE },
  ownProps: {
    card: Card;
  }
) => {
  return {
    uid: auth.uid,
    card:
      card.id === ownProps.card.id
        ? { ...ownProps.card, ...card }
        : ownProps.card
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  clear: () => dispatch(clear()),
  write: (id: string, type: CardType) => dispatch(write(id, type)),
  edit: (id: string, type: CardType) => dispatch(edit(id, null, type)),
  showDetail: (id: string, type: CardType) => dispatch(showDetail(id, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLayout);

//////////////////////////////////////////////////////////////////
// private functions
export type BaseCardOptions = {
  noTitle: boolean;
  noFooter: boolean;
  isPopup: boolean;
};
const getBaseCardOptions = (status: CardStatus): BaseCardOptions => {
  const baseOptions = { noTitle: false, noFooter: false, isPopup: false };
  switch (status) {
    case CardStatus.NEW:
    case CardStatus.EDIT:
      return { ...baseOptions, noTitle: true, noFooter: true };
    case CardStatus.WRITE:
      return { ...baseOptions, noTitle: true, noFooter: true };
    case CardStatus.DETAILVIEW:
      return { ...baseOptions, isPopup: true };
    default:
      return baseOptions;
  }
};
export type BaseCardActions = {
  onClickWrite: () => void;
  onClickDetailView: () => void;
  onClickArchive: () => void;
  onClickEdit: () => void;
  onClickClear: () => void;
};
const getBaseCardActions = ({
  card,
  clear,
  write,
  edit,
  showDetail
}: CardLayoutProps): BaseCardActions => ({
  onClickWrite: () => write(card.id, card.type),
  onClickArchive: () => {
    msgbox
      .confirm(
        "Archive card",
        `Do you want to archive [ ${card.setting.title} ] card?`
      )
      .then(r => {
        if (r.value === true) archive(card.id);
      });
  },
  onClickEdit: () => edit(card.id, card.type),
  onClickDetailView: () => showDetail(card.id, card.type),
  onClickClear: clear
});

const getCardActions = (props: CardLayoutProps, callClearAfterSave = true) => {
  type saveFunc = (from: any) => Promise<any>;
  let _save: saveFunc = () => Promise.reject();

  switch (props.cardStatus) {
    case CardStatus.NEW:
      _save = form =>
        createANewCard(props.uid as string, props.card.type, form);
      break;
    case CardStatus.EDIT:
      _save = form => editACard(props.card.id, form);
      break;
    case CardStatus.WRITE:
      _save = form => addALog(props.uid as string, props.card, form);
      break;
    default:
      _save = () => Promise.resolve(true);
  }

  const save: saveFunc = form =>
    _save(form).then(() => (callClearAfterSave ? props.clear() : true));

  return {
    clear: props.clear,
    save
  };
};
