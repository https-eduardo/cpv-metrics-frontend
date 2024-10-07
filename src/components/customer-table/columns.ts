import { h } from 'vue';
import { ColumnDef } from '@tanstack/vue-table';
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const SortButtonStyle = 'pl-0 hover:bg-accent-none';

export interface TableCustomer {
  id: string
  name: string
  status: 'Bandeira Verde' | 'Bandeira Amarela' | 'Bandeira Vermelha'
  payment: number
  ltv: number 
  type: 'Tipo S' | 'Tipo A' | 'Tipo B' | 'Tipo C' 
  startDate: string
  finalDate: string
}

export const customersData: TableCustomer[] = [
  
];

export const columns: ColumnDef<TableCustomer>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nome',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: SortButtonStyle,
        }, () => ['Status', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: '' }, row.getValue('status')),
  },

  {
    accessorKey: 'payment',
    header: ({ column }) => {
      return h(Button, {
      variant: 'ghost',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      class: SortButtonStyle,
  }, () => ['Mensalidade', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])},
    cell: ({ row }) => {
      const payment = Number.parseFloat(row.getValue('payment'));
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(payment);
      return h('div', { class: 'text-left font-medium' }, formatted);
    },
  },

  {
    accessorKey: 'ltv',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: SortButtonStyle,
    }, () => ['LTV', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const ltv = Number.parseFloat(row.getValue('ltv'));
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(ltv);
      return h('div', { class: 'text-left font-medium' }, formatted);
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: SortButtonStyle,
      }, () => ['Tipo', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: SortButtonStyle,
      }, () => ['Data inicio contrato', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
  },
  {
    accessorKey: 'finalDate',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: SortButtonStyle,
      }, () => ['Data final contrato', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
  },
];