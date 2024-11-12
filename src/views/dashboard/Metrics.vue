<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3"></div>
    <div class="p-8">
      <h1 class="text-3xl font-bold text-white">Métricas</h1>
      <div class="flex w-full gap-2 justify-end mb-8">
        <MetricsFilter v-model="filters" />
        <StatusFilter v-model="statusFilter" />
        <PeriodFilter v-model="periodFilter" />
      </div>
      <div class="flex gap-12 flex-wrap">
        <DashboardCard
          title="Clientes"
          :value="customersCount"
          :icon="UsersRound"
        />
        <DashboardCard
          class="flex-1"
          title="Faturamento"
          :value="calculatedIncome"
          :icon="DollarSign"
        />
        <DashboardCard
          class="flex-1"
          title="Life Time Value (LTV)"
          :value="calculatedLtv"
          :icon="HandCoins"
        />
        <DashboardCard title="Churn Rate" :value="churnRate" :icon="Percent" />
      </div>
      <div class="grid w-full mt-8 grid-cols-2 gap-8 auto-rows-fr">
        <RetentionChart />
        <MonthlyIncomeChart :contracts="allContracts" />
        <CustomersSituationChart />
        <CustomersTypeChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, Ref, watch } from "vue";
import { DateRange } from "radix-vue";
import { UsersRound, DollarSign, HandCoins, Percent } from "lucide-vue-next";
import DashboardCard from "@/components/dashboard/Card.vue";
import PeriodFilter from "@/components/dashboard/PeriodFilter.vue";
import MetricsFilter from "@/components/dashboard/MetricsFilter.vue";
import RetentionChart from "@/components/dashboard/metrics/charts/RetentionChart.vue";
import MonthlyIncomeChart from "@/components/dashboard/metrics/charts/MonthlyIncomeChart.vue";
import CustomersSituationChart from "@/components/dashboard/metrics/charts/CustomersSituationChart.vue";
import CustomersTypeChart from "@/components/dashboard/metrics/charts/CustomersTypeChart.vue";
import {
  formatMoney,
  formatPercent,
  getContractsFromCustomer,
} from "@/lib/utils";
import { customersService, authService } from "@/services";
import StatusFilter from "@/components/dashboard/StatusFilter.vue";
import { ApiCustomer } from "@/types/customer";
import { ApiContract } from "@/types/contract";

const statusFilter = ref<"all" | "active">("active");
const customers = ref<ApiCustomer[]>([]);
const allContracts = ref<ApiContract[]>([]);

const periodFilter = ref({}) as Ref<DateRange>;

const state = reactive({
  customersCount: 0,
  calculatedIncome: 0,
  calculatedLtv: 0,
  churnRate: 0,
});

const filters = ref("");

const customersCount = computed(() => String(state.customersCount));
const calculatedIncome = computed(() => formatMoney(state.calculatedIncome));
const calculatedLtv = computed(() => formatMoney(state.calculatedLtv));
const churnRate = computed(() => formatPercent(state.churnRate));

const fetchAllContracts = async () => {
  const {
    data: { data: customersData },
  } = await customersService.getMetricsCustomer("all");

  allContracts.value = getContractsFromCustomer(customersData);
};

const fetchCustomers = async () => {
  const {
    data: { data: customersData },
  } = await customersService.getMetricsCustomer(statusFilter.value);

  customers.value = customersData;
};

const fetchGeneralInfo = async () => {
  const { data } = await customersService.getCustomersGeneralInfo(
    periodFilter.value,
    statusFilter.value
  );

  state.customersCount = data.customersCount;
  state.calculatedIncome = data.calculatedIncome;
  state.calculatedLtv = data.calculatedLtv;
  state.churnRate = data.churnRate;
};

onMounted(async () => {
  fetchAllContracts();
  fetchGeneralInfo();
  fetchCustomers();
});

watch(
  periodFilter,
  () => {
    fetchGeneralInfo();
  },
  { deep: true }
);

watch(statusFilter, () => {
  fetchGeneralInfo();
  fetchCustomers();
});
</script>
