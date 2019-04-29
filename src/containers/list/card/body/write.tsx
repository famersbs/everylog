import React from "react";

import CardForm, { InputType } from "../../../../component/cardform";
import { CardProps } from "../mapper";

const Body = (props: CardProps) => {
  const spec = [
    {
      type: InputType.DATETIME,
      property_name: "target_date",
      label: "Target Date",
      default_set_now: true,
      is_required: true
    },
    {
      type: InputType.NUMBER,
      property_name: "amount",
      label: props.card.setting.unit,
      focus: true,
      is_required: true
    }
  ];
  const { save, clear } = props.actions;

  return <CardForm spec={spec} save={save} clear={clear} />;
};

export default Body;
