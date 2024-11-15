import { h } from "vue";
import { ApiListCampaignResponse } from "@/types/campaign";
import { ColumnDef } from "@tanstack/vue-table";
import Button from "../ui/button/Button.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { formatNumber, formatPercent } from "@/lib/utils";

const SortButtonStyle = "pl-0 hover:bg-accent-none";

export const columnsCampaign: ColumnDef<ApiListCampaignResponse>[] = [
  {
    accessorKey: "nome",
    header: () => "Campanha",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Status",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => h("div", { class: "" }, row.original.status),
  },

  {
    accessorKey: "total_custo",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Custo",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const cost = row.original.total_custo;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cost);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },

  {
    accessorKey: "total_conversoes",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Conversão",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const conversao = Number(row.original.total_conversoes);

      return h("div", { class: "" }, formatNumber(conversao));
    },
  },

  {
    accessorKey: "custo_por_conversao",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Custo/conv",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const costPerConversion = row.original.custo_por_conversao;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(costPerConversion);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },

  {
    accessorKey: "total_clicks",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Cliques",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const clicks = Number(row.original.total_clicks);

      return h("div", { class: "" }, formatNumber(clicks));
    },
  },

  {
    accessorKey: "total_ctr",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "CTR",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const ctr = Number(row.original.total_ctr);

      return h("div", { class: "" }, formatPercent(ctr));
    },
  },
];
