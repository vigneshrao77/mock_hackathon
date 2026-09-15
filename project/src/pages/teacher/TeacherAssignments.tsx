import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconClipboardList, IconPlus, IconEye } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assignment } from '../../types'

export default function TeacherAssignments() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getAssignments().then((res) => {
      setAssignments(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="Manage assigned homework and practical tasks"
        action={
          <Button color="navy" leftSection={<IconPlus size={16} />} onClick={() => navigate('/teacher/assignments/create')}>
            New Assignment
          </Button>
        }
      />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Max Marks</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assignments.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td><Text fw={600} size="sm">{a.title}</Text></Table.Td>
                <Table.Td><Text size="sm">{a.maxMarks}</Text></Table.Td>
                <Table.Td><Text size="xs">{new Date(a.dueDate).toLocaleDateString()}</Text></Table.Td>
                <Table.Td><Badge color={a.status === 'PUBLISHED' ? 'teal' : 'gray'}>{a.status}</Badge></Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Button variant="subtle" size="xs" leftSection={<IconEye size={14} />} onClick={() => navigate(`/teacher/assignments/${a.id}`)}>
                    View Details
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
