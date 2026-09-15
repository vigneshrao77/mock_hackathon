import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, Skeleton } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { HealthCheck, Student } from '../../types'

export default function TeacherHealthChecks() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      mockApi.getHealthChecks(),
      mockApi.getStudents(),
    ]).then(([checks, stus]) => {
      setHealthChecks(checks)
      setStudents(stus)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  const getStudentName = (id: string) => students.find((s) => s.id === id)?.name || id

  return (
    <div>
      <PageHeader
        title="Student Health Checks"
        subtitle="Monitor nutritional, BMI, and biometric routine checks for students"
      />

      <Card withBorder padding="lg" radius="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Last Check</Table.Th>
              <Table.Th>Next Check</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {healthChecks.map((h) => (
              <Table.Tr key={h.id}>
                <Table.Td><Text fw={600} size="sm">{getStudentName(h.studentId)}</Text></Table.Td>
                <Table.Td><Text size="sm">{h.title}</Text></Table.Td>
                <Table.Td><Text size="xs">{new Date(h.lastCheckDate).toLocaleDateString()}</Text></Table.Td>
                <Table.Td><Text size="xs">{new Date(h.nextCheckDate).toLocaleDateString()}</Text></Table.Td>
                <Table.Td>
                  <Badge color={h.status === 'COMPLETED' ? 'teal' : h.status === 'DUE' ? 'orange' : 'red'}>
                    {h.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  )
}
