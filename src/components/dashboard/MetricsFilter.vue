<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        class="hover:bg-background p-2 text-[#CACACA] hover:text-[#B66CFF]"
      >
        <ListFilter />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56 bg-background">
      <DropdownMenuLabel>Filtro</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Tipo</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem
            v-model:checked="state.tier.showS"
            @select="handleSubMenuContent"
            >Tipo S</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.tier.showA"
            @select="handleSubMenuContent"
            >Tipo A</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.tier.showB"
            @select="handleSubMenuContent"
            >Tipo B</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.tier.showC"
            @select="handleSubMenuContent"
            >Tipo C</DropdownMenuCheckboxItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Bandeira</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem
            v-model:checked="state.flag.showGreen"
            @select="handleSubMenuContent"
            >Bandeira Verde</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.flag.showRed"
            @select="handleSubMenuContent"
            >Bandeira Vermelha</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.flag.showYellow"
            @select="handleSubMenuContent"
            >Bandeira Amarela</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="state.flag.showWhite"
            @select="handleSubMenuContent"
            >Bandeira Branca</DropdownMenuCheckboxItem
          >
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <Button
          variant="outline"
          class="w-full hover:text-red-500 bg-[#1C1C1C] hover:bg-inhreit border-none"
          @click="clear"
        >
          Limpar Filtros
        </Button>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ListFilter } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ref, watch } from "vue";

defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const initialState = {
  tier: {
    showS: false,
    showA: false,
    showB: false,
    showC: false,
  },
  flag: {
    showGreen: false,
    showRed: false,
    showYellow: false,
    showWhite: false,
  },
};

const state = ref(initialState);

function handleSubMenuContent(event: Event) {
  event.preventDefault();
}

function clear() {
  state.value = { ...initialState };
}

const transformFiltersInQueryString = () => {
  const orFilter: string[] = [];
  const flagsFiltered: Record<string, boolean> = {
    bandeira_vermelha: state.value.flag.showRed,
    bandeira_amarela: state.value.flag.showYellow,
    bandeira_verde: state.value.flag.showGreen,
    bandeira_branca: state.value.flag.showWhite,
  };
  const tiersFiltered: Record<string, boolean> = {
    A: state.value.tier.showA,
    B: state.value.tier.showB,
    C: state.value.tier.showC,
    S: state.value.tier.showS,
  };
  const activeFlagFilters = Object.keys(flagsFiltered).filter(
    (key) => !!flagsFiltered[key]
  );
  const activeTiersFiltered = Object.keys(tiersFiltered).filter(
    (key) => !!tiersFiltered[key]
  );

  activeFlagFilters.forEach((flag) => orFilter.push(`[status][$eq]=${flag}`));

  activeTiersFiltered.forEach((tier) =>
    orFilter.push(`[classificacao][$eq]=${tier}`)
  );

  const prefix = "&filters[$and][0]";
  let query = "";

  orFilter.forEach(
    (filter, idx) => (query += `${prefix}[$or][${idx}]${filter}`)
  );

  return query;
};

watch(
  state,
  () => {
    emit("update:modelValue", transformFiltersInQueryString());
  },
  { deep: true }
);
</script>
