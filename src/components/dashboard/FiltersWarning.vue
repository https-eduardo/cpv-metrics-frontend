<template>
  <div class="flex items-center gap-2">
    <CalendarOff :size="20" v-if="props.period" />
    <RouteOff :size="20" v-if="props.filter" />
  </div>
</template>

<script lang="ts" setup>
import { CalendarOff, RouteOff } from "lucide-vue-next";
const props = defineProps({
  period: Boolean,
  filter: Boolean,
});
</script>
