import { z } from 'zod';

export const upsertTransactionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
  date: z.date({
    required_error: 'Data é obrigatória.',
  }),
  description: z.string().optional(),
  amount: z.string().min(1, {
    message: 'Valor é obrigatório.',
  }),
  type: z.enum(['expense', 'income', 'transfer'], {
    required_error: 'Tipo é obrigatório.',
  }),
  categoryId: z.string().optional(),
  walletId: z.string().uuid({
    message: 'Carteira é obrigatória.',
  }),
});

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>;
