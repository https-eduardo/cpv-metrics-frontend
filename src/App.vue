<script setup lang="ts">
import { authService } from "./services";

authService.setAuthorizationToken(import.meta.env.VITE_APP_API_TOKEN);
</script>

<template>
  <router-view />
</template>
