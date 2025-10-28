'use client';

import type { ColumnDef } from '@tanstack/react-table';
import * as LucideIcons from 'lucide-react';
import type { Category } from '@/actions/categories/get-categories/schema';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'icon',
    header: 'Ícone',
    cell: ({ row }) => {
      const iconName = row.original.icon;
      const Icon = (LucideIcons[iconName as keyof typeof LucideIcons] ||
        LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
      return (
        <div className="flex items-center">
          <Icon className="h-5 w-5" />
        </div>
      );
    },
  },
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
