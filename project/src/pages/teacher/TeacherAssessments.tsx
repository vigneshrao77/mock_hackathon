import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconClipboardCheck, IconEye } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assessment } from '../../types'

export default function TeacherAssessments() {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getAssessments().then((res) => {
      setAssessments(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Assessments"
        subtitle="View and manage tests, quizzes, and multimedia evaluation forms"
      />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Total Marks</Table.Th>
              <Table.Th>Pass Score</Table.Th>
              <Table.Th>Questions</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assessments.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td><Text fw={600} size="sm">{a.title}</Text></Table.Td>
                <Table.Td><Text size="sm">{a.totalMarks}</Text></Table.Td>
                <Table.Td><Text size="sm">{a.passScore}%</Text></Table.Td>
                <Table.Td><Badge variant="light" color="blue">{a.questions.length} Qs</Badge></Table.Td>
                <Table.Td><Badge color={a.status === 'PUBLISHED' ? 'teal' : 'gray'}>{a.status}</Badge></Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Button variant="subtle" size="xs" leftSection={<IconEye size={14} />} onClick={() => navigate(`/teacher/assessments/${a.id}`)}>
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
