import React from "react";

import CardForm, { InputType } from "../../../../component/cardform";
import { CardProps } from "../mapper";

const Book = (props: CardProps) => {
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
      property_name: "progress",
      label: props.card.setting.unit,
      focus: true,
      is_required: true,
      maximum_value: props.card.setting.amount
    },
    {
      type: InputType.TEXTAREA,
      property_name: "comment",
      label: "Comment"
    }
  ];
  const { save, clear } = props.actions;
  return <CardForm spec={spec} save={save} clear={clear} />;
};

export default Book;
