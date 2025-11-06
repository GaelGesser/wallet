'use client';

import type { ColumnDef } from '@tanstack/react-table';
import * as LucideIcons from 'lucide-react';
import {
  ArrowDownRight,
  ArrowRightLeft,
  ArrowUpRight,
  Circle,
  Eye,
  Trash,
} from 'lucide-react';
import type { Transaction } from '@/actions/transactions/get-transactions/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EditTransactionButton from './edit-transaction-button';

const DOLLAR_100 = 100;

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const name = row.original.name;
      const description = row.original.description;
      return (
        <div className="flex flex-col gap-1 text-left capitalize">
          <span className="font-medium">{name}</span>
          {description && (
            <span className="text-muted-foreground text-xs">{description}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'categoryName',
    header: 'Categoria',
    cell: ({ row }) => {
      const categoryName = row.original.categoryName;
      const categoryIcon = row.original.categoryIcon;
      const IconComponent = categoryIcon
        ? (LucideIcons[
            categoryIcon as keyof typeof LucideIcons
          ] as React.ComponentType<{
            className?: string;
          }>) || LucideIcons.Circle
        : null;
      return (
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="size-4" />}
          <span className="capitalize">{categoryName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.original.type;
      const typeLabels = {
        expense: 'Despesa',
        income: 'Receita',
        transfer: 'Transferência',
      };
      return (
        <Badge className="flex items-center gap-2" variant="outline">
          {type === 'expense' && (
            <ArrowDownRight className="size-4 text-red-500" />
          )}
          {type === 'income' && (
            <ArrowUpRight className="size-4 text-green-500" />
          )}
          {type === 'transfer' && (
            <ArrowRightLeft className="size-4 text-sky-500" />
          )}
          <span>{typeLabels[type as keyof typeof typeLabels]}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusLabels = {
        paid: 'Pago',
        pending: 'Pendente',
        canceled: 'Cancelado',
      };
      return (
        <div
          className={cn(
            'flex items-center gap-2 rounded-full px-2 py-1 font-bold text-xs',
            status === 'paid' && 'text-green-500',
            status === 'pending' && 'text-yellow-500',
            status === 'canceled' && 'text-red-500'
          )}
        >
          <Circle
            className={cn(
              'size-2 fill-current',
              status === 'paid' && 'text-green-500',
              status === 'pending' && 'text-yellow-500',
              status === 'canceled' && 'text-red-500'
            )}
          />
          {statusLabels[status as keyof typeof statusLabels]}
        </div>
      );
    },
  },
  {
    accessorKey: 'amountInCents',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = row.original.amountInCents;
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount / DOLLAR_100);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'actions',
    header: () => (
      <div className="flex items-center justify-end">
        <span />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button size="icon" variant="ghost">
          <Eye className="size-4" />
        </Button>
        <EditTransactionButton transaction={row.original} />
        <Button size="icon" variant="ghost">
          <Trash className="size-4" />
        </Button>
      </div>
    ),
  },
];
