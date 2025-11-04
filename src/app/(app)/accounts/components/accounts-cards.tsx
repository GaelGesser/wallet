'use client';

import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import type { Account } from '@/actions/accounts/get-accounts/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { centsToBrl } from '@/helpers/money';
import { useAccounts } from '@/hooks/queries/use-accounts';
import AddAccountButton from './add-account-button';
import UpsertAccountForm from './upsert-account-form';

const getTypeLabel = (type: Account['type']) => {
  const types = {
    checking: 'Conta Corrente',
    savings: 'Poupança',
    credit: 'Crédito',
    cash: 'Dinheiro',
  };
  return types[type];
};

export function AccountsCards() {
  const { data: accounts = [], isLoading } = useAccounts();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  const handleCardClick = (account: Account) => {
    setSelectedAccount(account);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedAccount(undefined);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={`skeleton-account-${index}`}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-center text-muted-foreground">
          Nenhuma conta encontrada.
        </p>
        <AddAccountButton />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = (LucideIcons[account.icon as keyof typeof LucideIcons] ||
            LucideIcons.Wallet) as React.ComponentType<{ className?: string }>;

          return (
            <Card
              className="cursor-pointer transition-shadow hover:shadow-md"
              key={account.id}
              onClick={() => handleCardClick(account)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: account.color }}
                    >
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>
                        {getTypeLabel(account.type)}
                      </CardDescription>
                    </div>
                  </div>
                  {account.isDefault && (
                    <span className="text-muted-foreground text-xs">
                      Padrão
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Saldo</p>
                  <p className="font-semibold text-2xl">
                    {centsToBrl(account.balanceInCents)}
                  </p>
                  {account.description && (
                    <p className="mt-2 text-muted-foreground text-sm">
                      {account.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <UpsertAccountForm
          account={selectedAccount}
          isOpen={isOpen}
          onSuccess={handleCloseDialog}
        />
      </Dialog>
    </>
  );
}
