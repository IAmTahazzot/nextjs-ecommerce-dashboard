import prismadb from '@/lib/prismadb';
import { CatForm } from '@/app/(dashboard)/[storeId]/(routes)/categories/[catId]/components/cat-form';

const CatPage = async ({
  params,
}: {
  params: { catId: string; storeId: string };
}) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.catId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CatForm billboards={billboards} initialData={categories} />
      </div>
    </div>
  );
};

export default CatPage;
