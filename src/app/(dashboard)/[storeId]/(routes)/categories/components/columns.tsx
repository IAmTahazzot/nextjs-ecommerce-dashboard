import { ColumnDef } from '@tanstack/table-core';
import { CellAction } from '@/app/(dashboard)/[storeId]/(routes)/categories/components/cell-action';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
