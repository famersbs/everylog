import React, { ReactElement, SFC } from "react";

import SummaryStyle from "./summarystyle";
import PopupStyle from "./popupstyle";

import "./base.card.scss";
import { CardProps } from "../mapper";
import { Card, CardType } from "../../../../type";
import { BaseCardOptions, BaseCardActions } from "..";

const Base: SFC<{
  card: Card;
  options: BaseCardOptions;
  actions: BaseCardActions;
  popupFooter: ReactElement;
}> = props => {
  if (props.options.isPopup) {
    return <PopupStyle {...props} />;
  } else {
    return <SummaryStyle {...props} />;
  }
};

export default Base;
