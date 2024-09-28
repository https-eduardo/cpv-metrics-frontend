import { h } from 'vue';
import { ColumnDef } from '@tanstack/vue-table';

interface tableClient {
  id: string
  name: string
  status: 'bandeira-verde' | 'bandeira-amarela' | 'bandeira-vermelha'
  payment: number
  ltv: number 
  type: 'Tipo S' | 'Tipo A' | 'Tipo B' | 'Tipo C' 
  startDate: string
  finalDate: string
}

export const client_table: tableClient[] = [
  {
    id: '01',
    name: 'Cliente 1',
    status: 'bandeira-verde',
    payment: 316,
    ltv: 3160,
    type: 'Tipo A',
    startDate: '03/09/23',
    finalDate: '03/09/24'
  },
  {
    id: '02',
    name: 'Cliente 2',
    status: 'bandeira-amarela',
    payment: 242,
    ltv: 3106,
    type: 'Tipo B',
    startDate: '03/03/23',
    finalDate: '03/06/24'
  },
  {
    id: '03',
    name: 'Cliente 3',
    status: 'bandeira-vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo C',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
];

export const columns: ColumnDef<tableClient>[] = [
  {
    accessorKey: 'id',
    header: () => 'ID',
  },
  {
    accessorKey: 'name',
    header: () => 'Name',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
  },
  {
    accessorKey: 'payment',
    header: () => h('div', { class: 'text-left' }, 'Payment'),
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
    header: () => 'LTV',
  },
  {
    accessorKey: 'type',
    header: () => 'Type',
  },
  {
    accessorKey: 'startDate',
    header: () => 'Start Date',
  },
  {
    accessorKey: 'finalDate',
    header: () => 'Final Date',
  },
];