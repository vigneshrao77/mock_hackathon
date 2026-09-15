import { useState, useEffect } from 'react'
import { Card, Table, Text, Badge, Skeleton } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { AuditLog } from '../../types'

export default function AdminAudit() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getAuditLogs().then((res) => {
      setLogs(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="System Audit Logs" subtitle="Security & compliance activity history log" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Action</Table.Th>
              <Table.Th>Details</Table.Th>
              <Table.Th>Timestamp</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {logs.map((log) => (
              <Table.Tr key={log.id}>
                <Table.Td><Text fw={600} size="sm">{log.userName}</Text></Table.Td>
                <Table.Td><Badge size="xs" color="gray">{log.role}</Badge></Table.Td>
                <Table.Td><Text size="xs">{log.action}</Text></Table.Td>
                <Table.Td><Text size="xs" c="dimmed">{log.details || '-'}</Text></Table.Td>
                <Table.Td><Text size="xs">{new Date(log.date).toLocaleString()}</Text></Table.Td>
                <Table.Td><Badge color="teal" size="xs">{log.status}</Badge></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
