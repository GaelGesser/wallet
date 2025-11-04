'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { Account } from '@/actions/accounts/get-accounts/schema';
import {
  type UpsertAccountSchema,
  upsertAccountSchema,
} from '@/actions/accounts/upsert-account/schema';
import { IconPicker } from '@/components/common/icon-select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from '@/components/ui/textarea';
import { useUpsertAccount } from '@/hooks/mutations/use-upsert-account';

interface UpsertAccountFormProps {
  isOpen: boolean;
  account?: Account;
  onSuccess?: () => void;
}

const UpsertAccountForm = ({
  account,
  isOpen,
  onSuccess,
}: UpsertAccountFormProps) => {
  const mutation = useUpsertAccount();

  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(upsertAccountSchema),
    defaultValues: {
      name: account?.name ?? '',
      type: account?.type ?? 'checking',
      color: account?.color ?? '#3b82f6',
      icon: account?.icon ?? 'Wallet',
      description: account?.description ?? '',
      isActive: account?.isActive ?? true,
      isDefault: account?.isDefault ?? false,
    },
  });

  useEffect(() => {
    if (isOpen && account) {
      form.reset({
        name: account.name,
        type: account.type,
        color: account.color,
        icon: account.icon,
        description: account.description ?? '',
        isActive: account.isActive,
        isDefault: account.isDefault,
      });
    } else if (isOpen && !account) {
      form.reset({
        name: '',
        type: 'checking',
        color: '#3b82f6',
        icon: 'Wallet',
        description: '',
        isActive: true,
        isDefault: false,
      });
    }
  }, [isOpen, form, account]);

  const onSubmit = async (values: UpsertAccountSchema) => {
    const result = await mutation.mutateAsync({
      ...values,
      id: account?.id ?? undefined,
    });
    if (result.success) {
      toast.success(result.message);
      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{account ? account.name : 'Adicionar conta'}</DialogTitle>
        <DialogDescription>
          {account
            ? 'Edite as informações dessa conta.'
            : 'Adicione uma nova conta.'}
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
                    placeholder="Informe um nome para a conta"
                    {...field}
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checking">Conta Corrente</SelectItem>
                    <SelectItem value="savings">Poupança</SelectItem>
                    <SelectItem value="credit">Crédito</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <FormControl>
                    <IconPicker onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        className="h-9 w-20"
                        onChange={(e) => field.onChange(e.target.value)}
                        type="color"
                        value={field.value}
                      />
                      <Input
                        className="flex-1"
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="#3b82f6"
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informe uma descrição (opcional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Conta ativa</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Conta padrão</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

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

export default UpsertAccountForm;
