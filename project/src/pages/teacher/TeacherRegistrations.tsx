import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, ActionIcon, Stack, Paper, Skeleton } from '@mantine/core'
import { IconCheck, IconX, IconUserPlus } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { Student } from '../../types'

export default function TeacherRegistrations() {
  const { user } = useAuth()
  const [pendingStudents, setPendingStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getPendingStudents().then((res) => {
      setPendingStudents(res)
      setLoading(false)
    })
  }, [])

  const handleApprove = async (id: string) => {
    if (!user) return
    await mockApi.approveStudent(id, { id: user.id, name: user.name, role: user.role })
    setPendingStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleReject = async (id: string) => {
    if (!user) return
    await mockApi.rejectStudent(id, { id: user.id, name: user.name, role: user.role })
    setPendingStudents((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) {
    return <Skeleton height={300} />
  }

  return (
    <div>
      <PageHeader
        title="Pending Registrations"
        subtitle="Review and verify newly registered student accounts"
      />

      <Card withBorder padding="lg" radius="md">
        {pendingStudents.length === 0 ? (
          <Paper p="xl" style={{ textAlign: 'center' }}>
            <IconUserPlus size={48} color="#94a3b8" style={{ marginBottom: 12 }} />
            <Text fw={600} size="lg">No Pending Registrations</Text>
            <Text size="sm" c="dimmed">All student registrations have been reviewed.</Text>
          </Paper>
        ) : (
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student Name</Table.Th>
                <Table.Th>Email Address</Table.Th>
                <Table.Th>Age / DOB</Table.Th>
                <Table.Th>Guardian Contact</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pendingStudents.map((s) => (
                <Table.Tr key={s.id}>
                  <Table.Td><Text fw={600} size="sm">{s.name}</Text></Table.Td>
                  <Table.Td><Text size="xs" c="dimmed">{s.email}</Text></Table.Td>
                  <Table.Td><Text size="xs">{s.age} yrs ({s.dob})</Text></Table.Td>
                  <Table.Td>
                    <Text size="xs">{s.profile?.guardianName || 'N/A'}</Text>
                    <Text size="xs" c="dimmed">{s.profile?.guardianPhone}</Text>
                  </Table.Td>
                  <Table.Td><Badge color="orange" size="sm">PENDING</Badge></Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <Button color="teal" size="xs" leftSection={<IconCheck size={14} />} onClick={() => handleApprove(s.id)}>
                        Approve
                      </Button>
                      <Button color="red" variant="light" size="xs" leftSection={<IconX size={14} />} onClick={() => handleReject(s.id)}>
                        Reject
                      </Button>
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
