import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, TextInput, Skeleton, Avatar } from '@mantine/core'
import { IconSearch, IconEye } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Student } from '../../types'

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getStudents().then((res) => {
      setStudents(res)
      setLoading(false)
    })
  }, [])

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Student Management" subtitle="Admin directory of registered students across all cohorts" />

      <Card withBorder padding="lg" radius="md">
        <TextInput
          placeholder="Search students..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb="md"
          style={{ maxWidth: 400 }}
        />

        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Overall Progress</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Td>
                  <Group gap="xs">
                    <Avatar src={s.avatar} radius="xl" size="sm" color="navy">{s.name.slice(0, 2)}</Avatar>
                    <Text size="sm" fw={600}>{s.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="xs">{s.email}</Text></Table.Td>
                <Table.Td><Badge color={s.status === 'ACTIVE' ? 'teal' : 'orange'}>{s.status}</Badge></Table.Td>
                <Table.Td><Text size="sm" fw={500}>{s.overallProgress}%</Text></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
