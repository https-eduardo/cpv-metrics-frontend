<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3
      class="text-[#fafafa] flex items-center justify-between gap-2 text-md mt-2 mb-3 font-medium"
    >
      Clientes por situação <FiltersWarning period filter />
    </h3>
    <Chart
      v-if="customers.length > 0"
      type="pie"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getDefaultChartOptions } from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";
import { watch } from "vue";
import { ApiCustomer } from "@/types/customer";
import FiltersWarning from "../../FiltersWarning.vue";

const props = defineProps({
  customers: Array<ApiCustomer>,
});

const customers = ref(props.customers ?? []);

const chartOptions = getDefaultChartOptions();
const series = ref<number[]>([]);
chartOptions.legend!.show = true;
chartOptions.legend!.formatter = (legendName, opts) => {
  const value = opts.w.globals.series.at(opts.seriesIndex);
  return `<span class="legend-item-label">${legendName}: </span>
  <span class="legend-item-value">${value}</span>`;
};

chartOptions.labels = ["Em aberto", "Fechado"];
chartOptions.colors = ["#B66CFF", "#4B395E"];
chartOptions.stroke = { colors: ["#CACACA"], width: 1 };

const updateCustomerSituationPercent = () => {
  const totalCustomers = customers.value.length;
  const lostCustomers = customers.value.filter(
    (customer) => customer.attributes.status === "perdido"
  ).length;
  const activeCustomers = totalCustomers - lostCustomers;

  series.value[0] = activeCustomers;
  series.value[1] = lostCustomers;
};

watch(
  props,
  () => {
    customers.value = props.customers ?? [];
    updateCustomerSituationPercent();
  },
  { deep: true }
);
</script>

<style lang="css">
.apexcharts-canvas svg {
  @apply rounded-xl;
}
.apexcharts-legend {
  @apply w-[40%];
}
</style>
