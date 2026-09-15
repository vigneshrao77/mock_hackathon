import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Progress as MantineProgress, Badge, Skeleton } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Student } from '../../types'

export default function TeacherProgress() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getStudents().then((res) => {
      setStudents(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Student Class Progress Analytics"
        subtitle="Track overall progress, completion rates, and average assessment scores"
      />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>Overall Completion</Table.Th>
              <Table.Th>Assessment Avg</Table.Th>
              <Table.Th>Assignment Avg</Table.Th>
              <Table.Th>Discipline Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {students.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Td><Text fw={600} size="sm">{s.name}</Text></Table.Td>
                <Table.Td>
                  <Group gap="xs" style={{ width: 160 }}>
                    <MantineProgress value={s.overallProgress} size="sm" color="navy" style={{ flex: 1 }} />
                    <Text size="xs" fw={600}>{s.overallProgress}%</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Badge color="blue" variant="light">{s.assessmentAverage}%</Badge></Table.Td>
                <Table.Td><Badge color="teal" variant="light">{s.assignmentAverage}%</Badge></Table.Td>
                <Table.Td><Text size="sm" fw={600}>{s.disciplineScore} pts</Text></Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
