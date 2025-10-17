'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

const MIN_PASSWORD_LENGTH = 8;

const signInSchema = z.object({
  email: z.email('Endereço de e-mail inválido.'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
    ),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  // const router = useRouter();
  const form = useForm<SignInSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: SignInSchema) => {
    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Login realizado com sucesso!');
          // router.push('/');
        },
        onError: (ctx) => {
          console.log(ctx.error.code);

          if (ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            toast.error('E-mail ou senha inválidos.');

            return;
          }

          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                className="flex flex-col items-center gap-2 font-medium"
                href="/sign-up"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Wallet className="size-8 text-primary" />
                </div>
                <span className="sr-only">Wallet</span>
              </Link>
              <h1 className="font-bold text-xl">Seja bem-vindo ao Wallet</h1>
              <FieldDescription className="text-xs">
                Não tem uma conta? <Link href="/sign-up">Crie uma conta</Link>
              </FieldDescription>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Digite seu endereço de e-mail para fazer login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Digite sua senha para fazer login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Field>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? <Spinner /> : 'Entrar'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
      <FieldDescription className="px-6 text-center text-xs">
        Ao continuar, você concorda com nossos{' '}
        <a href="/terms-of-service">Termos de Serviço</a> e{' '}
        <a href="/privacy-policy">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
}
