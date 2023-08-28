import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { SizeColumn } from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns';
import SizeClient from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/client';

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className={'flex-col'}>
      <div className='flex-1 container mt-5'>
        <SizeClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default SizePage;
