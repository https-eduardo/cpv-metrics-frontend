<template>
  <div class="flex min-h-dvh">
    <main class="flex min-w-full">
      <DashboardSidebar />
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
</script>
