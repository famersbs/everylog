import React from "react";
import { Line } from "react-chartjs-2";

import "../../../../utils/chartjs/horizonalline.plugin";
import { colorMap, Card } from "../../../../type";

import { syncDataArrayByNow, trimByNull } from "../../../../db/card/summary";
import { CardProps } from "../mapper";

const Workout = (props: CardProps) => {
  const data = getData(props.card);

  const style = {
    zIndex: 0,
    position: "relative" as "relative",
    height: "30px",
    width: "100%"
  };
  return (
    <div className="chart-container" style={style}>
      <Line height={100} data={data.data} options={data.options} />
    </div>
  );
};

export default Workout;

// 어차피 해당 카드가 업데이트 될 때만 다시 그리기 때문에 여기서 계산해도 상관 없음
const getData = (card: Card) => {
  const settings = card.setting;

  let data = [0] as Array<null | number>;
  if (card.summary != null) {
    data = trimByNull(syncDataArrayByNow(card.updated_at, card.summary.data));
  }

  // If some day has no amount, it just set zero
  data = data.reverse().map(d => (d ? d : 0));

  const current_labels = data.map(() => "");

  // Choose a color
  let graphColor = colorMap.normal;
  const today = data[data.length - 1] as number;
  if (settings.baseline <= today) graphColor = colorMap.good;
  else if (today === 0) graphColor = colorMap.bad;

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

const chartOption = (goal: number, peakData: number) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    pointDotRadius: 1,
    pointDotStrokeWidth: 4,
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
          display: false,
          ticks: {
            beginAtZero: true,
            max: Math.max(goal, peakData) + 5
          }
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
  };
};
