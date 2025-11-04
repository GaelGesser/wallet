'use client';

import * as LucideIcons from 'lucide-react';
import { ChevronsUpDown, Plus, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Account } from '@/actions/accounts/get-accounts/schema';
import UpsertAccountForm from '@/app/(app)/accounts/components/upsert-account-form';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAccounts } from '@/hooks/queries/use-accounts';

export function AccountSwitcher() {
  const { isMobile } = useSidebar();
  const { data: accounts = [], isLoading } = useAccounts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState<Account | undefined>();

  useEffect(() => {
    if (accounts.length > 0 && !activeAccount) {
      const defaultAccount =
        accounts.find((acc) => acc.isDefault) ?? accounts[0];
      setActiveAccount(defaultAccount);
    }
  }, [accounts, activeAccount]);

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            size="lg"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
              <Wallet className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Carregando...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const ActiveIcon = activeAccount
    ? ((LucideIcons[activeAccount.icon as keyof typeof LucideIcons] ||
        LucideIcons.Wallet) as React.ComponentType<{ className?: string }>)
    : Wallet;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              {activeAccount ? (
                <>
                  <div
                    className="flex aspect-square size-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: activeAccount.color }}
                  >
                    <ActiveIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeAccount.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                    <Wallet className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Nenhuma conta</span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Minhas contas
            </DropdownMenuLabel>
            {accounts.length === 0 ? (
              <DropdownMenuItem className="gap-2 p-2" disabled>
                <div className="text-muted-foreground text-sm">
                  Nenhuma conta encontrada
                </div>
              </DropdownMenuItem>
            ) : (
              accounts.map((account, index) => {
                const Icon = (LucideIcons[
                  account.icon as keyof typeof LucideIcons
                ] || LucideIcons.Wallet) as React.ComponentType<{
                  className?: string;
                }>;

                return (
                  <DropdownMenuItem
                    className="gap-2 p-2"
                    key={account.id}
                    onClick={() => setActiveAccount(account)}
                  >
                    <div
                      className="flex size-6 items-center justify-center rounded-md border text-white"
                      style={{ backgroundColor: account.color }}
                    >
                      <Icon className="size-3.5 shrink-0" />
                    </div>
                    {account.name}
                    {account.isDefault && (
                      <span className="ml-auto text-muted-foreground text-xs">
                        Padrão
                      </span>
                    )}
                    {!account.isDefault && (
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                );
              })
            )}
            <DropdownMenuSeparator />
            <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="gap-2 p-2"
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsDialogOpen(true);
                  }}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Criar nova conta
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <UpsertAccountForm
                isOpen={isDialogOpen}
                onSuccess={() => {
                  setIsDialogOpen(false);
                }}
              />
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
