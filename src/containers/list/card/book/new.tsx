import React from "react";

import CardForm from "../../../../component/cardform";
import spec from "./spec";
import { CardProps } from "../mapper";

const Book = (props: CardProps) => {
  const { save, clear } = props.actions;
  return (
    <CardForm spec={spec} form={props.card.setting} save={save} clear={clear} />
  );
};

export default Book;
