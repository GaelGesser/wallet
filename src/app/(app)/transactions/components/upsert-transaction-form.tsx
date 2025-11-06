'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';
import { getCategories } from '@/actions/categories/get-categories';
import { upsertTransaction } from '@/actions/transactions/upsert-transaction';
import { getWallets } from '@/actions/wallets/get-wallets';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { transactions } from '@/database/schema/transactions';
import { centsToBrl } from '@/helpers/money';

const formSchema = z.object({
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
  categoryId: z.string().optional(),
  walletId: z.string().uuid({
    message: 'Carteira é obrigatória.',
  }),
});

interface UpsertTransactionFormProps {
  isOpen: boolean;
  transaction?: typeof transactions.$inferSelect;
  onSuccess?: () => void;
}

const UpsertTransactionForm = ({
  transaction,
  isOpen,
  onSuccess,
}: UpsertTransactionFormProps) => {
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [wallets, setWallets] = useState<Array<{ id: string; name: string }>>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      name: transaction?.name ?? '',
      description: transaction?.description ?? '',
      amount: transaction?.amountInCents
        ? centsToBrl(transaction.amountInCents).replace('R$', '').trim()
        : '',
      type: transaction?.type ?? 'expense',
      categoryId: transaction?.categoryId ?? undefined,
      walletId: transaction?.walletId ?? '',
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, walletsData] = await Promise.all([
          getCategories(),
          getWallets(),
        ]);
        setCategories(categoriesData);
        setWallets(walletsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    if (isOpen) {
      loadData();
      form.reset({
        date: transaction?.date ? new Date(transaction.date) : new Date(),
        name: transaction?.name ?? '',
        description: transaction?.description ?? '',
        amount: transaction?.amountInCents
          ? centsToBrl(transaction.amountInCents).replace('R$', '').trim()
          : '',
        type: transaction?.type ?? 'expense',
        categoryId: transaction?.categoryId ?? undefined,
        walletId: transaction?.walletId ?? '',
      });
    }
  }, [isOpen, form, transaction]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await upsertTransaction({
        ...values,
        id: transaction?.id,
      });

      toast.success('Transação salva com sucesso');
      form.reset();

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    }
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined
                        )
                      }
                      value={
                        field.value
                          ? field.value.toISOString().split('T')[0]
                          : ''
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe uma descrição (opcional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <NumericFormat
                    allowNegative={false}
                    customInput={Input}
                    decimalScale={2}
                    decimalSeparator=","
                    fixedDecimalScale
                    onValueChange={(values) => field.onChange(values.value)}
                    placeholder="R$ 0,00"
                    prefix="R$ "
                    thousandSeparator="."
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="expense">
                      <div className="size-2 rounded-full bg-red-500" /> Despesa
                    </SelectItem>
                    <SelectItem value="income">
                      <div className="size-2 rounded-full bg-green-500" />{' '}
                      Receita
                    </SelectItem>
                    <SelectItem value="transfer">
                      <div className="size-2 rounded-full bg-blue-500" />{' '}
                      Transferência
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria (opcional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="walletId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carteira</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma carteira" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
