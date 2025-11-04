'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { wallets } from '@/database/schema/wallets';
import { auth } from '@/lib/auth';
import type { Account } from './schema';

export const getAccounts = async (): Promise<Account[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return await db
    .select({
      id: wallets.id,
      name: wallets.name,
      type: wallets.type,
      color: wallets.color,
      icon: wallets.icon,
      description: wallets.description,
      isActive: wallets.isActive,
      isDefault: wallets.isDefault,
      balanceInCents: wallets.balanceInCents,
      createdAt: wallets.createdAt,
      updatedAt: wallets.updatedAt,
      userId: wallets.userId,
    })
    .from(wallets)
    .where(eq(wallets.userId, session.user.id));
};
