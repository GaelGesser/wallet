import { hash, verify } from 'argon2';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { schema } from '@/database/schema';

const MIN_PASSWORD_LENGTH = 8;

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', usePlural: true, schema }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    password: {
      hash: (password) => hash(password),
      verify: ({ hash: hashToVerify, password: passwordToVerify }) =>
        verify(hashToVerify, passwordToVerify),
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Verificar se é uma requisição de login
      if (ctx.path === '/sign-in/email') {
        try {
          // Buscar o usuário pelo email para verificar a role
          const email = ctx.body?.email;
          if (email) {
            const user = await db
              .select({ role: schema.users.role })
              .from(schema.users)
              .where(eq(schema.users.email, email))
              .limit(1);

            // Verificar se o usuário existe e se a role não é 'NONE'
            if (user.length > 0 && user[0].role === 'NONE') {
              throw new APIError('FORBIDDEN', {
                message:
                  'Acesso negado. Sua conta não possui permissões suficientes.',
              });
            }
          }
        } catch (error) {
          // Se for um APIError que já foi lançado, re-lançar
          if (error instanceof APIError) {
            throw error;
          }

          console.error('Erro ao verificar role do usuário:', error);
          throw new APIError('INTERNAL_SERVER_ERROR', {
            message: 'Erro interno do servidor',
          });
        }
      }
    }),
  },
});
