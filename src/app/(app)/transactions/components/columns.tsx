'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type Transaction = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  description: string;
  categoryId: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="flex items-center gap-2 text-left font-semibold text-foreground">
        <span>ID</span>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'categoryId',
    header: 'Categoria',
  },
];
