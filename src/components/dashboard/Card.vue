<template>
  <div
    :class="
      cn(
        'relative flex min-w-80 h-28 text-white rounded-md py-2 px-4 border-y-[1px] border-r-[1px]',
        customClass
      )
    "
  >
    <div
      class="absolute top-0 left-0 w-2 h-full bg-[#B66CFF] rounded-l-md"
    ></div>
    <div class="flex-1 flex flex-col pl-2">
      <div class="flex items-center h-12">
        <h1 class="font-medium text-md text-[#CACACA]">{{ props.title }}</h1>
      </div>
      <h2 class="text-2xl font-semibold tracking-wide mr-16">
        {{ props.value }}
      </h2>
      <component
        :is="props.icon"
        class="absolute w-12 h-12 text-[#b66cff] bottom-[30%] right-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { computed } from "vue";
const props = defineProps({
  class: String,
  title: String,
  value: String,
  icon: Function,
});

const customClass = computed(() => {
  return `bg-background border-[#2D2D2D] ${props.class}`;
});
</script>
