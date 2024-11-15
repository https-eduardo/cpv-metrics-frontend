<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3"></div>
    <div class="p-8">
      <h1 class="text-3xl font-bold text-white">Homeney</h1>
      <div class="flex w-full gap-2 justify-end">
        <StatusCampaignFilter v-model="statusCampaignFilter" />
        <PeriodFilter v-model="periodFilter" />
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">Geral</h2>
      <div class="flex gap-12 flex-wrap">
        <DashboardCard title="Impressões" :value="impressionCount" />
        <DashboardCard
          class="flex-1"
          title="Conversões"
          :value="conversionCount"
        />
        <DashboardCard class="flex-1" title="Custo" :value="cost" />
        <DashboardCard title="Custo/conv." :value="costPerConversion" />
      </div>
      <div class="py-10">
        <div class="flex justify-between py-2 items-center">
          <h2 class="text-2xl font-bold text-white mb-2">Campanhas</h2>
          <Input
            class="max-w-48"
            placeholder="Buscar por campanha"
            v-model="filterName"
          />
        </div>
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
import { formatMoney, formatNumber } from "@/lib/utils";
import { campaignsService } from "@/services";
import { ApiListCampaignResponse } from "@/types/campaign";
import DataTable from "@/components/campaign-table/DataTable.vue";
import { columnsCampaign } from "../../components/campaign-table/columns.ts";
import { useRouter } from "vue-router";
import PeriodFilter from "@/components/dashboard/PeriodFilter.vue";
import Input from "@/components/ui/input/Input.vue";

const { currentRoute, push } = useRouter();

const data = ref<ApiListCampaignResponse[]>([]);
const totalPages = ref<number>(0);
const filterName = ref("");
const currentPage = ref<number>(1);
const sort = ref("");
const sortOrder = ref("");
const loading = ref<boolean>(true);

const statusCampaignFilter = ref<"all" | "active">("active");

const periodFilter = ref({}) as Ref<DateRange>;

const state = reactive({
  impressionCount: 0,
  conversionCount: 0,
  cost: 0,
  costPerConversion: 0,
});

const impressionCount = computed(() => formatNumber(state.impressionCount));
const conversionCount = computed(() => formatNumber(state.conversionCount));
const cost = computed(() => formatMoney(state.cost));
const costPerConversion = computed(() => formatMoney(state.costPerConversion));

async function getData() {
  return await campaignsService.getCampaignList(
    currentPage.value,
    periodFilter.value,
    statusCampaignFilter.value,
    filterName.value,
    sort.value,
    sortOrder.value
  );
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

  sort.value = sortItem.id;
  sortOrder.value = sortItem.desc ? "desc" : "asc";
  loading.value = true;
};

async function updateData() {
  const {
    data: { data: campaigns, pagination },
  } = await getData();

  totalPages.value = Number(pagination.pageCount);
  data.value = campaigns;
  loading.value = false;
}

const fetchGeneralInfo = async () => {
  const { data } = await campaignsService.getCampaignGeneralInfo(
    periodFilter.value,
    statusCampaignFilter.value
  );

  state.impressionCount = data.impressions;
  state.conversionCount = data.conversions;
  state.cost = data.cost;
  state.costPerConversion = data.cost / data.conversions;
};

watch(currentPage, () => {
  updateData();
});

watch(sort, () => {
  updateData();
});

watch(filterName, () => {
  updateData();
});

watch(statusCampaignFilter, () => {
  updateData();
});

watch(sort, () => {
  updateData();
});

watch(sortOrder, () => {
  updateData();
});

onMounted(async () => {
  fetchGeneralInfo();
  updateData();
  handlePageChange(Number(currentRoute.value.query.page) || 1);
});

watch(
  periodFilter,
  () => {
    fetchGeneralInfo();
    updateData();
  },
  { deep: true }
);

watch(statusCampaignFilter, () => {
  fetchGeneralInfo();
});
</script>
