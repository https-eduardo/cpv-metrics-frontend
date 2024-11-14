<template>
  <div
    class="py-2 px-6 bg-[#282828] rounded-md border-[#2D2D2D] border-[1px] w-full"
  >
    <h3
      class="text-[#fafafa] flex items-center justify-between gap-2 text-md mt-2 mb-3 font-medium"
    >
      Taxa de retenção por mês <FiltersWarning filter />
    </h3>
    <Chart type="line" height="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import {
  getDefaultChartOptions,
  getMonthCategories,
  getMonthDefaultColors,
} from "@/components/ui/chart";
import Chart from "../../../ui/chart/Chart.vue";
import { ref, watch } from "vue";
import { getContractsFromCustomer, getContractsPeriod } from "@/lib/utils";
import { ApiCustomer } from "@/types/customer";
import { ApiContract } from "@/types/contract";
import { isSameMonth, isWithinInterval, lastDayOfMonth } from "date-fns";
import FiltersWarning from "../../FiltersWarning.vue";

const props = defineProps({
  customers: Array<ApiCustomer>,
});

const customers = ref<ApiCustomer[]>([]);
const contracts = ref<ApiContract[]>([]);

const categories = ref<string[]>([]);

const chartOptions = ref(
  getDefaultChartOptions({
    tooltipFormatter: {
      formatter(val) {
        return `${val.toFixed(0)}%`;
      },
      title: {
        formatter() {
          return "Valor:";
        },
      },
    },
  })
);

chartOptions.value.colors = getMonthDefaultColors();

const series = ref<{ data: any }[]>([{ data: [] }]);

const getSeries = () => {
  const dates = getContractsPeriod(contracts.value);

  return dates.reduce((retentions: number[], date) => {
    const newCustomersCount = contracts.value.filter((contract) =>
      isSameMonth(new Date(contract.attributes.dataInicio), date)
    ).length;
    const startCustomersCount = contracts.value.filter((contract) =>
      isWithinInterval(date, {
        start: new Date(contract.attributes.dataInicio),
        end: new Date(contract.attributes.dataFinal),
      })
    ).length;
    const endDate = lastDayOfMonth(date);

    const endCustomersCount = contracts.value.filter((contract) =>
      isWithinInterval(endDate, {
        start: new Date(contract.attributes.dataInicio),
        end: new Date(contract.attributes.dataFinal),
      })
    ).length;

    const retention = Math.min(
      Math.round(
        ((endCustomersCount - newCustomersCount) / startCustomersCount) * 100
      ),
      100
    );

    retentions.push(retention);

    return retentions;
  }, []);
};

watch(
  () => props,
  () => {
    customers.value = props.customers ?? [];
    contracts.value = getContractsFromCustomer(customers.value);
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
