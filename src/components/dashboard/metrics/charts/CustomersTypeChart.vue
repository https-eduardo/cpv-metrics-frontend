<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3 class="text-[#fafafa] text-md mt-2 mb-3 font-medium">
      Clientes por tipo
    </h3>
    <Chart type="pie" height="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getDefaultChartOptions } from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";

const chartOptions = getDefaultChartOptions();
const series = ref([10, 34, 30, 26]);
chartOptions.legend!.show = true;
chartOptions.legend!.formatter = (legendName, opts) => {
  const value = opts.w.globals.series[opts.seriesIndex];
  return `<span class="legend-item-label">${legendName}: </span>
  <span class="legend-item-value">${value}%</span>`;
};

chartOptions.labels = ["Tipo S", "Tipo A", "Tipo B", "Tipo C"];
chartOptions.colors = ["#ED4FFF", "#B66CFF", "#503BCB", "#9D44FC"];
chartOptions.stroke = { colors: ["#CACACA"], width: 1 };
</script>

<style lang="css">
.apexcharts-canvas svg {
  @apply rounded-xl;
}
.apexcharts-legend {
  @apply w-[40%];
}
</style>
