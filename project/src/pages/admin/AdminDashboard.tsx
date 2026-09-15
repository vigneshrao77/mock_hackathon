import { useState, useEffect } from 'react'
import { Grid, Card, Text, Group, Button, Stack, Table, Badge, Skeleton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconUsers, IconSchool, IconShield, IconChartDots, IconArrowRight, IconHistory } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { Student, Teacher, AuditLog } from '../../types'

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      mockApi.getStudents(),
      mockApi.getTeachers(),
      mockApi.getAuditLogs(),
    ]).then(([stus, tchs, logs]) => {
      setStudents(stus)
      setTeachers(tchs)
      setAuditLogs(logs)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Admin Control Center"
        subtitle="System overview, user management, audit trails, and program analytics"
      />

      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Students" value={students.length} icon={IconUsers} color="blue" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Teachers" value={teachers.length} icon={IconSchool} color="teal" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Audit Events" value={auditLogs.length} icon={IconHistory} color="purple" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="System Status" value="Healthy" icon={IconShield} color="green" />
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <Text fw={600} size="md">Recent System Audit Logs</Text>
              <Button variant="subtle" size="xs" rightSection={<IconArrowRight size={14} />} onClick={() => navigate('/admin/audit')}>
                View Audit Trail
              </Button>
            </Group>

            <Table verticalSpacing="xs">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {auditLogs.slice(0, 5).map((log) => (
                  <Table.Tr key={log.id}>
                    <Table.Td><Text size="sm" fw={500}>{log.userName}</Text></Table.Td>
                    <Table.Td><Text size="xs">{log.action}</Text></Table.Td>
                    <Table.Td><Text size="xs" c="dimmed">{new Date(log.date).toLocaleTimeString()}</Text></Table.Td>
                    <Table.Td><Badge color="teal" size="xs">{log.status}</Badge></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder padding="lg" radius="md">
            <Text fw={600} size="md" mb="md">Quick Management</Text>
            <Stack gap="xs">
              <Button color="navy" variant="light" leftSection={<IconUsers size={16} />} onClick={() => navigate('/admin/students')}>
                Manage Students ({students.length})
              </Button>
              <Button color="teal" variant="light" leftSection={<IconSchool size={16} />} onClick={() => navigate('/admin/teachers')}>
                Manage Teachers ({teachers.length})
              </Button>

            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
