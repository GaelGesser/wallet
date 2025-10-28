'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage: string;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg border text-foreground">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border-b" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="border-r bg-muted/30 px-4 py-3 text-left font-semibold text-xs last:border-r-0"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={`border-b ${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="border-r px-4 py-3 text-xs last:border-r-0"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
