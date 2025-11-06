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

  const now = new Date();
  const FIRST_DAY_OF_MONTH = 1;
  const HOURS_IN_DAY = 23;
  const MINUTES_IN_HOUR = 59;
  const SECONDS_IN_MINUTE = 59;
  const NEXT_MONTH_OFFSET = 1;
  const LAST_DAY_OF_MONTH = 0;

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    FIRST_DAY_OF_MONTH
  );
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + NEXT_MONTH_OFFSET,
    LAST_DAY_OF_MONTH,
    HOURS_IN_DAY,
    MINUTES_IN_HOUR,
    SECONDS_IN_MINUTE
  );

  const [stats] = await db
    .select({
      accountBalance:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.status} = 'paid' AND ${schema.transactions.walletId} IS NOT NULL AND ${schema.wallets.type} != 'credit' THEN CASE WHEN ${schema.transactions.type} = 'income' THEN ${schema.transactions.amountInCents} WHEN ${schema.transactions.type} = 'expense' THEN -${schema.transactions.amountInCents} ELSE 0 END ELSE 0 END), 0)`.as(
          'account_balance'
        ),
      monthlyIncome:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'income' AND ${schema.transactions.status} != 'canceled' AND ${schema.transactions.date} >= ${startOfMonth} AND ${schema.transactions.date} <= ${endOfMonth} THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'monthly_income'
        ),
      monthlyExpense:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.type} = 'expense' AND ${schema.transactions.status} != 'canceled' AND ${schema.transactions.date} >= ${startOfMonth} AND ${schema.transactions.date} <= ${endOfMonth} THEN ${schema.transactions.amountInCents} ELSE 0 END), 0)`.as(
          'monthly_expense'
        ),
      creditCardsBalance:
        sql<number>`COALESCE(SUM(CASE WHEN ${schema.transactions.status} = 'paid' AND ${schema.transactions.walletId} IS NOT NULL AND ${schema.wallets.type} = 'credit' THEN CASE WHEN ${schema.transactions.type} = 'expense' THEN ${schema.transactions.amountInCents} ELSE 0 END ELSE 0 END), 0)`.as(
          'credit_cards_balance'
        ),
    })
    .from(schema.transactions)
    .leftJoin(
      schema.wallets,
      eq(schema.transactions.walletId, schema.wallets.id)
    )
    .where(eq(schema.transactions.userId, userId));

  return {
    accountBalance: Number(stats.accountBalance),
    monthlyIncome: Number(stats.monthlyIncome),
    monthlyExpense: Number(stats.monthlyExpense),
    creditCardsBalance: Number(stats.creditCardsBalance),
  };
};
