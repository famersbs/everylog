import { Chart } from "react-chartjs-2";

const horizonalLinePlugin = {
  afterDraw: function(chartInstance) {
    let hlines = chartInstance.options.horizontalLine;
    if (hlines) {
      let yScale = chartInstance.scales["y-axis-0"];
      let canvas = chartInstance.chart;
      let ctx = canvas.ctx;

      hlines.forEach(line => {
        if (!line.y) return;
        let yValue = yScale.getPixelForValue(line.y);

        let style = "rgba(169,169,169, .6)";
        if (line.style) style = line.style;

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, yValue);
        ctx.lineTo(canvas.width, yValue);
        ctx.strokeStyle = style;
        ctx.stroke();

        if (line.text) {
          ctx.fillStyle = style;
          ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
        }
      });
    }
  }
};
Chart.pluginService.register(horizonalLinePlugin);
