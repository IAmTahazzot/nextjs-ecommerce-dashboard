'use client';

import { Heading } from '@/app/(dashboard)/components/heading';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { SizeColumn, columns } from './columns';
import React from 'react';

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store products'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className={'mt-5'} />
      <DataTable columns={columns} data={data} searchKey={'name'} />
    </>
  );
};

export default SizeClient;
