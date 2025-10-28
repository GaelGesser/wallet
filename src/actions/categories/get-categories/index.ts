'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { categories } from '@/database/schema/categories';
import { auth } from '@/lib/auth';
import type { Category } from './schema';

export const getCategories = async (): Promise<Category[]> => {
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
      description: categories.description,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
      userId: categories.userId,
    })
    .from(categories)
    .where(eq(categories.userId, session.user.id));
};
