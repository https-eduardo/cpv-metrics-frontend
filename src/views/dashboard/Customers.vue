<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3 bg-[#B66CFF]"></div>
    <div class="p-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Clientes</h1>
      <Input class="max-w-48" placeholder="Buscar" v-model="filterName" />
    </div>
    <div class="py-10 px-8">
      <DataTable
        :columns="columns"
        :data="data"
        :totalPages="totalPages"
        :current-page="currentPage"
        :loading="loading"
        @change-page="handlePageChange"
        @sort="handleSorting"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from "vue";
import { columns } from "../../components/customer-table/columns.ts";
import { customersService } from "@/services";
import { ApiCustomer } from "@/types/customer.ts";
import DataTable from "@/components/customer-table/DataTable.vue";
import { useRouter } from "vue-router";
import { SortingOption } from "@/types/common.ts";
import Input from "@/components/ui/input/Input.vue";

const { currentRoute, push } = useRouter();

const data = ref<ApiCustomer[]>([]);
const totalPages = ref<number>(0);
const currentPage = ref<number>(1);
const sort = ref<SortingOption>({});
const filterName = ref("");
const loading = ref<boolean>(true);

async function getData(page: number, sort: SortingOption, filterName: string) {
  return await customersService.getCustomers({ page, sort, filterName });
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
  const contractFields = ["dataInicio", "dataFinal", "ltv", "mensalidade"];

  sort.value = {
    [fieldName]: {
      order: sortItem.desc ? "desc" : "asc",
      relation: contractFields.includes(fieldName) ? "contratos" : undefined,
    },
  };
  loading.value = true;
};

async function updateData() {
  const {
    data: { data: customers, meta },
  } = await getData(currentPage.value, sort.value, filterName.value);

  totalPages.value = meta.pagination.pageCount;
  data.value = customers;
  loading.value = false;
}

onMounted(() => {
  handlePageChange(Number(currentRoute.value.query.page) || 1);
  updateData();
});

watch(currentPage, () => {
  updateData();
});

watch(filterName, () => {
  updateData();
});

watch(sort, () => {
  updateData();
});
</script>
