'use server';

import { and, eq, not } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { wallets } from '@/database/schema/wallets';
import { auth } from '@/lib/auth';
import { type UpsertAccountSchema, upsertAccountSchema } from './schema';

export const upsertAccount = async (data: UpsertAccountSchema) => {
  upsertAccountSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { id, name, type, color, icon, description, isActive, isDefault } =
    data;

  const userId = session.user.id;

  if (isDefault) {
    await db
      .update(wallets)
      .set({ isDefault: false })
      .where(eq(wallets.userId, userId));
  }

  if (id) {
    const [account] = await db
      .select()
      .from(wallets)
      .where(
        and(
          eq(wallets.name, name.trim()),
          eq(wallets.userId, userId),
          not(eq(wallets.id, id))
        )
      );

    if (account) {
      return {
        success: false,
        message: 'Essa conta já existe',
      };
    }

    const [updatedAccount] = await db
      .update(wallets)
      .set({
        name: name.trim(),
        type,
        color,
        icon,
        description,
        isActive,
        isDefault,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, id))
      .returning();

    return {
      success: true,
      data: updatedAccount,
      message: 'Conta atualizada com sucesso',
    };
  }

  const [accountExists] = await db
    .select()
    .from(wallets)
    .where(and(eq(wallets.name, name.trim()), eq(wallets.userId, userId)));

  if (accountExists) {
    return {
      success: false,
      message: 'Essa conta já existe',
    };
  }

  const [newAccount] = await db
    .insert(wallets)
    .values({
      name: name.trim(),
      type,
      color,
      icon,
      description,
      isActive,
      isDefault,
      userId,
    })
    .returning();

  return {
    success: true,
    data: newAccount,
    message: 'Conta criada com sucesso',
  };
};
