'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import UpsertCategoryForm from './upsert-category-form';

const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar categoria
        </Button>
      </DialogTrigger>
      <UpsertCategoryForm isOpen={isOpen} onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddCategoryButton;
