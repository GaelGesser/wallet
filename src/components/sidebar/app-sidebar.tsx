'use client';

import {
  Banknote,
  BarChart,
  CreditCard,
  Landmark,
  LayoutDashboard,
  List,
  Tag,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '../ui/sidebar';
import { AccountSwitcher } from './account-switcher';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

/**
 * Dados do sidebar da aplicação.
 * @returns Dados do sidebar da aplicação.
 */
const data = {
  accounts: [
    {
      name: 'Conta Itaú',
      logo: Landmark,
      color: 'bg-orange-500',
      textColor: 'text-white',
    },
    {
      name: 'Conta Investimento',
      logo: Landmark,
      color: 'bg-yellow-500',
      textColor: 'text-black',
    },
    {
      name: 'Conta Nubank',
      logo: Landmark,
      color: 'bg-purple-500',
      textColor: 'text-white',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Transações',
      url: '/transactions',
      icon: List,
    },
    {
      title: 'Contas',
      url: '/accounts',
      icon: Banknote,
    },
    {
      title: 'Cartões',
      url: '/cards',
      icon: CreditCard,
    },

    {
      title: 'Categorias',
      url: '/categories',
      icon: List,
    },
    {
      title: 'Tags',
      url: '/tags',
      icon: Tag,
    },
    {
      title: 'Relatórios',
      url: '/reports',
      icon: BarChart,
    },
  ],
};

/**
 * Sidebar da aplicação.
 * @param props - Propriedades do sidebar.
 * @returns Sidebar da aplicação.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AccountSwitcher accounts={data.accounts} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
