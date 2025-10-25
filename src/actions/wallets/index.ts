'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { wallets } from '@/database/schema/wallets';
import { auth } from '@/lib/auth';

export const getWallets = async () => {
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
    })
    .from(wallets)
    .where(eq(wallets.userId, session.user.id));
};
