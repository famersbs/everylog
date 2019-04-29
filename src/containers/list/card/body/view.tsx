import React from "react";
import { Line } from "react-chartjs-2";

import "../../../../utils/chartjs/horizonalline.plugin";
import { colorMap, Card } from "../../../../type";

import { syncDataArrayByNow, trimByNull } from "../../../../db/card/summary";
import { CardProps } from "../mapper";

const Body = (props: CardProps) => {
  const data = getData(props.card);
  return (
    <div
      className="chart-container"
      style={{
        zIndex: 0,
        position: "relative" as "relative",
        height: "30px",
        width: "100%"
      }}
    >
      <Line data={data.data} options={data.options} />
    </div>
  );
};
export default Body;

// 어차피 해당 카드가 업데이트 될 때만 다시 그리기 때문에 여기서 계산해도 상관 없음
const getData = (card: Card) => {
  const settings = card.setting;
  let data = [0] as Array<null | number>;
  if (card.summary != null) {
    data = trimByNull(syncDataArrayByNow(card.updated_at, card.summary.data));
  }

  // If some day has no amount, it should be use previous amount
  let previousAmount = 0;
  data = data.reverse().map((d, i) => {
    if (d == null) {
      if (i === data.length - 1) return 0;
      return previousAmount;
    }
    return (previousAmount = d);
  });

  const current_labels = data.map(() => "");

  // Choose a color
  let graphColor = colorMap.good;
  const today = data[data.length - 1];
  if (today === 0) graphColor = colorMap.bad;
  else if (data.length >= 2) {
    if (
      Math.abs((today as number) - settings.baseline) >
      Math.abs((data[1] as number) - settings.baseline)
    ) {
      graphColor = colorMap.normal;
    }
  }

  return {
    options: chartOption(settings.baseline, data.reduce(
      (p, c): number => Math.max(p === null ? 0 : p, c === null ? 0 : c),
      -1
    ) as number),
    data: {
      labels: current_labels,
      datasets: [
        {
          borderWidth: 2,
          data: data,
          ...graphColor,

          pointDotRadius: 1,
          pointColor: "rgba(87, 167, 134, 1)",
          pointStrokeColor: "rgba(255, 255, 255, 0)",
          pointHighlightFill: "rgba(87, 167, 134, 0.7)",
          pointHighlightStroke: "rgba(87, 167, 134, 1)"
        }
      ]
    }
  };
};

const chartOption = (goal: number, peakData: number) => ({
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      title: () => []
    }
  },
  scales: {
    xAxes: [{ display: false }],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {},
  horizontalLine: [
    {
      y: goal,
      style: "rgba(0,255,0,0.4)"
    }
  ]
});
