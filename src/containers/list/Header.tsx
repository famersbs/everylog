import React from "react";

import { rowMappingTable } from "./board_layout";
import { CardType } from "../../type";

const Header = (props: {
  selected_row: CardType;
  photoURL: string;
  onSelectRow: (cardType: CardType) => void;
}) => {
  return (
    <div className="page-topbar">
      <div className="icon-bg">
        <img className="icon" src="/favicon.ico" alt="logo" />
      </div>
      <div className="title">Everylog</div>
      <div className="right-menu">
        <div className="actions">
          {Object.keys(rowMappingTable).map((k: string) => {
            return (
              <button
                key={k}
                className={`tag${k === props.selected_row ? " active" : ""}`}
                onClick={() => props.onSelectRow(k as CardType)}
              >
                {rowMappingTable[k as string]}
              </button>
            );
          })}
          <div
            className="avatar"
            style={{ backgroundImage: `url("${props.photoURL}")` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
