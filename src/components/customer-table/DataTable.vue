<template>
  <div class="border rounded-md border-[#2D2D2D] flex-1">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="props.loading">
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              Carregando...
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>

  <div>
    <div class="flex items-center justify-end py-2 space-x-2 border-0">
      <Button
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="goToPreviousPage"
        class="bg-[#B66CFF] disabled:opacity-75 bg-[#282828]"
      >
        <ChevronLeft class="color-black" />
      </Button>
      <Button
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="goToNextPage"
        class="bg-[#B66CFF] disabled:opacity-75 bg-[#282828]"
      >
        <ChevronRight />
      </Button>
    </div>
    <div class="text-center text-white" v-show="!!table.getPageCount()">
      Página {{ table.getState().pagination.pageIndex + 1 }} de
      {{ table.getPageCount() }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData, TValue">
import { Button } from "@/components/ui/button";
import { valueUpdater } from "@/lib/utils";

import { ref, watch } from "vue";

import {
  ColumnDef,
  SortingState,
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./columns";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  pageSize?: number;
}>();

const emit = defineEmits(["changePage", "sort"]);

const sorting = ref<SortingState>([]);

const goToPreviousPage = () => {
  emit("changePage", table.getState().pagination.pageIndex);
};

const goToNextPage = () => {
  // pageIndex starts in 0
  emit("changePage", table.getState().pagination.pageIndex + 2);
};

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  manualSorting: true,
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting);
    emit("sort", sorting);
  },
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  get pageCount() {
    return props.totalPages;
  },
});

watch(
  () => props.currentPage,
  () => {
    table.setPagination({
      pageIndex: props.currentPage - 1,
      pageSize: props.pageSize || 10,
    });
  }
);
</script>
