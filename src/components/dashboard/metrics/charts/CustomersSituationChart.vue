<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3 class="text-[#fafafa] text-md mt-2 mb-3 font-medium">
      Clientes por situação
    </h3>
    <Chart type="pie" height="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getDefaultChartOptions } from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";

const chartOptions = getDefaultChartOptions();
const series = ref([48, 72]);
chartOptions.legend!.show = true;
chartOptions.legend!.formatter = (legendName, opts) => {
  const value = opts.w.globals.series[opts.seriesIndex];
  return `<span class="legend-item-label">${legendName}: </span>
  <span class="legend-item-value">${value}</span>`;
};

chartOptions.labels = ["Em aberto", "Fechado"];
chartOptions.colors = ["#B66CFF", "#4B395E"];
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
