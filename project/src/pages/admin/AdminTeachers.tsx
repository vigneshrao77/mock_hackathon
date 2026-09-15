import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Skeleton, Avatar } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Teacher } from '../../types'

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getTeachers().then((res) => {
      setTeachers(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Teacher Management" subtitle="Manage teaching staff and assigned subject permissions" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Teacher Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Employee ID</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {teachers.map((t) => (
              <Table.Tr key={t.id}>
                <Table.Td>
                  <Group gap="xs">
                    <Avatar src={t.avatar} radius="xl" size="sm" color="teal">{t.name.slice(0, 2)}</Avatar>
                    <Text size="sm" fw={600}>{t.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="xs">{t.email}</Text></Table.Td>
                <Table.Td><Text size="xs">{t.employeeId}</Text></Table.Td>
                <Table.Td><Badge color="teal">ACTIVE</Badge></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
