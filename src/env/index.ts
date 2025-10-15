import z from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'),
});

export const env = envSchema.parse(process.env);
