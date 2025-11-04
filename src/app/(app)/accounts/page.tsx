import { Plus, Search } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import { AccountsCards } from './components/accounts-cards';
import AddAccountButton from './components/add-account-button';

export default async function AccountsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect('/sign-in');
  }

  return (
    <>
      <AppSidebarHeader
        breadcrumbItems={[
          { label: 'Contas', href: '/accounts', separator: false },
        ]}
      />
      <AppSidebarBody>
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-2 border-border border-b pb-2">
            <div className="flex w-full items-center gap-2 py-2">
              <div className="flex items-center gap-2">
                <Input className="max-w-xs" placeholder="Buscar conta" />
                <Button size="icon" variant="outline">
                  <Search className="size-3" />
                </Button>
              </div>

              <Button className="text-xs" size="default" variant="outline">
                <Plus className="size-3" />
                Novo Filtro
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <AddAccountButton />
            </div>
          </div>

          <AccountsCards />
        </div>
      </AppSidebarBody>
    </>
  );
}
