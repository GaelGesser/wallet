import { Plus } from 'lucide-react';
import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { columns, type Transaction } from './components/columns';
import { DataTable } from './components/data-table';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 100,
    status: 'pending',
    description: 'Descrição da transação',
    categoryId: '1',
  },
  {
    id: '2',
    amount: 200,
    status: 'processing',
    description: 'Descrição da transação 2',
    categoryId: '2',
  },
  {
    id: '3',
    amount: 300,
    status: 'success',
    description: 'Descrição da transação 3',
    categoryId: '3',
  },
];

export default function TransactionsPage() {
  return (
    <>
      <AppSidebarHeader
        breadcrumbItems={[
          { label: 'Transações', href: '/transactions', separator: false },
        ]}
      />
      <AppSidebarBody>
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-2">
            <Input className="max-w-sm" placeholder="Pesquisar transação" />
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Nova transação
            </Button>
          </div>
          <DataTable columns={columns} data={mockTransactions} />
        </div>
      </AppSidebarBody>
    </>
  );
}
