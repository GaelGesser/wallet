'use client';

import { ArrowDownRight, ArrowUpRight, CreditCard, Wallet } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { centsToBrl } from '@/helpers/money';
import { useDashboardStats } from '@/hooks/queries/use-dashboard-stats';
import { cn } from '@/lib/utils';

export function DashboardCards() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`skeleton-card-${index}`}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
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

  if (!stats) {
    return null;
  }

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">Saldo Atual</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Wallet className="size-5 text-blue-500" />
            </div>
          </div>
          <CardDescription>Saldo disponível na contas</CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              'font-semibold text-2xl',
              stats.accountBalance >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {centsToBrl(stats.accountBalance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">
              Receitas do Mês
            </CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <ArrowUpRight className="size-5 text-green-500" />
            </div>
          </div>
          <CardDescription>Receitas deste mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl text-green-500">
            {centsToBrl(stats.monthlyIncome)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">
              Despesas do Mês
            </CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
              <ArrowDownRight className="size-5 text-red-500" />
            </div>
          </div>
          <CardDescription>Despesas deste mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl text-red-500">
            {centsToBrl(stats.monthlyExpense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">
              Cartões de Crédito
            </CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
              <CreditCard className="size-5 text-purple-500" />
            </div>
          </div>
          <CardDescription>Total devido nos cartões</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl text-red-500">
            {centsToBrl(stats.creditCardsBalance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
