'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { transactions } from '@/database/schema/transactions';
import { brlToCents } from '@/helpers/money';
import { auth } from '@/lib/auth';
import type { UpsertTransactionSchema } from './schema';
import { upsertTransactionSchema } from './schema';

export const upsertTransaction = async (data: UpsertTransactionSchema) => {
  upsertTransactionSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { id, name, date, description, amount, type, categoryId, walletId } =
    data;
  const amountInCents = brlToCents(Number.parseFloat(amount));

  if (id) {
    const [updatedTransaction] = await db
      .update(transactions)
      .set({
        name,
        date,
        description,
        amountInCents,
        type,
        categoryId: categoryId && categoryId !== '' ? categoryId : null,
        walletId,
        updatedAt: new Date(),
      })
      .where(eq(transactions.id, id))
      .returning();

    return updatedTransaction;
  }

  const [newTransaction] = await db
    .insert(transactions)
    .values({
      name,
      date,
      description,
      amountInCents,
      type,
      categoryId: categoryId && categoryId !== '' ? categoryId : null,
      walletId,
      userId: session.user.id,
    })
    .returning();

  return newTransaction;
};
