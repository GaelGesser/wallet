'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Category } from '@/actions/categories/get-categories/schema';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(createdAt));
    },
  }
];
