import { Badge, type MantineColor } from '@mantine/core'

const statusColors: Record<string, MantineColor> = {
  ACTIVE: 'green',
  PENDING_VERIFICATION: 'orange',
  REJECTED: 'red',
  INACTIVE: 'gray',
  DRAFT: 'gray',
  PUBLISHED: 'blue',
  ARCHIVED: 'red',
  NEW: 'blue',
  IN_PROGRESS: 'cyan',
  SUBMITTED: 'indigo',
  LATE: 'orange',
  GRADED: 'teal',
  OVERDUE: 'red',
  UPCOMING: 'blue',
  DUE: 'orange',
  COMPLETED: 'green',
  success: 'green',
  failed: 'red',
  ready: 'green',
  generating: 'orange',
}

export function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] || 'gray'
  return (
    <Badge color={color} variant="light" size="sm" tt="none">
      {status.replace(/_/g, ' ').toLowerCase()}
    </Badge>
  )
}
