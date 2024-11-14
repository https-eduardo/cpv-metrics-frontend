import { h } from "vue";
import { ApiCampaign } from "@/types/campaign";
import { ColumnDef } from "@tanstack/vue-table";
import Button from "../ui/button/Button.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { formatPercent } from "@/lib/utils";

const SortButtonStyle = "pl-0 hover:bg-accent-none";

export const columnsCampaign: ColumnDef<ApiCampaign>[] = [
  {
    accessorKey: "attributes.campanha",
    header: () => "Campanha",
  },
  {
    accessorKey: "attributes.status",
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
    cell: ({ row }) => h("div", { class: "" }, row.original.attributes.status),
  },

  {
    accessorKey: "attributes.relatorios.custo",
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
      const cost = 0;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cost);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },

  {
    accessorKey: "attributes.relatorios.conversao",
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
    cell: ({ row }: { row: { original: ApiCampaign } }) => {
      const conversao =
        row.original.attributes.relatorio_campanhas?.data?.[0]?.attributes
          ?.conversoes ?? 0;

      return h("div", { class: "" }, conversao);
    },
  },

  {
    accessorKey: "attributes.relatorios.custoPorConversao",
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
      const costPerConversion = 0;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(costPerConversion);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },

  {
    accessorKey: "attributes.relatorios.cliques",
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
    cell: ({ row }: { row: { original: ApiCampaign } }) => {
      const cliques =
        row.original.attributes.relatorio_campanhas?.data?.[0]?.attributes
          ?.clicks ?? 0;

      return h("div", { class: "" }, cliques);
    },
  },

  {
    accessorKey: "attributes.relatorios.ctr",
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
    cell: ({ row }: { row: { original: ApiCampaign } }) => {
      const ctr =
        row.original.attributes.relatorio_campanhas?.data?.[0]?.attributes
          ?.ctr ?? 0;

      return h("div", { class: "" }, formatPercent(ctr));
    },
  },
];
