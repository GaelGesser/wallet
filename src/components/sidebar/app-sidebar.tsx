'use client';

import {
  AudioWaveform,
  Banknote,
  BarChart,
  Command,
  CreditCard,
  GalleryVerticalEnd,
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
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

/**
 * Dados do sidebar da aplicação.
 * @returns Dados do sidebar da aplicação.
 */
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
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
      items: [
        {
          title: 'Listagem',
          url: '/accounts',
        },
        {
          title: 'Nova Conta',
          url: '/accounts/new',
        },
        {
          title: 'Editar Conta',
          url: '/accounts/edit/:id',
        },
      ],
    },
    {
      title: 'Cartões',
      url: '/cards',
      icon: CreditCard,
      items: [
        {
          title: 'Listagem',
          url: '/cards',
        },
        {
          title: 'Nova Cartão',
          url: '/cards/new',
        },
        {
          title: 'Editar Cartão',
          url: '/cards/edit/:id',
        },
      ],
    },

    {
      title: 'Categorias',
      url: '/categories',
      icon: List,
      items: [
        {
          title: 'Listagem',
          url: '/categories',
        },
        {
          title: 'Nova Categoria',
          url: '/categories/new',
        },
        {
          title: 'Editar Categoria',
          url: '/categories/edit/:id',
        },
      ],
    },
    {
      title: 'Tags',
      url: '/tags',
      icon: Tag,
      items: [
        {
          title: 'Listagem',
          url: '/tags',
        },
        {
          title: 'Nova Tag',
          url: '/tags/new',
        },
        {
          title: 'Editar Tag',
          url: '/tags/edit/:id',
        },
      ],
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
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
