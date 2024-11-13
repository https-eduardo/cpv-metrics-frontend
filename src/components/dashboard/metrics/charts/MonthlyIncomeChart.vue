<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3
      class="text-[#fafafa] flex items-center justify-between gap-2 text-md mt-2 mb-3 font-medium"
    >
      Mensalidades adquiridas por período <FiltersWarning period filter />
    </h3>
    <Chart
      type="area"
      height="300"
      :options="chartOptions"
      :series="series"
      ref="chart"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  getDefaultChartOptions,
  getMonthDefaultColors as getChartDefaultColors,
  getMonthCategories,
} from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";
import { ref, watch } from "vue";
import { ApiContract } from "@/types/contract";
import {
  formatMoney,
  getContractsPeriod,
  sortContractsByStartDate,
} from "@/lib/utils";
import { format } from "date-fns";
import FiltersWarning from "../../FiltersWarning.vue";

const props = defineProps({
  contracts: Array<ApiContract>,
});

const contracts = ref<ApiContract[]>(props.contracts ?? []);
const chart = ref();

const categories = ref<string[]>([]);

const chartOptions = ref(
  getDefaultChartOptions({
    tooltipFormatter: {
      formatter(val) {
        return `${formatMoney(val)}`;
      },
      title: {
        formatter() {
          return "Valor:";
        },
      },
    },
  })
);

chartOptions.value.colors = getChartDefaultColors();

const series = ref<{ data: any }[]>([{ data: [] }]);

const getSeries = () => {
  const sortedContracts = sortContractsByStartDate(contracts.value);

  const groupedIncomes = sortedContracts.reduce(
    (incomes: Record<string, number>, contract) => {
      const date = format(contract.attributes.dataInicio, "yyyy-MM");
      const currentValue = incomes[date] || 0;
      incomes[date] = currentValue + contract.attributes.mensalidade;

      return incomes;
    },
    {}
  );

  return Object.values(groupedIncomes);
};

watch(
  () => props,
  () => {
    contracts.value = props.contracts ?? [];
    categories.value = getMonthCategories(getContractsPeriod(contracts.value));
    series.value = [{ data: getSeries() }];
    chartOptions.value = {
      ...chartOptions.value,
      xaxis: { ...chartOptions.value.xaxis, categories: categories.value },
    };
  },
  { deep: true }
);
</script>

<style lang="css">
.apexcharts-canvas svg {
  @apply rounded-xl;
}
</style>
