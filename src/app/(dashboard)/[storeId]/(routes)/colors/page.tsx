import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { ColorColumn } from '@/app/(dashboard)/[storeId]/(routes)/colors/components/columns';
import ColorClient from '@/app/(dashboard)/[storeId]/(routes)/colors/components/client';

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColor: ColorColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className={'flex-col'}>
      <div className='flex-1 container mt-5'>
        <ColorClient data={formattedColor} />
      </div>
    </div>
  );
};

export default SizePage;
