import { useState, useMemo } from 'react'
import { Card, Text, Group, Stack, Badge, Button, Box, SimpleGrid, ThemeIcon } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { SearchFilterBar } from '../../components/SearchFilterBar'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { IconClipboardList, IconClock, IconArrowRight, IconCalendar, IconBook2 } from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Assignment, AssignmentStatus } from '../../types'

const statusOptions = [
  { value: 'NEW', label: 'New' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'LATE', label: 'Late' },
  { value: 'GRADED', label: 'Graded' },
  { value: 'OVERDUE', label: 'Overdue' },
]

export default function StudentAssignments() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const { data: assignments, loading, error, refetch } = useAsync(
    () => user ? mockApi.getAssignmentsByStudent(user.id) : Promise.resolve([]), [user?.id]
  )
  const { data: subjects } = useAsync(() => mockApi.getSubjects(), [])

  const getSubjectName = (subjectId?: string) =>
    (subjects || []).find((s) => s.id === subjectId)?.name || 'General'

  const filtered = useMemo(() => {
    let result = assignments || []
    if (search) {
      result = result.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.instructions.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (statusFilter) {
      result = result.filter((a) => a.status === statusFilter)
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [assignments, search, statusFilter])

  if (loading) return <LoadingState message="Loading assignments..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  if ((assignments || []).length === 0) {
    return (
      <div>
        <PageHeader title="Assignments" subtitle="View and submit your assignments" />
        <EmptyState
          icon={IconClipboardList}
          title="No assignments yet"
          message="Your teachers haven't assigned any work to you yet."
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="View and submit your assignments"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Assignments' }]}
      />

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search assignments..."
        filters={[
          { value: statusFilter, onChange: setStatusFilter, label: 'Status', options: statusOptions },
        ]}
        mb="lg"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={IconClipboardList}
          title="No matching assignments"
          message="Try adjusting your search or filters."
        />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {filtered.map((assignment) => {
            const isOverdue = assignment.status === 'OVERDUE'
            const isGraded = assignment.status === 'GRADED'
            const dueDate = dayjs(assignment.dueDate)
            const daysLeft = dueDate.diff(dayjs(), 'day')

            return (
              <Card
                key={assignment.id}
                withBorder
                shadow="sm"
                padding="lg"
                radius="md"
                style={{ cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
              >
                <Group justify="space-between" align="flex-start" mb="sm">
                  <ThemeIcon size={44} radius="md" color={isGraded ? 'teal' : isOverdue ? 'red' : 'navy'} variant="light">
                    <IconClipboardList size={22} />
                  </ThemeIcon>
                  <StatusBadge status={assignment.status} />
                </Group>

                <Stack gap="xs">
                  <Text fw={700} size="md" lineClamp={1}>{assignment.title}</Text>
                  <Group gap="xs">
                    <ThemeIcon size={20} radius="sm" variant="subtle" color="navy">
                      <IconBook2 size={12} />
                    </ThemeIcon>
                    <Text size="xs" c="dimmed">{getSubjectName(assignment.subjectId)}</Text>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={2}>{assignment.instructions}</Text>
                </Stack>

                <Stack gap="xs" mt="md">
                  <Group justify="space-between">
                    <Group gap={4}>
                      <IconCalendar size={14} color="#94a3b8" />
                      <Text size="xs" c="dimmed">Due {dueDate.format('MMM D, YYYY')}</Text>
                    </Group>
                    <Text size="xs" fw={600} c={isOverdue ? 'red' : daysLeft <= 3 ? 'orange' : 'dimmed'}>
                      {isOverdue ? 'Overdue' : daysLeft <= 0 ? 'Due today' : `${daysLeft}d left`}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Max marks</Text>
                    <Badge variant="light" size="sm" color="navy">{assignment.maxMarks}</Badge>
                  </Group>
                  {assignment.attachments.length > 0 && (
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">Attachments</Text>
                      <Text size="xs" fw={600}>{assignment.attachments.length}</Text>
                    </Group>
                  )}
                </Stack>

                <Button
                  fullWidth
                  mt="md"
                  variant="light"
                  color="navy"
                  rightSection={<IconArrowRight size={16} />}
                >
                  {isGraded ? 'View Result' : assignment.status === 'SUBMITTED' || assignment.status === 'LATE' ? 'View Submission' : 'Open Assignment'}
                </Button>
              </Card>
            )
          })}
        </SimpleGrid>
      )}
    </div>
  )
}
