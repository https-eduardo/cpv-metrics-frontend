<template>
<div class="flex w-[20vw] h-[140px] text-white bg-[#2d2d2d] rounded-[5px] overflow-hidden">
  <div class="w-[8px] bg-[#B66CFF]"></div>
      <div class="flex-col">
        <div class="flex-grow-1">Texto</div>
        <div>Valor</div>
        <div>Icon</div>
      </div> 
</div>
</template>

<script>
import {ref} from "vue";

export default{
  setup(){
    const list = ref({
      nome : 'jorge'
    })
    return{
    list
  };
}
}
</script>