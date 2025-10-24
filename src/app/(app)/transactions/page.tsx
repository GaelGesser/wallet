import { eq } from 'drizzle-orm';
import { Grid2X2, Plus, Search, Table } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import AdvancedPagination from '@/components/ui/advanced-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/database';
import { schema } from '@/database/schema';
import { auth } from '@/lib/auth';
import AddTransactionButton from './components/add-transaction-button';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect('/sign-in');
  }

  const transactions = await db
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.userId, session.user.id));

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
            <div className="flex w-full items-center gap-2 py-2">
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
              <DataTable columns={columns} data={transactions} />
              <div className="mt-4">
                <AdvancedPagination currentPage={1} totalPages={4} />
              </div>
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
