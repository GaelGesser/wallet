import { z } from 'zod';

export const upsertAccountSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
  type: z.enum(['checking', 'savings', 'credit', 'cash'], {
    message: 'Tipo é obrigatório.',
  }),
  color: z.string().min(1, {
    message: 'Cor é obrigatória.',
  }),
  icon: z.string().min(1, {
    message: 'Ícone é obrigatório.',
  }),
  description: z.string().optional(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
});

export type UpsertAccountSchema = z.infer<typeof upsertAccountSchema>;
