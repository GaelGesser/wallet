'use server';

import { and, eq, isNull, not, or } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/database';
import { categories } from '@/database/schema/categories';
import { auth } from '@/lib/auth';
import { type UpsertCategorySchema, upsertCategorySchema } from './schema';

export const upsertCategory = async (data: UpsertCategorySchema) => {
  upsertCategorySchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { id, name, description, icon } = data;

  const userId = session.user.id;

  if (id) {
    const [categoryExists] = await db
    .select()
    .from(categories)
    .where(
        and(
          eq(categories.name, name.trim().toLowerCase()),
          eq(categories.userId, userId),
          not(eq(categories.id, id))
      )
    );

  if (categoryExists) {
    return {
      success: false,
      message: 'Essa categoria já existe',
    };
  }
    const [updatedCategory] = await db
      .update(categories)
      .set({
        name: name.trim().toLowerCase(),
        description,
        icon,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    return {
      success: true,
      data: updatedCategory,
      message: 'Categoria atualizada com sucesso',
    };
  }

  const [categoryExists] = await db
    .select()
    .from(categories)
    .where(
        and(
          eq(categories.name, name.trim().toLowerCase()),
          eq(categories.userId, userId)
      )
    );

  if (categoryExists) {
    return {
      success: false,
      message: 'Essa categoria já existe',
    };
  }

  const [newCategory] = await db
    .insert(categories)
    .values({
      name: name.trim().toLowerCase(),
      description,
      icon,
      userId,
    })
    .returning();

  return {
    success: true,
    data: newCategory,
    message: 'Categoria criada com sucesso',
  };
};
