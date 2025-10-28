import { Plus, Search, Stars } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import AddCategoryButton from './components/add-category-button';
import { CategoriesTable } from './components/categories-table';

export default async function CategoriesPage() {
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
          { label: 'Categorias', href: '/categories', separator: false },
        ]}
      />
      <AppSidebarBody>
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-2 border-border border-b pb-2">
            <div className="flex w-full items-center gap-2 py-2">
              <div className="flex items-center gap-2">
                <Input className="max-w-xs" placeholder="Buscar categoria" />
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

              {/* TODO: Criar um modal que vai perguntar se o usuário deseja que crie categorias padrões para ele */}
              <Button size="icon" variant="outline">
                <Stars className="size-3" />
              </Button>
              <AddCategoryButton />
            </div>
          </div>

          <CategoriesTable />
        </div>
      </AppSidebarBody>
    </>
  );
}
