import React from "react";
import moment from "moment";

import "./book.card.scss";

import { colorMap } from "../../../../type";
import { getDurationByValue } from "../../../../type";
import { diffByDay } from "../../../../utils/time";
import { CardProps } from "../mapper";

const Book = (props: CardProps) => {
  const { setting, summary, updated_at } = props.card;
  const differnecy = diffByDay(
    moment(),
    moment.unix(updated_at),
    getDurationByValue(setting.duration).momentDiffUnit
  );

  let percentage = 0;
  if (summary != null && summary.progress != null) {
    percentage = Math.ceil((summary.progress / setting.amount) * 100);
  }

  let color = colorMap.good;
  if (differnecy === 1) color = colorMap.normal;
  else if (differnecy > 1) color = colorMap.bad;

  return (
    <div className="progress-with-percentage">
      <div
        className="progress-board"
        style={{ backgroundColor: `${color.backgroundColor}` }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: `${color.borderColor}`
          }}
        />
      </div>
      <span>{percentage}%</span>
    </div>
  );
};

export default Book;
