<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3 class="text-[#fafafa] text-md mt-2 mb-3 font-medium">
      Taxa de retenção por mês
    </h3>
    <Chart type="bar" height="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import {
  getDefaultChartOptions,
  getMonthDefaultCategories,
  getMonthDefaultColors,
} from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";
import { ref } from "vue";

const chartOptions = getDefaultChartOptions();

chartOptions.xaxis!.categories = getMonthDefaultCategories();

chartOptions.colors = getMonthDefaultColors();

const series = ref([
  {
    data: [200, 300, 400, 300, 500, 400, 300, 100, 156, 378, 159, 147],
  },
]);
</script>

<style lang="css">
.apexcharts-canvas svg {
  @apply rounded-xl;
}
</style>
