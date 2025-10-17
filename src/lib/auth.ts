import { hash, verify } from 'argon2';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
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
});
