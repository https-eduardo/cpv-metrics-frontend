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
      <DropdownMenuLabel>Filtrar campanhas</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      
          <DropdownMenuCheckboxItem
            v-model:checked="state.status.showActive"
            @select="handleMenuContent"
            >Ativas</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator/>
          <DropdownMenuCheckboxItem
            v-model:checked="state.status.showPaused"
            @select="handleMenuContent"
            >Pausadas</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator/>
          <DropdownMenuCheckboxItem
            v-model:checked="state.status.showDisable"
            @select="handleMenuContent"
            >Desativas</DropdownMenuCheckboxItem
          >
          <DropdownMenuSeparator />
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
} from "@/components/ui/dropdown-menu";
import { ref, watch } from "vue";

defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const initialState = {
  status: {
    showActive: false,
    showPaused: false,
    showDisable: false,
  },
};

const state = ref(initialState);

function handleMenuContent(event: Event) {
  event.preventDefault();
}

function clear() {
  state.value.status.showActive = false;
  state.value.status.showPaused = false;
  state.value.status.showDisable = false;
}

const transformFiltersInQueryString = () => {
  const orFilter: string[] = [];
  const statusFiltered: Record<string, boolean> = {
    Active: state.value.status.showActive,
    Paused: state.value.status.showPaused,
    Disable: state.value.status.showDisable,
  };
  const activestatusFiltered = Object.keys(statusFiltered).filter(
    (key) => !!statusFiltered[key]
  );

  activestatusFiltered.forEach((status) =>
    orFilter.push(`[ # ][$eq]=${status}`)
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
