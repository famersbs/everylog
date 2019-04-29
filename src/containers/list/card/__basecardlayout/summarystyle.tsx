import React, { SFC, ReactNode, ReactElement } from "react";
import moment from "moment";
import { Card } from "../../../../type";
import { BaseCardOptions, BaseCardActions } from "..";

const SummaryStyle: SFC<{
  card: Card;
  options: BaseCardOptions;
  actions: BaseCardActions;
  popupFooter: ReactElement;
}> = props => {
  const { card, options, actions } = props;
  const title = card.setting ? card.setting.title : "";

  return (
    <div className="item-box">
      {options.noTitle ? null : (
        <div className="title-box">
          <div className="title">{title}</div>
          <button className="button" onClick={actions.onClickEdit}>
            <i className="fas fa-edit" />
          </button>
          <button className="button" onClick={actions.onClickArchive}>
            <i className="fas fa-archive" />
          </button>
          <button className="button" onClick={actions.onClickDetailView}>
            <i className="fas fa-external-link-square-alt" />
          </button>
        </div>
      )}
      <div className="status">{props.children}</div>
      {options.noFooter ? null : (
        <div className="item-footer">
          <div className="left">
            <button
              onClick={e => {
                actions.onClickWrite();
                e.stopPropagation();
              }}
            >
              <i className="fas fa-pen" />
            </button>
          </div>
          <div className="right">{moment.unix(card.updated_at).fromNow()}</div>
        </div>
      )}
    </div>
  );
};

export default SummaryStyle;
