<template>
  <div class="flex flex-col w-full bg-[#1C1C1C]">
    <div class="w-full block h-3 bg-[#B66CFF]"></div>
    <div class="p-8">
      <h1 class="text-2xl font-bold text-white">Métricas</h1>
    </div >

    <div class="flex justify-evenly">
      <DashboardCard title="clientes" value="120" :icon="IconComponent"/>
      <DashboardCard/>
      <DashboardCard/>
      <DashboardCard/>
    </div>

  </div>
</template>

<script setup lang="ts">
  import DashboardCard from "../../components/dashboard/Card.vue";
  import IconComponent from "../../components/dashboard/Icon.vue";


</script>
