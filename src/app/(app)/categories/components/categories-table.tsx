'use client';

import { useState } from 'react';
import type { Category } from '@/actions/categories/get-categories/schema';
import { DataTable } from '@/components/common/data-table';
import AdvancedPagination from '@/components/ui/advanced-pagination';
import { Dialog } from '@/components/ui/dialog';
import { useCategories } from '@/hooks/queries/use-categories';
import { columns } from './columns';
import UpsertCategoryForm from './upsert-category-form';

export function CategoriesTable() {
  const { data: categories = [], isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleRowClick = (category: Category) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedCategory(undefined);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        emptyMessage="Nenhuma categoria encontrada."
        onRowClick={handleRowClick}
      />
      {categories.length > 0 && (
        <AdvancedPagination currentPage={1} totalPages={4} />
      )}
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <UpsertCategoryForm
          category={selectedCategory}
          isOpen={isOpen}
          onSuccess={handleCloseDialog}
        />
      </Dialog>
    </>
  );
}
