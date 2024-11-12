<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[260px] font-normal flex justify-between rounded-md text-[#CACACA] hover:bg-background'
          )
        "
      >
        <template v-if="range.start">
          <template v-if="range.end">
            {{ df.format(range.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(range.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(range.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>Filtrar por período</template>
        <CalendarIcon class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 border-[#2D2D2D]">
      <RangeCalendar
        locale="pt"
        v-model="range"
        initial-focus
        :number-of-months="2"
        @update:model-value="handleRangeUpdate"
        @update:start-value="(startDate) => (range.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import RangeCalendar from "../ui/range-calendar/RangeCalendar.vue";
import { PopoverTrigger, Popover, PopoverContent } from "../ui/popover";
import { CalendarIcon } from "lucide-vue-next";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { DateRange } from "radix-vue";
import { Ref, ref } from "vue";

const df = new DateFormatter("pt-BR", {
  dateStyle: "short",
});

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: DateRange;
}>();

function handleRangeUpdate(date: DateRange) {
  emit("update:modelValue", date);
}

const range = ref({
  start: props.modelValue.start,
  end: props.modelValue.end,
}) as Ref<DateRange>;
</script>
