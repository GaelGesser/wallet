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

const signUpSchema = z.object({
  email: z.email('Endereço de e-mail inválido.'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
    ),
  name: z.string().min(1, 'Nome é obrigatório.'),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<SignUpSchema>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async ({ email, password, name }: SignUpSchema) => {
    await authClient.signUp.email({
      email,
      password,
      name,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Cadastro realizado com sucesso!');
        },
        onError: (ctx) => {
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
                href="/sign-in"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Wallet className="size-8 text-primary" />
                </div>
                <span className="sr-only">Wallet</span>
              </Link>
              <h1 className="font-bold text-xl">Seja bem-vindo ao Wallet</h1>
              <FieldDescription className="text-xs">
                Já tem uma conta? <Link href="/sign-in">Faça login</Link>
              </FieldDescription>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Digite seu nome para fazer cadastro.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    Digite seu endereço de e-mail para fazer cadastro.
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
                    Digite sua senha para fazer cadastro.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Field>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? <Spinner /> : 'Cadastrar'}
              </Button>
            </Field>
          </FieldGroup>
          <FieldDescription className="px-6 text-center text-xs">
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms-of-service">Termos de Serviço</a> e{' '}
            <a href="/privacy-policy">Política de Privacidade</a>.
          </FieldDescription>
        </form>
      </Form>
    </div>
  );
}
