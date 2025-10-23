'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { transactions } from '@/database/schema/transactions';

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome é obrigatório.',
  }),
});

interface UpsertTransactionFormProps {
  isOpen: boolean;
  transaction?: typeof transactions.$inferSelect;
}

const UpsertTransactionForm = ({
  transaction,
  isOpen,
}: UpsertTransactionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: transaction?.name ?? '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(transaction);
    }
  }, [isOpen, form, transaction]);

  // const upsertTransactionAction = useAction(upsertTransaction, {
  //   onSuccess: () => {
  //     toast.success('Transação salva com sucesso.');
  //     onSuccess();
  //   },
  //   onError: () => {
  //     toast.error('Erro ao salvar transação.');
  //   },
  // });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // upsertTransactionAction.execute({
    //   ...values,
    //   id: transaction?.id,
    // });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {transaction ? transaction.name : 'Adicionar transação'}
        </DialogTitle>
        <DialogDescription>
          {transaction
            ? 'Edite as informações dessa transação.'
            : 'Adicione uma nova transação.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe um nome para a transação"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button className="w-full" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertTransactionForm;
