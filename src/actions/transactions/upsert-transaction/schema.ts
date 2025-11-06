import { z } from 'zod';

export const upsertTransactionSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
  date: z.date({
    message: 'Data é obrigatória.',
  }),
  description: z.string().optional(),
  amount: z.string().min(1, {
    message: 'Valor é obrigatório.',
  }),
  type: z.enum(['expense', 'income', 'transfer'], {
    message: 'Tipo é obrigatório.',
  }),
  status: z.enum(['paid', 'pending', 'canceled'], {
    message: 'Status é obrigatório.',
  }),
  categoryId: z.string().optional(),
  walletId: z.string().uuid({
    message: 'Carteira é obrigatória.',
  }),
});

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>;
