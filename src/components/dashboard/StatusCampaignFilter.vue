<template>
  <Select
    v-model="selected"
    @update:model-value="handleStatusFilterUpdate"
  >
    <SelectTrigger class="w-48 text-[#CACACA]">
      <SelectValue placeholder="Filtrar por status" />
    </SelectTrigger>
    <SelectContent class="bg-background border-[#2D2D2D]">
      <SelectGroup>
        <SelectItem value="all">Todas campanhas</SelectItem>
        <SelectItem value="active">Campanhas ativas</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref } from "vue";

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const selected = ref(props.modelValue);

function handleStatusFilterUpdate(value: string) {
  emit("update:modelValue", value);
}
</script>
