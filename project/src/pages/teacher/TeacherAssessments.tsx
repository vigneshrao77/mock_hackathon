import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton, ActionIcon, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { IconClipboardCheck, IconPlus, IconEye, IconTrash, IconEdit } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assessment } from '../../types'

const statusColor: Record<string, string> = {
  PUBLISHED: 'teal',
  DRAFT: 'gray',
  ARCHIVED: 'orange',
}

export default function TeacherAssessments() {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  const load = () =>
    mockApi.getAssessments().then((res) => {
      setAssessments(res)
      setLoading(false)
    })

  useEffect(() => { load() }, [])

  const handleDelete = (a: Assessment) => {
    modals.openConfirmModal({
      title: 'Delete Assessment',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{a.title}</strong>? This cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        // remove from local state (mockApi has no delete, so filter client-side)
        setAssessments((prev) => prev.filter((x) => x.id !== a.id))
        notifications.show({ color: 'green', message: `"${a.title}" deleted.` })
      },
    })
  }

  const handleTogglePublish = async (a: Assessment) => {
    const newStatus = a.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await mockApi.updateAssessment(a.id, { status: newStatus })
    setAssessments((prev) => prev.map((x) => x.id === a.id ? { ...x, status: newStatus } : x))
    notifications.show({
      color: newStatus === 'PUBLISHED' ? 'teal' : 'gray',
      message: `"${a.title}" is now ${newStatus}.`,
    })
  }

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Assessments"
        subtitle="Create and manage tests, quizzes, and multimedia evaluations"
        breadcrumbs={[{ label: 'Dashboard', href: '/teacher/dashboard' }, { label: 'Assessments' }]}
        action={
          <Button
            color="teal"
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/teacher/assessments/create')}
          >
            New Assessment
          </Button>
        }
      />

      <Card withBorder padding="lg" radius="md">
        {assessments.length === 0 ? (
          <Group justify="center" py="xl" direction="column" align="center" gap="xs">
            <IconClipboardCheck size={40} color="var(--mantine-color-gray-5)" />
            <Text c="dimmed" size="sm">No assessments yet. Create your first one!</Text>
            <Button mt="xs" size="sm" color="teal" leftSection={<IconPlus size={14} />}
              onClick={() => navigate('/teacher/assessments/create')}>
              Create Assessment
            </Button>
          </Group>
        ) : (
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Total Marks</Table.Th>
                <Table.Th>Pass Score</Table.Th>
                <Table.Th>Questions</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assessments.map((a) => (
                <Table.Tr key={a.id}>
                  <Table.Td>
                    <Text fw={600} size="sm">{a.title}</Text>
                    {a.description && (
                      <Text size="xs" c="dimmed" lineClamp={1}>{a.description}</Text>
                    )}
                  </Table.Td>
                  <Table.Td><Text size="sm">{a.totalMarks}</Text></Table.Td>
                  <Table.Td><Text size="sm">{a.passScore} ({Math.round((a.passScore / a.totalMarks) * 100)}%)</Text></Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">{a.questions.length} Qs</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Tooltip label={a.status === 'PUBLISHED' ? 'Click to unpublish' : 'Click to publish'}>
                      <Badge
                        color={statusColor[a.status] ?? 'gray'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleTogglePublish(a)}
                      >
                        {a.status}
                      </Badge>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <Tooltip label="View / Grade submissions">
                        <ActionIcon
                          variant="subtle" color="blue"
                          onClick={() => navigate(`/teacher/assessments/${a.id}`)}
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Edit">
                        <ActionIcon
                          variant="subtle" color="gray"
                          onClick={() => navigate(`/teacher/assessments/${a.id}/edit`)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="subtle" color="red"
                          onClick={() => handleDelete(a)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </div>
  )
}
