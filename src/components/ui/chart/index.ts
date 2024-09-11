import { ApexOptions } from "apexcharts";

export const DEFAULT_CHART_OPTIONS: ApexOptions = {
  chart: {
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    background: "#282828",
    foreColor: "#FAFAFA",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: "#FAFAFA",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#FAFAFA",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
  },
};
