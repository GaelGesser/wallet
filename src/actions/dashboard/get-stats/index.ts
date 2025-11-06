'use server';

import { eq, sql } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { schema } from '@/database/schema';
import { auth } from '@/lib/auth';
import type { DashboardStats } from './schema';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const [stats] = await db
    .select({
      totalIncome:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'income' AND ${schema.transactions.status} = 'paid' THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'total_income'
        ),
      totalExpense:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'expense' AND ${schema.transactions.status} = 'paid' THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'total_expense'
        ),
      pendingIncome:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'income' AND ${schema.transactions.status} = 'pending' THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'pending_income'
        ),
      pendingExpense:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'expense' AND ${schema.transactions.status} = 'pending' THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'pending_expense'
        ),
      totalCreditCardsBalance:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.status} = 'paid' AND ${schema.transactions.walletId} IS NOT NULL AND ${schema.wallets.type} = 'credit' THEN CASE WHEN ${schema.transactions.type} = 'expense' THEN ${schema.transactions.amountInCents} ELSE 0 END ELSE 0 END), 0)`.as(
          'total_credit_cards_balance'
        ),
    })
    .from(schema.transactions)
    .leftJoin(
      schema.wallets,
      eq(schema.transactions.walletId, schema.wallets.id)
    )
    .where(eq(schema.transactions.userId, userId));

  const totalBalance = Number(stats.totalIncome) - Number(stats.totalExpense);

  return {
    totalIncome: Number(stats.totalIncome),
    totalExpense: Number(stats.totalExpense),
    totalBalance,
    pendingIncome: Number(stats.pendingIncome),
    pendingExpense: Number(stats.pendingExpense),
    totalCreditCardsBalance: Number(stats.totalCreditCardsBalance),
  };
};
