import { ColumnDef } from '@tanstack/table-core';
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/colors/components/cell-action';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className={'flex items-center'}>
        <div className={'min-w-[70px]'}>{row.original.value}</div>
        <div
          style={{ backgroundColor: row.original.value || '#fff' }}
          className={'p-4 rounded-full border border-slate-200'}
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
