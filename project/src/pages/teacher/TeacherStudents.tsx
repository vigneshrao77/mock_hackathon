import { useState, useEffect } from 'react'
import { Card, Table, Text, Group, Badge, Button, TextInput, Progress, Skeleton, Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconSearch, IconEye, IconUser } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Student } from '../../types'

export default function TeacherStudents() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockApi.getStudents().then((res) => {
      setStudents(res)
      setLoading(false)
    })
  }, [])

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Student Directory"
        subtitle="Manage registered students, track overall progress and academic standing"
      />

      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search students by name or email..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, maxWidth: 400 }}
          />
        </Group>

        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Student</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Overall Progress</Table.Th>
              <Table.Th>Assessment Avg</Table.Th>
              <Table.Th>Discipline Score</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Td>
                  <Group gap="xs">
                    <Avatar src={s.avatar} radius="xl" size="sm" color="navy">
                      {s.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text size="sm" fw={600}>{s.name}</Text>
                      <Text size="xs" c="dimmed">{s.email}</Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge color={s.status === 'ACTIVE' ? 'teal' : s.status === 'PENDING_VERIFICATION' ? 'orange' : 'gray'}>
                    {s.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" style={{ width: 140 }}>
                    <Progress value={s.overallProgress} size="sm" color="navy" style={{ flex: 1 }} />
                    <Text size="xs" fw={500}>{s.overallProgress}%</Text>
                  </Group>
                </Table.Td>
                <Table.Td><Text size="sm" fw={500}>{s.assessmentAverage}%</Text></Table.Td>
                <Table.Td><Badge variant="light" color="blue">{s.disciplineScore} pts</Badge></Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Button variant="subtle" size="xs" leftSection={<IconEye size={14} />} onClick={() => navigate(`/teacher/students/${s.id}`)}>
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
