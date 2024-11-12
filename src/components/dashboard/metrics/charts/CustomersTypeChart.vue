<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3
      class="text-[#fafafa] flex items-center justify-between gap-2 text-md mt-2 mb-3 font-medium"
    >
      Clientes por tipo <FiltersWarning period filter />
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
import { ref, watch } from "vue";
import { getDefaultChartOptions } from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";
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
  const value = opts.w.globals.series[opts.seriesIndex];
  return `<span class="legend-item-label">${legendName}: </span>
  <span class="legend-item-value">${value}%</span>`;
};

chartOptions.labels = ["Tipo S", "Tipo A", "Tipo B", "Tipo C"];
chartOptions.colors = ["#ED4FFF", "#B66CFF", "#503BCB", "#9D44FC"];
chartOptions.stroke = { colors: ["#CACACA"], width: 1 };

const updateCustomerTierPercent = () => {
  const totalCustomers = customers.value.length;
  const customersCountByTier = customers.value.reduce(
    (tiers: Record<string, number>, customer) => {
      const tier = customer.attributes.classificacao;
      const currentValue = tiers[tier] ?? 0;

      tiers[tier] = currentValue + 1;

      return tiers;
    },
    {}
  );

  series.value[0] = Math.round(
    (customersCountByTier["S"] / totalCustomers) * 100
  );
  series.value[1] = Math.round(
    (customersCountByTier["A"] / totalCustomers) * 100
  );
  series.value[2] = Math.round(
    (customersCountByTier["B"] / totalCustomers) * 100
  );
  series.value[3] = Math.round(
    (customersCountByTier["C"] / totalCustomers) * 100
  );
};

watch(
  props,
  () => {
    customers.value = props.customers ?? [];
    updateCustomerTierPercent();
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
