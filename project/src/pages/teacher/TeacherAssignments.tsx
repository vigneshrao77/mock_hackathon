import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton, ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { IconClipboardList, IconPlus, IconEye, IconTrash } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assignment } from '../../types'
import dayjs from 'dayjs'

const statusColor: Record<string, string> = {
  NEW: 'gray',
  IN_PROGRESS: 'blue',
  SUBMITTED: 'cyan',
  LATE: 'orange',
  GRADED: 'teal',
  OVERDUE: 'red',
  PUBLISHED: 'teal',
  DRAFT: 'gray',
}

export default function TeacherAssignments() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  const load = () =>
    mockApi.getAssignments().then((res) => {
      setAssignments(res)
      setLoading(false)
    })

  useEffect(() => { load() }, [])

  const handleDelete = (a: Assignment) => {
    modals.openConfirmModal({
      title: 'Delete Assignment',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{a.title}</strong>? This cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setAssignments((prev) => prev.filter((x) => x.id !== a.id))
        notifications.show({ color: 'green', message: `"${a.title}" deleted.` })
      },
    })
  }

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="Create and manage assigned homework and practical tasks"
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher/dashboard' }, { label: 'Assignments' }]}
        action={
          <Button
            color="navy"
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/teacher/assignments/create')}
          >
            New Assignment
          </Button>
        }
      />

      <Card withBorder padding="lg" radius="md">
        {assignments.length === 0 ? (
          <Group justify="center" py="xl" align="center" gap="xs" style={{ flexDirection: 'column' }}>
            <IconClipboardList size={40} color="var(--mantine-color-gray-5)" />
            <Text c="dimmed" size="sm">No assignments yet. Create your first one!</Text>
            <Button mt="xs" size="sm" color="navy" leftSection={<IconPlus size={14} />}
              onClick={() => navigate('/teacher/assignments/create')}>
              Create Assignment
            </Button>
          </Group>
        ) : (
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Max Marks</Table.Th>
                <Table.Th>Due Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assignments.map((a) => {
                const isOverdue = new Date(a.dueDate) < new Date() && a.status === 'NEW'
                const daysLeft = dayjs(a.dueDate).diff(dayjs(), 'day')
                return (
                  <Table.Tr key={a.id}>
                    <Table.Td>
                      <Text fw={600} size="sm">{a.title}</Text>
                      {a.instructions && (
                        <Text size="xs" c="dimmed" lineClamp={1}>{a.instructions}</Text>
                      )}
                    </Table.Td>
                    <Table.Td><Text size="sm">{a.maxMarks}</Text></Table.Td>
                    <Table.Td>
                      <Text size="xs">{dayjs(a.dueDate).format('MMM D, YYYY')}</Text>
                      <Text size="xs" c={isOverdue ? 'red' : daysLeft <= 2 ? 'orange' : 'dimmed'}>
                        {isOverdue ? 'Overdue' : daysLeft <= 0 ? 'Due today' : `${daysLeft}d left`}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={statusColor[a.status] ?? 'gray'}>{a.status}</Badge>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Group gap="xs" justify="flex-end">
                        <Tooltip label="View submission & grade">
                          <ActionIcon variant="subtle" color="blue"
                            onClick={() => navigate(`/teacher/assignments/${a.id}`)}>
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(a)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </div>
  )
}
