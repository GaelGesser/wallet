/**
 * Corpo do sidebar da aplicação.
 * @param children - Conteúdo do corpo.
 * @returns Corpo do sidebar da aplicação.
 */
export function AppSidebarBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>;
}
