<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="hover:bg-inherit p-2 text-[#CACACA] hover:text-[#B66CFF]">
        <ListFilter />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Filtro</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Tipo <Icon icon="radix-icons:chevron-right" /></DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem v-model:checked="showS" @select="handleSubMenuContent">Tipo S</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showA" @select="handleSubMenuContent">Tipo A</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showB" @select="handleSubMenuContent">Tipo B</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showC" @select="handleSubMenuContent">Tipo C</DropdownMenuCheckboxItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator/>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Bandeira <Icon icon="radix-icons:chevron-right" /></DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem v-model:checked="showGreen" @select="handleSubMenuContent">Bandeira Verde</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showRed" @select="handleSubMenuContent">Bandeira Vermelha</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showYellow" @select="handleSubMenuContent">Bandeira Amarela</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem v-model:checked="showWhite" @select="handleSubMenuContent">Bandeira Branca</DropdownMenuCheckboxItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator/>
      <DropdownMenuSub>
        <Button variant="outline" class="w-full hover:text-red-500 bg-[#1C1C1C] hover:bg-background border-none " @click="clear">
        Limpar Filtros
      </Button>
      </DropdownMenuSub>

    </DropdownMenuContent>
  </DropdownMenu>
</template>


<script setup lang="ts">
import { ListFilter } from "lucide-vue-next";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { ref } from 'vue';

const showS = ref<boolean>(false);
const showA = ref<boolean>(false);
const showB = ref<boolean>(false);
const showC = ref<boolean>(false);
const showGreen = ref<boolean>(false);
const showRed = ref<boolean>(false);
const showYellow = ref<boolean>(false);
const showWhite = ref<boolean>(false);

function handleSubMenuContent(event: Event){
  event.preventDefault()
}

function clear() {
  showS.value = false;
  showA.value = false;
  showB.value = false;
  showC.value = false;
  showGreen.value = false;
  showRed.value = false;
  showYellow.value = false;
  showWhite.value = false;
}

</script>
