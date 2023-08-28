'use client';

import { Heading } from '@/app/(dashboard)/components/heading';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { columns, ColorColumn } from './columns';
import React from 'react';

interface ColorProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors (${data.length})`}
          description='Manage colors for your store products'
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className={'mt-5'} />
      <DataTable columns={columns} data={data} searchKey={'name'} />
    </>
  );
};

export default ColorClient;
