'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Category } from '@/actions/categories/get-categories/schema';
import {
  type UpsertCategorySchema,
  upsertCategorySchema,
} from '@/actions/categories/upsert-category/schema';
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
import { Textarea } from '@/components/ui/textarea';
import { useUpsertCategory } from '@/hooks/mutations/use-upsert-category';
import { toast } from 'sonner';

interface UpsertCategoryFormProps {
  isOpen: boolean;
  category?: Category;
  onSuccess?: () => void;
}

const UpsertCategoryForm = ({
  category,
  isOpen,
  onSuccess,
}: UpsertCategoryFormProps) => {
  const mutation = useUpsertCategory();

  const form = useForm<UpsertCategorySchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertCategorySchema),
    defaultValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
    },
  });

  useEffect(() => {
    if (isOpen && category) {
      form.reset({
        name: category.name,
        description: category.description ?? '',
      });
    }
  }, [isOpen, form, category]);

  const onSubmit = async (values: UpsertCategorySchema) => {
    const result = await mutation.mutateAsync({...values, id: category?.id ?? undefined});
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
        <DialogTitle>
          {category ? category.name : 'Adicionar categoria'}
        </DialogTitle>
        <DialogDescription>
          {category
            ? 'Edite as informações dessa categoria.'
            : 'Adicione uma nova categoria.'}
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
                    placeholder="Informe um nome para a categoria"
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
                  <Textarea
                    placeholder="Informe uma descrição (opcional)"
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

export default UpsertCategoryForm;
