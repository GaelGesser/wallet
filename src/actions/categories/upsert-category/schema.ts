import { z } from 'zod';

export const upsertCategorySchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
  description: z.string().optional(),
});

export type UpsertCategorySchema = z.infer<typeof upsertCategorySchema>;
