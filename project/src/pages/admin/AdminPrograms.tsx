import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Skeleton } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Program } from '../../types'

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getPrograms().then((res) => {
      setPrograms(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Academic Programs" subtitle="Manage school tracks, curriculums, and cohort groupings" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Program Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {programs.map((p) => (
              <Table.Tr key={p.id}>
                <Table.Td><Text fw={600} size="sm">{p.name}</Text></Table.Td>
                <Table.Td><Text size="xs" c="dimmed">{p.description}</Text></Table.Td>
                <Table.Td><Badge color={p.status === 'active' ? 'teal' : 'gray'}>{p.status}</Badge></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
