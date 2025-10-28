import { z } from 'zod';

export const upsertCategorySchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
  description: z.string().optional(),
  icon: z.string().min(1, {
    message: 'Ícone é obrigatório.',
  }),
});

export type UpsertCategorySchema = z.infer<typeof upsertCategorySchema>;
