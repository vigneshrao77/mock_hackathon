import { TextInput, Select, Group, Box } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface SearchFilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: { value: string | null; onChange: (value: string | null) => void; label: string; options: { value: string; label: string }[] }[]
  rightSlot?: ReactNode
}

export function SearchFilterBar({ searchValue, onSearchChange, searchPlaceholder = 'Search...', filters = [], rightSlot }: SearchFilterBarProps) {
  return (
    <Group gap="sm" wrap="wrap" align="flex-end" justify="space-between">
      <Group gap="sm" wrap="wrap" align="flex-end">
        <TextInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          w={260}
          maw="100%"
        />
        {filters.map((f, i) => (
          <Select
            key={i}
            label={f.label}
            placeholder="All"
            value={f.value}
            onChange={f.onChange}
            data={f.options}
            clearable
            w={180}
            maw="100%"
          />
        ))}
      </Group>
      {rightSlot && <Box>{rightSlot}</Box>}
    </Group>
  )
}
