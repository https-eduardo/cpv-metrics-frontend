<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3 bg-[#B66CFF]"></div>
    <div class="p-8">
      <h1 class="text-2xl font-bold text-white">Clientes</h1>
    </div>  
    <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns, tableClient, client_table } from '../../components/client-table/columns.ts'
import DataTable from '../../components/client-table/DataTable.vue'

const data = ref<tableClient[]>([])

async function getData(): Promise<tableClient[]> {
  // Fetch data from your API here.
  return client_table
}

onMounted(async () => {
  data.value = await getData()
})
</script>