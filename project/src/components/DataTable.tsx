import { Table, ScrollArea, Group, Text, Center } from '@mantine/core'
import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  width?: number | string
  render: (row: T) => ReactNode
  sortable?: boolean
  sortAccessor?: (row: T) => string | number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  emptyState?: ReactNode
}

export function DataTable<T>({ columns, data, rowKey, onRowClick, emptyState }: DataTableProps<T>) {
  return (
    <ScrollArea>
      <Table highlightOnHover={!!onRowClick} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key} style={{ width: col.width }}>
                {col.header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Center py={40}>
                  {emptyState || <Text c="dimmed">No data available</Text>}
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : (
            data.map((row) => (
              <Table.Tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map((col) => (
                  <Table.Td key={col.key}>{col.render(row)}</Table.Td>
                ))}
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
