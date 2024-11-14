<template>
  <div class="flex items-center gap-2">
    <RouteOff :size="20" v-if="props.filter" />
  </div>
</template>

<script lang="ts" setup>
import { RouteOff } from "lucide-vue-next";
const props = defineProps({
  filter: Boolean,
});
</script>
