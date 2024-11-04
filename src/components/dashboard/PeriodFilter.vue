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
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>Filtrar por período</template>
        <CalendarIcon class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        locale="pt"
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import RangeCalendar from "../ui/range-calendar/RangeCalendar.vue";
import { PopoverTrigger, Popover, PopoverContent } from "../ui/popover";
import { CalendarIcon } from "lucide-vue-next";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Ref, ref } from "vue";
import { DateRange } from "radix-vue";

const df = new DateFormatter("pt-BR", {
  dateStyle: "short",
});

const value = ref({
  start: new CalendarDate(2024, 1, 20),
  end: new CalendarDate(2024, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>;
</script>
