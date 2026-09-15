import { Pagination as MantinePagination, Group, Text, Select } from '@mantine/core'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
  onPageSizeChange?: (size: number) => void
}

export function Pagination({ page, totalPages, onPageChange, totalItems, pageSize, onPageSizeChange }: PaginationProps) {
  if (totalItems === 0) return null
  return (
    <Group justify="space-between" mt="md" wrap="wrap">
      <Text size="xs" c="dimmed">
        Showing {Math.min((page - 1) * pageSize + 1, totalItems)}–{Math.min(page * pageSize, totalItems)} of {totalItems}
      </Text>
      <Group gap="sm" wrap="wrap">
        {onPageSizeChange && (
          <Select
            size="xs"
            value={String(pageSize)}
            onChange={(v) => onPageSizeChange(Number(v) || 10)}
            data={[{ value: '5', label: '5' }, { value: '10', label: '10' }, { value: '20', label: '20' }, { value: '50', label: '50' }]}
            w={70}
          />
        )}
        <MantinePagination page={page} total={totalPages} onChange={onPageChange} size="sm" />
      </Group>
    </Group>
  )
}
