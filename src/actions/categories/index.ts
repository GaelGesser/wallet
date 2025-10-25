'use server';

import { eq, isNull, or } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { categories } from '@/database/schema/categories';
import { auth } from '@/lib/auth';

export const getCategories = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return await db
    .select({
      id: categories.id,
      name: categories.name,
    })
    .from(categories)
    .where(
      or(eq(categories.userId, session.user.id), isNull(categories.userId))
    );
};
