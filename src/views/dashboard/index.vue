<template>
  <div class="flex min-h-dvh">
    <main class="flex min-w-full">
      <div class="bg-[#B66CFF] absolute top-0 w-full h-2"></div>
      <DashboardSidebar />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
</script>
