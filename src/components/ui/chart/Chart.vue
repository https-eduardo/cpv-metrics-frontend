<template>
  <VueApexChart />
</template>

<script setup lang="ts">
import VueApexChart from "vue3-apexcharts";
</script>

<style lang="css">
.apexcharts-legend-series {
  @apply gap-1;
}

.legend-item-label {
  @apply text-base !important;
  @apply text-[#CACACA] !important;
  @apply font-medium !important;
}
.legend-item-value {
  @apply text-base !important;
  @apply font-medium !important;
  @apply text-[#FAFAFA] !important;
}
</style>
