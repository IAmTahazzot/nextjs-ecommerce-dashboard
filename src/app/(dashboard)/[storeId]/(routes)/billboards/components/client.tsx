'use client';

import { Heading } from '@/app/(dashboard)/components/heading';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import {
  BillboardColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns';

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className={'mt-5'} />
      <DataTable columns={columns} data={data} searchKey={'label'} />
    </>
  );
};

export default BillboardClient;
