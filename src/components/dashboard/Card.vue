<template>
  <div class="flex w-72 h-32 text-white bg-[#2d2d2d] rounded-md overflow-hidden">
    <div class="w-2 bg-[#B66CFF]"></div>
    <div class="flex-1 flex flex-col">
      <div class="flex items-center h-12 px-3">
        <div>{{title}}</div>
      </div>
      <div class="flex justify-between items-end h-12 px-2">
        <div class="text-2xl">{{value}}</div>
        <component :is="icon"></component>
      </div>
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