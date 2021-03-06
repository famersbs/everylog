import React, { SFC, useState, ReactElement } from "react";
import moment from "moment";

import "./popupstyle.scss";
import { Card } from "../../../../type";
import { BaseCardOptions, BaseCardActions } from "..";

const DISPLAY_DATE_FORMAT = "MMM DD, YYYY";

const PopupStyle: SFC<{
  card: Card;
  options: BaseCardOptions;
  actions: BaseCardActions;
  popupFooter: ReactElement;
}> = props => {
  const { card, popupFooter } = props;
  const [isOpenFooter, setOpenFooter] = useState(false);

  return (
    <div className="item-popup">
      <div className="detail-bg">
        <div className="panel-scrollable">
          <div className="contents">
            <div className="header">
              <div className="left">
                <div className="title">{props.card.setting.title}</div>
              </div>
              <button className="button" onClick={props.actions.onClickClear}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="body">
              <div className="control-bar">
                {renderControlbarItem(
                  "fa-calendar",
                  "Created",
                  moment.unix(card.created_at).format(DISPLAY_DATE_FORMAT)
                )}
                {renderControlbarItem(
                  "fa-calendar",
                  "Last updated",
                  moment.unix(card.updated_at).format(DISPLAY_DATE_FORMAT)
                )}
                {renderControlbarItem(
                  "fa-clock",
                  "Duration",
                  card.setting.duration
                )}
              </div>
              <div>{props.children}</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="hidebtn">
            <button onClick={() => setOpenFooter(!isOpenFooter)}>
              <i className={`fas fa-angle-${isOpenFooter ? "down" : "up"}`} />
            </button>
          </div>
          <div className={`contents ${isOpenFooter ? "" : "hide"}`}>
            <div className="input-container">{popupFooter}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupStyle;

function renderControlbarItem(icon: string, label: string, data: string) {
  return (
    <div className="item">
      <div>
        <div>
          <div className="icon">
            <i className={`far ${icon}`} />
          </div>
          <div className="form">
            <div className="label">{label}</div>
            <div className="date">{data}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
