<template>
  <div class="flex basis-[20vw] h-[140px] text-white bg-[#2d2d2d] rounded-[5px] overflow-hidden">
    <div class="w-[8px] bg-[#B66CFF]"></div>
    <div class="flex-1 flex flex-col">
      <div class="flex items-center h-[30%] px-3">
        <div>{{ title }}</div>
      </div>
      <div class="flex justify-between items-end h-[40%] px-3">
        <div class="text-2xl">{{value}}</div>
        <component :is="icon"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    title: String,
    value: String,
    icon: Object,
  },
}
</script>