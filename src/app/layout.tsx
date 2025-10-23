import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/providers/react-query';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Gerencie suas finanças com o Wallet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster richColors theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
