import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

interface AppSidebarHeaderProps {
  breadcrumbItems: {
    label: string;
    href: string;
    separator?: boolean;
  }[];
}

/**
 * Header do sidebar da aplicação.
 * @param breadcrumbItems - Itens do breadcrumb.
 * @returns Header do sidebar da aplicação.
 */
export function AppSidebarHeader({ breadcrumbItems }: AppSidebarHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          className="mr-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item) => (
              <Fragment key={item.href}>
                {item.separator && <BreadcrumbSeparator />}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
