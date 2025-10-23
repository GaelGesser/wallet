import { Grid2X2, Plus, Search, Table } from 'lucide-react';
import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddTransactionButton from './components/add-transaction-button';
import { columns, type Transaction } from './components/columns';
import { DataTable } from './components/data-table';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Supermercado Extra',
    description: 'Compras do mês - alimentos e produtos de limpeza',
    date: new Date('2024-01-15'),
    amountInCents: 12_500, // R$ 125,00
    type: 'expense',
    status: 'paid',
    categoryId: '1',
    userId: 'user-1',
    walletId: 'wallet-1',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    name: 'Salário',
    description: 'Salário mensal - janeiro 2024',
    date: new Date('2024-01-05'),
    amountInCents: 500_000, // R$ 5.000,00
    type: 'income',
    status: 'paid',
    categoryId: '2',
    userId: 'user-1',
    walletId: 'wallet-1',
    createdAt: new Date('2024-01-05T09:00:00'),
    updatedAt: new Date('2024-01-05T09:00:00'),
  },
  {
    id: '3',
    name: 'Uber',
    description: 'Corrida para o trabalho',
    date: new Date('2024-01-16'),
    amountInCents: 1850, // R$ 18,50
    type: 'expense',
    status: 'pending',
    categoryId: '3',
    userId: 'user-1',
    walletId: 'wallet-1',
    createdAt: new Date('2024-01-16T08:15:00'),
    updatedAt: new Date('2024-01-16T08:15:00'),
  },
  {
    id: '4',
    name: 'Transferência para Poupança',
    description: 'Reserva de emergência',
    date: new Date('2024-01-10'),
    amountInCents: 100_000, // R$ 1.000,00
    type: 'transfer',
    status: 'paid',
    categoryId: '4',
    userId: 'user-1',
    walletId: 'wallet-2',
    createdAt: new Date('2024-01-10T14:20:00'),
    updatedAt: new Date('2024-01-10T14:20:00'),
  },
  {
    id: '5',
    name: 'Netflix',
    description: 'Assinatura mensal',
    date: new Date('2024-01-20'),
    amountInCents: 3290, // R$ 32,90
    type: 'expense',
    status: 'paid',
    categoryId: '5',
    userId: 'user-1',
    walletId: 'wallet-1',
    createdAt: new Date('2024-01-20T12:00:00'),
    updatedAt: new Date('2024-01-20T12:00:00'),
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
          <Tabs className="w-full" defaultValue="table">
            <div className="flex w-full items-center justify-between gap-2 border-border border-b pb-2">
              <TabsList className="h-auto gap-2 bg-transparent p-0">
                <TabsTrigger
                  className="flex h-8 items-center gap-2 rounded-md border-0 px-3 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-muted/50 data-[state=inactive]:hover:text-foreground"
                  value="table"
                >
                  <Table className="size-4" />
                  Tabela
                </TabsTrigger>
                <TabsTrigger
                  className="flex h-8 items-center gap-2 rounded-md border-0 px-3 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-muted/50 data-[state=inactive]:hover:text-foreground"
                  value="cards"
                >
                  <Grid2X2 className="size-4" />
                  Cards
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <AddTransactionButton />
              </div>
            </div>

            {/* TODO: IMPLEMENTAR DROPDOWN DE FILTROS */}
            <div className="flex w-full items-center py-2">
              <div className="flex items-center gap-2">
                <Input className="max-w-xs" placeholder="Buscar transação" />
                <Button size="icon" variant="outline">
                  <Search className="size-3" />
                </Button>
              </div>

              <Button className="text-xs" size="sm" variant="ghost">
                <Plus className="size-3" />
                Novo Filtro
              </Button>
            </div>

            <TabsContent value="table">
              <DataTable columns={columns} data={mockTransactions} />
            </TabsContent>

            {/* TODO: IMPLEMENTAR VISUALIZAÇÃO EM CARDS */}
            <TabsContent value="cards">
              <div className="py-8 text-center text-muted-foreground">
                Visualização em cards será implementada em breve
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppSidebarBody>
    </>
  );
}
