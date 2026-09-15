import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Skeleton } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Subject } from '../../types'

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getSubjects().then((res) => {
      setSubjects(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Global Subject Catalog" subtitle="Overview of all registered course subjects" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Subject Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subjects.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Td><Text fw={600} size="sm">{s.name}</Text></Table.Td>
                <Table.Td><Text size="xs" c="dimmed">{s.description}</Text></Table.Td>
                <Table.Td><Badge color="blue">{s.status}</Badge></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
