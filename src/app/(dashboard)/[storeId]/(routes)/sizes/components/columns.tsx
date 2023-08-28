import { ColumnDef } from '@tanstack/table-core';
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/cell-action';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
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