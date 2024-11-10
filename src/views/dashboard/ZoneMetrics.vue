<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3 bg-[#B66CFF]"></div>
    <div class="p-8">
      <h1 class="text-2xl font-bold text-white">Métricas regionais</h1>
    </div>
    <div class="py-10 px-8"></div>
  </div>
</template>

<script setup lang="ts">
import { ApiCustomer } from "@/types/customer";
import { onMounted, ref } from "vue";

const data = ref<ApiCustomer[]>([]);

async function getData(): Promise<ApiCustomer[]> {
  return [];
}

onMounted(async () => {
  data.value = await getData();
});
</script>
