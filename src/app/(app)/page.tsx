import { AppSidebarBody } from '@/components/sidebar/app-sidebar-body';
import { AppSidebarHeader } from '@/components/sidebar/app-sidebar-header';
import { DashboardCards } from './components/dashboard-cards';

export default function DashboardPage() {
  return (
    <>
      <AppSidebarHeader
        breadcrumbItems={[{ label: 'Dashboard', href: '/', separator: false }]}
      />
      <AppSidebarBody>
        <DashboardCards />
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </AppSidebarBody>
    </>
  );
}
