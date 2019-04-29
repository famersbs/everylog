import React from "react";

const PlusBtn = (props: { onClick: () => void }) => (
  <button className="item-button" onClick={props.onClick}>
    <i className="fas fa-plus" />
  </button>
);

export default PlusBtn;
