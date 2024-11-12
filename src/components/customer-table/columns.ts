import { h } from "vue";
import { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ApiCustomer } from "@/types/customer";
import {
  getCustomerLtv,
  getCustomerMonthlyIncome as getCustomerMonthlyIncome,
} from "@/lib/utils";

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
