'use client';

import { DataTable } from '@/components/common/data-table';
import AdvancedPagination from '@/components/ui/advanced-pagination';
import { useTransactions } from '@/hooks/queries/use-transactions';
import { columns } from './columns';

export function TransactionsTable() {
  const { data: transactions = [], isLoading } = useTransactions();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={transactions}
        emptyMessage="Nenhuma transação encontrada."
      />
      {transactions.length > 0 && (
        <AdvancedPagination currentPage={1} totalPages={4} />
      )}
    </>
  );
}
