import React from "react";
import Plot from "react-plotly.js";

const BarChart = ({ data }) => {
  const chartData = [
    {
      x: data.map((row) => row.title),
      y: data.map((row) => row.stock),
      type: "bar",
      marker: {
        color: "#40b0fd",
      },
    },
  ];

  return (
    <Plot
      data={chartData}
      alt="Bar chart representing the selected data"
      role="presentation"
    />
  );
};

export default BarChart;
