import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton } from '@mantine/core'
import { IconDownload, IconFileText } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Report } from '../../types'

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getReports().then((res) => {
      setReports(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Generated Reports" subtitle="Exportable PDF and CSV summary reports for compliance and auditing" />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Report Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Generated At</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {reports.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td><Text fw={600} size="sm">{r.title}</Text></Table.Td>
                <Table.Td><Badge variant="light">{r.type}</Badge></Table.Td>
                <Table.Td><Text size="xs">{new Date(r.createdAt).toLocaleDateString()}</Text></Table.Td>
                <Table.Td><Badge color={r.status === 'ready' ? 'teal' : 'orange'}>{r.status}</Badge></Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Button variant="light" size="xs" leftSection={<IconDownload size={14} />}>
                    Download
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
