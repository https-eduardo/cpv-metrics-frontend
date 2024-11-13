<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3"></div>
    <div class="p-8">
      <h1 class="text-3xl font-bold text-white">Homeney</h1>
      <div class="flex w-full gap-2 justify-end">
        <StatusCampaignFilter v-model="statusCampaignFilter" />
        <PeriodCampaignFilter v-model="periodCampaignFilter" />
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">Geral</h2>
      <div class="flex gap-12 flex-wrap">
        <DashboardCard title="Impressões" :value="impressionCount" />
        <DashboardCard class="flex-1" title="Conversões" :value="conversionCount" />
        <DashboardCard class="flex-1" title="Custo" :value="cost" />
        <DashboardCard title="Custo/conv." :value="costPerConversion" />
      </div>
      <div class="py-10">
      <h2 class="text-2xl font-bold text-white mb-2">Campanhas</h2>
      <DataTable
        :columns="columnsCampaign"
        :data="data"
        :totalPages="totalPages"
        :current-page="currentPage"
        :loading="loading"
        @change-page="handlePageChange"
        @sort="handleSorting"
      />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, Ref, watch } from "vue";
import { DateRange } from "radix-vue";
import DashboardCard from "@/components/dashboard/Card.vue";
import StatusCampaignFilter from "@/components/dashboard/StatusCampaignFilter.vue";
import PeriodCampaignFilter from "@/components/dashboard/PeriodCampaignFilter.vue";
import {
  formatMoney,
  getReportsFromCampaign,
} from "@/lib/utils";
import { campaignsService } from "@/services";
import { ApiCampaign } from "@/types/campaign";
import { ApiReport } from "@/types/report";
import DataTable from "@/components/customer-table/DataTable.vue";
import {columnsCampaign } from "../../components/customer-table/columns.ts";
import { useRouter } from "vue-router";
import { SortingOption } from "@/types/common.ts";

const { currentRoute, push } = useRouter();

const data = ref<ApiCampaign[]>([]);
const totalPages = ref<number>(0);
const currentPage = ref<number>(1);
const sort = ref<SortingOption>({});
const loading = ref<boolean>(true);

const statusCampaignFilter = ref<"all" | "active">("active");
const periodCampaignFilter = ref<"day" | "week" | "month">("month");

const campaigns = ref<ApiCampaign[]>([]);
const allReports = ref<ApiReport[]>([]);

const periodFilter = ref({}) as Ref<DateRange>;

const state = reactive({
  impressionCount: 0,
  conversionCount: 0,
  cost: 0,
  costPerConversion: 0,
});

const impressionCount = computed(() => String(state.impressionCount));
const conversionCount = computed(() => String(state.conversionCount));
const cost = computed(() => formatMoney(state.cost));
const costPerConversion = computed(() => formatMoney(state.costPerConversion));

async function getData(page: number, sort: SortingOption) {
  return await campaignsService.getCampaigns({ page, sort });
}

const handlePageChange = (page: number) => {
  loading.value = true;
  currentPage.value = page <= totalPages.value ? page : 1;

  push({
    query: {
      page: currentPage.value,
    },
  });
};

const handleSorting = (sorting: Ref<Record<string, any>[]>) => {
  const sortItem = sorting.value[0];
  let fieldName = sortItem.id.split("_").at(-1);
  const reportFields = ["status", "custo", "conversao", "custoPorConversao", "cliques", "ctr"];

  sort.value = {
    [fieldName]: {
      order: sortItem.desc ? "desc" : "asc",
      relation: reportFields.includes(fieldName) ? "relatorios" : undefined,
    },
  };
  loading.value = true;
};

async function updateData() {
  const {
    data: { data: campaigns, meta },
  } = await getData(currentPage.value, sort.value);

  totalPages.value = meta.pagination.pageCount;
  data.value = campaigns;
  loading.value = false;
}

const fetchAllReports = async () => {
  const {
    data: { data: campaignsData },
  } = await campaignsService.getMetricsCampaign("all");

  allReports.value = getReportsFromCampaign(campaignsData);
};

const fetchCampaigns = async () => {
  const {
    data: { data: campaignsData },
  } = await campaignsService.getMetricsCampaign(statusCampaignFilter.value);

  campaigns.value = campaignsData;
};

//
const fetchGeneralInfo = async () => {
  const { data } = await campaignsService.getCustomersGeneralInfo(
    periodFilter.value,
    statusCampaignFilter.value
  );

  state.impressionCount = data.impressionCount;
  state.conversionCount = data.conversionCount;
  state.cost = data.cost;
  state.costPerConversion = data.costPerConversion;
};

watch(currentPage, () => {
  updateData();
});

watch(sort, () => {
  updateData();
});

onMounted(async () => {
  fetchAllReports();
  fetchGeneralInfo();
  fetchCampaigns();
  handlePageChange(Number(currentRoute.value.query.page) || 1);
  updateData();
});

watch(
  periodFilter,
  () => {
    fetchGeneralInfo();
  },
  { deep: true }
);

watch(statusCampaignFilter, () => {
  fetchGeneralInfo();
  fetchCampaigns();
});

watch(periodCampaignFilter, () => {
  fetchGeneralInfo();
  fetchCampaigns();
});
</script>