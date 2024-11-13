import { h } from "vue";
import { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ApiCustomer } from "@/types/customer";
import {
  formatPercent,
  getCampaignCost,
  getCustomerLtv,
  getCustomerMonthlyIncome as getCustomerMonthlyIncome,
} from "@/lib/utils";
import { ApiCampaign } from "@/types/campaign";

const SortButtonStyle = "pl-0 hover:bg-accent-none";


export const columns: ColumnDef<ApiCustomer>[] = [
  {
    accessorKey: "attributes.nome",
    header: () => "Nome",
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
    accessorKey: "attributes.contratos.mensalidade",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Mensalidade",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const payment = getCustomerMonthlyIncome(row.original);
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(payment);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },
  {
    accessorKey: "attributes.contratos.ltv",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "LTV",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const ltv = getCustomerLtv(row.original);
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(ltv);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },
  {
    accessorKey: "attributes.classificacao",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Tipo",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      return h(
        "span",
        { class: "text-left font-medium" },
        `Tipo ${row.original.attributes.classificacao}`
      );
    },
  },
  {
    accessorKey: "attributes.contratos.dataInicio",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Data inicio contrato",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const date = new Date(
        row.original.attributes.contratos.data?.at(0)?.attributes.dataInicio!
      );
      const formattedDate = new Intl.DateTimeFormat("pt-BR").format(date);
      return h("div", { class: "text-left font-medium" }, formattedDate);
    },
  },
  {
    accessorKey: "attributes.contratos.dataFinal",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Data final contrato",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const date = new Date(
        row.original.attributes.contratos.data?.at(0)?.attributes.dataFinal!
      );
      const formattedDate = new Intl.DateTimeFormat("pt-BR").format(date);
      return h("div", { class: "text-left font-medium" }, formattedDate);
    },
  },
];

export const columnsZone: ColumnDef<ApiCustomer>[] = [
  {
    accessorKey: "attributes.endereco.attributes.cidade",
    header: () => "Cidade",
  },
  {
    accessorKey: "attributes.endereco.attributes.regiao",
    header: () => "Região",
  },
  {
    accessorKey: "attributes.mensalidade",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "Mensalidade",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const payment = getCustomerMonthlyIncome(row.original);
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(payment);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },
  {
    accessorKey: "attributes.ltv",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class: SortButtonStyle,
        },
        () => [
          "LTV",
          h(ArrowUpDown, {
            class: `ml-2 h-4 w-4 transition-transform duration-300 ${
              column.getIsSorted() === "asc" ? "rotate-180" : ""
            }`,
          }),
        ]
      );
    },
    cell: ({ row }) => {
      const ltv = getCustomerLtv(row.original);
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(ltv);
      return h("div", { class: "text-left font-medium" }, formatted);
    },
  },
];

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
      const cost = getCampaignCost(row.original);
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
      const conversao = row.original.attributes.relatorios?.data?.[0]?.attributes?.conversao ?? 0;

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
      const costPerConversion = getCampaignCost(row.original);
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
      const cliques = row.original.attributes.relatorios?.data?.[0]?.attributes?.cliques ?? 0;

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
      const ctr = row.original.attributes.relatorios?.data?.[0]?.attributes?.ctr ?? 0;

      return h("div", { class: "" }, formatPercent(ctr)); 
    },
  },
];