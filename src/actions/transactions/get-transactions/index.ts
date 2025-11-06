'use server';

import { desc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { schema } from '@/database/schema';
import { auth } from '@/lib/auth';
import type { Transaction } from './schema';

export const getTransactions = async (): Promise<Transaction[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const transactions = await db
    .select({
      id: schema.transactions.id,
      name: schema.transactions.name,
      date: schema.transactions.date,
      amountInCents: schema.transactions.amountInCents,
      type: schema.transactions.type,
      status: schema.transactions.status,
      categoryId: schema.transactions.categoryId,
      categoryName: schema.categories.name,
      categoryIcon: schema.categories.icon,
    })
    .from(schema.transactions)
    .where(eq(schema.transactions.userId, session.user.id))
    .leftJoin(
      schema.categories,
      eq(schema.transactions.categoryId, schema.categories.id)
    )
    .orderBy(desc(schema.transactions.date));

  return transactions;
};
