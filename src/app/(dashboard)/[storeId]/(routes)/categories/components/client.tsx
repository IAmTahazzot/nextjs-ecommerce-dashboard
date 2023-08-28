'use client';

import { Heading } from '@/app/(dashboard)/components/heading';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import {
  CategoryColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/categories/components/columns';

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          <span>Add New</span>
        </Button>
      </div>
      <Separator className={'mt-5'} />
      <DataTable columns={columns} data={data} searchKey={'name'} />
    </>
  );
};

export default CategoryClient;
