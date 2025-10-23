'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

import { type ExampleSchema, exampleSchema } from './schema';

// This is a example action
export const exampleAction = async (data: ExampleSchema) => {
  exampleSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return {
    message: 'Example created successfully',
  };
};
