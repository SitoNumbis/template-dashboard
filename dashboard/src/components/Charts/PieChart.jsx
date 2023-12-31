import React, { useMemo, useState, useEffect } from "react";

export default function PieChart({ colors, labels, series }) {
  const total = useMemo(() => {
    let count = 0;
    series.forEach((co) => (count += co));
    return count;
  }, [series]);

  const [rChart, setRChart] = useState();

  useEffect(() => {
    if (rChart) rChart?.destroy();
    let options = {
      series,
      colors,
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
        toolbar: {
          show: true,
        },
      },
      stroke: {
        colors: ["#00000000"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels,
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };

    if (
      document.getElementById("pie-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(
        document.getElementById("pie-chart"),
        options
      );
      chart.render();
      setRChart(chart);
    }
    return () => {
      if (rChart) rChart?.destroy();
    };
  }, [series, colors, labels]);

  return <div className="py-4" id="pie-chart"></div>;
}

PieChart.defaultProps = {
  series: [52.8, 26.8, 20.4],
  colors: ["#1C64F2", "#16BDCA", "#9061F9"],
  labels: ["Direct", "Organic search", "Referrals"],
};

PieChart.propTypes = {};
