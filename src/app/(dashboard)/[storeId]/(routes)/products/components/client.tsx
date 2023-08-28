'use client';

import { Heading } from '@/app/(dashboard)/components/heading';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import {
  ProductColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import React from 'react';

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className={'mt-5'} />
      <DataTable columns={columns} data={data} searchKey={'name'} />
    </>
  );
};

export default ProductClient;
