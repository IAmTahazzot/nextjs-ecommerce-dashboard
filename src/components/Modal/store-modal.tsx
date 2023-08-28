'use client';

import * as Z from 'zod';
import { useForm } from 'react-hook-form';

import { Modal } from '@/components/Modal/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const formSchema = Z.object({
    name: Z.string().min(5),
  });

  const form = useForm<Z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: Z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);

      toast.success(response.data.name + ' has been created 🎉🥳');
      setTimeout(() => {
        window.location.assign(`/${response.data.id}`);
      }, 2000);
    } catch (error) {
      toast.error('Unable to create a shop, Try later.', {
        style: {
          backgroundColor: '#ffd9d9',
          border: '1px solid #ff7979',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={'Create store'}
      description={'Add a new store to manage products and categories'}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={'name'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={'E-commerce'}
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <FormMessage>
                        {form.formState.errors.name.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  type='button'
                  disabled={loading}
                  variant='outline'
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
