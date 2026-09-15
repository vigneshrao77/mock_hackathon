import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Skeleton, Avatar } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Admin } from '../../types'

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getAdmins().then((res) => {
      setAdmins(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Administrators" subtitle="System administrator accounts and privileges" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Employee ID</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {admins.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td>
                  <Group gap="xs">
                    <Avatar src={a.avatar} radius="xl" size="sm" color="purple">{a.name.slice(0, 2)}</Avatar>
                    <Text size="sm" fw={600}>{a.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="xs">{a.email}</Text></Table.Td>
                <Table.Td><Text size="xs">{a.employeeId}</Text></Table.Td>
                <Table.Td><Badge color="purple">ADMIN</Badge></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
