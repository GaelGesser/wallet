'use client';

import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
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
            <CardTitle className="font-medium text-base">Saldo Total</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <TrendingUp className="size-5 text-blue-500" />
            </div>
          </div>
          <CardDescription>Receitas - Despesas</CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              'font-semibold text-2xl',
              stats.totalBalance >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {centsToBrl(stats.totalBalance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">Receitas</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <ArrowUpRight className="size-5 text-green-500" />
            </div>
          </div>
          <CardDescription>Total de receitas pagas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl">
            {centsToBrl(stats.totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">Despesas</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
              <ArrowDownRight className="size-5 text-red-500" />
            </div>
          </div>
          <CardDescription>Total de despesas pagas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl">
            {centsToBrl(stats.totalExpense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-base">Cartões</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
              <CreditCard className="size-5 text-purple-500" />
            </div>
          </div>
          <CardDescription>Despesas dos cartões de crédito</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-2xl text-red-500">
            {centsToBrl(stats.totalCreditCardsBalance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
