import { h } from 'vue';
import { ColumnDef } from '@tanstack/vue-table';

export interface tableClient {
  id: string
  name: string
  status: 'Bandeira Verde' | 'Bandeira Amarela' | 'Bandeira Vermelha'
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
    status: 'Bandeira Verde',
    payment: 316,
    ltv: 3160,
    type: 'Tipo A',
    startDate: '03/09/23',
    finalDate: '03/09/24'
  },
  {
    id: '02',
    name: 'Cliente 2',
    status: 'Bandeira Amarela',
    payment: 242,
    ltv: 3106,
    type: 'Tipo B',
    startDate: '03/03/23',
    finalDate: '03/06/24'
  },
  {
    id: '03',
    name: 'Cliente 3',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo C',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '04',
    name: 'Cliente 4',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo B',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '05',
    name: 'Cliente 5',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo S',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '06',
    name: 'Cliente 6',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo A',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '07',
    name: 'Cliente 7',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo A',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '08',
    name: 'Cliente 8',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo C',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '08',
    name: 'Cliente 8',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo C',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '08',
    name: 'Cliente 8',
    status: 'Bandeira Vermelha',
    payment: 150,
    ltv: 1500,
    type: 'Tipo C',
    startDate: '01/01/23',
    finalDate: '01/01/24'
  },
  {
    id: '08',
    name: 'Cliente 8',
    status: 'Bandeira Vermelha',
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
    header: () => 'Nome',
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
  },
  {
    accessorKey: 'payment',
    header: () => h('div', { class: 'text-left' }, 'Mensalidade'),
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
    header: () => 'Tipo',
  },
  {
    accessorKey: 'startDate',
    header: () => 'Inicio Contrado',
  },
  {
    accessorKey: 'finalDate',
    header: () => 'Final Contrato',
  },
];