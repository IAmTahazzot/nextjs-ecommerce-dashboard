'use client';

import { Store } from '@prisma/client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Heading } from '@/app/(dashboard)/components/heading';
import * as Z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/Modal/alert-modal';
import ApiAlert from '@/app/(dashboard)/components/api-alert';
import { Separator } from '@/components/ui/separator';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = Z.object({
  name: Z.string().min(1),
});

type SettingsFormValues = Z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store updated 🎉');
    } catch (error) {
      toast.error('Unable to update the store');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store has been delete! ✅');
    } catch (error) {
      console.log('ERROR ON DELETE STORE:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeleteStore}
        loading={loading}
      />

      <div className={'flex items-center justify-between'}>
        <Heading title={'Settings'} description={'Manage store preferences'} />
        <Button
          disabled={loading}
          onClick={() => setOpen(true)}
          variant={'destructive'}
          size={'sm'}
        >
          <Trash className={'h-4 w-4'} />
        </Button>
      </div>

      <div className={'mt-5'}></div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={'Store name'}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <Button className={'mt-5'}>Save changes</Button>
        </form>
      </Form>

      <Separator className={'my-5'} />

      <ApiAlert
        title={'API_KEY'}
        description={`${origin}/api/stores/${params.storeId}`}
        variant={'public'}
      />
    </>
  );
};

export default SettingsForm;
