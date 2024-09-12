<template>
  <div class="relative flex min-w-72 h-32 text-white bg-[#2d2d2d] rounded-md border-l-8 border-[#B66CFF] border-left py-2 px-4">
    <div class="flex-1 flex flex-col">
      <div class="flex items-center h-12">
        <h1 class="font-medium text-xl">{{title}}</h1>
      </div>
      <h2 class="mt-1 text-3xl font-semibold tracking-wide mr-16">{{value}}</h2>
      <component :is="icon" class="absolute w-12 h-12 text-[#b66cff] bottom-[30%] right-4"/>
    </div>
  </div>
</template>

<script setup lang="ts">

 defineProps ({
    title: String,
    value: String,
    icon: Object,
  })

</script>