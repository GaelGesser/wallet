'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import type { Transaction } from '@/actions/transactions/get-transactions/schema';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UpsertTransactionForm from './upsert-transaction-form';

const EditTransactionButton = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <UpsertTransactionForm
        isOpen={isOpen}
        onSuccess={() => setIsOpen(false)}
        transaction={transaction}
      />
    </Dialog>
  );
};

export default EditTransactionButton;
