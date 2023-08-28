import BillBoardClient from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/client';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import ProductClient from '@/app/(dashboard)/[storeId]/(routes)/products/components/client';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className={'flex-col'}>
      <div className='flex-1 container mt-5'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
