import { z } from 'zod';

// This is a example schema by action exampleAction
export const exampleSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
});

export type ExampleSchema = z.infer<typeof exampleSchema>;
