<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3"></div>
    <div class="p-8">
      <h1 class="text-3xl font-bold text-white">Métricas</h1>
      <div class="flex w-full gap-2 justify-end mb-8">
        <MetricsFilter />
        <PeriodFilter />
      </div>
      <div class="flex gap-12 flex-wrap">
        <DashboardCard title="Clientes" value="120" :icon="UsersRound" />
        <DashboardCard
          class="flex-1"
          title="Faturamento"
          value="R$ 7800,45"
          :icon="DollarSign"
        />
        <DashboardCard
          class="flex-1"
          title="Life Time Value (LTV)"
          value="R$ 100.245,15"
          :icon="HandCoins"
        />
        <DashboardCard title="Churn Rate" value="25,00%" :icon="Percent" />
      </div>
      <div class="grid w-full mt-8 grid-cols-2 gap-8 auto-rows-fr">
        <RetentionChart />
        <MonthlyFeeChart />
        <CustomersSituationChart />
        <CustomersTypeChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardCard from "../../components/dashboard/Card.vue";
import PeriodFilter from "@/components/dashboard/PeriodFilter.vue";
import MetricsFilter from "@/components/dashboard/metrics/MetricsFilter.vue";
import RetentionChart from "@/components/dashboard/metrics/charts/RetentionChart.vue";
import MonthlyFeeChart from "@/components/dashboard/metrics/charts/MonthlyFeeChart.vue";
import { UsersRound, DollarSign, HandCoins, Percent } from "lucide-vue-next";
import CustomersSituationChart from "@/components/dashboard/metrics/charts/CustomersSituationChart.vue";
import CustomersTypeChart from "@/components/dashboard/metrics/charts/CustomersTypeChart.vue";
</script>
