import { ApexOptions } from "apexcharts";
import { format } from "date-fns";
import { cloneDeep } from "lodash";

interface AdditionalChartOptions {
  tooltipFormatter?: ApexTooltipY;
}

const MONTH_DEFAULT_COLORS = [
  "#a613ff",
  "#9d16fa",
  "#9319f5",
  "#8a1bef",
  "#811cea",
  "#781de4",
  "#6e1edf",
  "#651fd9",
  "#5c1fd4",
  "#531fce",
  "#491ec8",
  "#3f1ec2",
];

const DEFAULT_CHART_OPTIONS: ApexOptions = {
  chart: {
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    background: "#2D2D2D",
    foreColor: "#FAFAFA",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
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
  tooltip: {
    y: {
      formatter: function (val) {
        return val.toString();
      },
      title: {
        formatter: function () {
          return "Valor:";
        },
      },
    },
  },
};

export function getDefaultChartOptions(options?: AdditionalChartOptions) {
  const tooltipFormatter = options?.tooltipFormatter;
  const defaultChartOptions = cloneDeep(DEFAULT_CHART_OPTIONS);

  if (tooltipFormatter) defaultChartOptions.tooltip!.y = tooltipFormatter;

  return defaultChartOptions;
}

export function getMonthCategories(months: Date[]) {
  return months.map((date) => format(date, "LLL, yyyy"));
}
export function getMonthDefaultColors() {
  return cloneDeep(MONTH_DEFAULT_COLORS);
}
