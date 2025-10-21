'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import type * as React from 'react';
import { useState } from 'react';

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
import { cn } from '@/lib/utils';

export function AccountSwitcher({
  accounts,
}: {
  accounts: {
    name: string;
    logo: React.ElementType;
    color: string | 'bg-neutral-500';
    textColor: string | 'text-neutral-500/80';
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeAccount, setActiveAccount] = useState(accounts[0]);

  if (!activeAccount) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div
                className={cn(
                  'flex aspect-square size-8 items-center justify-center rounded-lg',
                  activeAccount.textColor,
                  activeAccount.color
                )}
              >
                <activeAccount.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeAccount.name}
                </span>
              </div>
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
            {accounts.map((account, index) => (
              <DropdownMenuItem
                className="gap-2 p-2"
                key={account.name}
                onClick={() => setActiveAccount(account)}
              >
                <div
                  className={cn(
                    'flex size-6 items-center justify-center rounded-md border',
                    account.color,
                    account.textColor
                  )}
                >
                  <account.logo className="size-3.5 shrink-0 text-inherit" />
                </div>
                {account.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Criar nova conta
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
