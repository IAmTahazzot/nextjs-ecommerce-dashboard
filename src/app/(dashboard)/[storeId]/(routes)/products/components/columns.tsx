import { ColumnDef } from '@tanstack/table-core';
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/products/components/cell-action';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className={'flex items-center gap-x-2'}>
        {row.original.color}
        <div
          style={{ backgroundColor: row.original.color }}
          className={'p-4 rounded-full border'}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
