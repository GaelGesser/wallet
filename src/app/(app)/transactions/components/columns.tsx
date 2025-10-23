'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { transactions } from '@/database/schema/transactions';

export type Transaction = typeof transactions.$inferSelect;

const DOLLAR_100 = 100;

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'amountInCents',
    header: 'Valor',
    cell: ({ row }) => {
      const amount = row.getValue('amountInCents') as number;
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount / DOLLAR_100);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const typeLabels = {
        expense: 'Despesa',
        income: 'Receita',
        transfer: 'Transferência',
      };
      return <span>{typeLabels[type as keyof typeof typeLabels]}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusLabels = {
        paid: 'Pago',
        pending: 'Pendente',
        canceled: 'Cancelado',
      };
      return <span>{statusLabels[status as keyof typeof statusLabels]}</span>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(date));
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date));
    },
  },
];
