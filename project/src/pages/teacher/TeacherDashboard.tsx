import { useState, useEffect } from 'react'
import { Grid, Card, Text, Group, Button, Stack, Progress, Table, Badge, ActionIcon, Skeleton, Paper } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import {
  IconUsers, IconUserPlus, IconClipboardCheck, IconClipboardList,
  IconArrowRight, IconCheck, IconX, IconStethoscope
} from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { Student, Assignment, HealthCheck } from '../../types'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [pendingStudents, setPendingStudents] = useState<Student[]>([])
  const [activeStudents, setActiveStudents] = useState<Student[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      mockApi.getPendingStudents(),
      mockApi.getStudents(),
      mockApi.getAssignments(),
      mockApi.getHealthChecks(),
    ]).then(([pending, allStudents, asgs, healths]) => {
      setPendingStudents(pending)
      setActiveStudents(allStudents.filter((s) => s.status === 'ACTIVE'))
      setAssignments(asgs)
      setHealthChecks(healths)
      setLoading(false)
    })
  }, [])

  const handleApprove = async (id: string) => {
    if (!user) return
    await mockApi.approveStudent(id, { id: user.id, name: user.name, role: user.role })
    setPendingStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleReject = async (id: string) => {
    if (!user) return
    await mockApi.rejectStudent(id, { id: user.id, name: user.name, role: user.role })
    setPendingStudents((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) {
    return (
      <Stack gap="md">
        <Skeleton height={40} width={250} />
        <Grid>
          <Grid.Col span={3}><Skeleton height={100} /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={100} /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={100} /></Grid.Col>
          <Grid.Col span={3}><Skeleton height={100} /></Grid.Col>
        </Grid>
      </Stack>
    )
  }

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name || 'Teacher'}`}
        subtitle="Manage student registrations, coursework, assessments, and health status"
        action={
          <Button color="navy" leftSection={<IconClipboardList size={16} />} onClick={() => navigate('/teacher/assignments/create')}>
            Create Assignment
          </Button>
        }
      />

      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Active Students" value={activeStudents.length} icon={IconUsers} color="blue" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Pending Registrations" value={pendingStudents.length} icon={IconUserPlus} color="orange" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Active Assignments" value={assignments.length} icon={IconClipboardCheck} color="teal" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Health Checks Due" value={healthChecks.filter((h) => h.status === 'DUE' || h.status === 'OVERDUE').length} icon={IconStethoscope} color="red" />
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        {/* Pending Registrations section */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <div>
                <Text fw={600} size="md">Pending Student Registrations</Text>
                <Text size="xs" c="dimmed">Review and approve new student account applications</Text>
              </div>
              <Button variant="subtle" size="xs" rightSection={<IconArrowRight size={14} />} onClick={() => navigate('/teacher/registrations')}>
                View All ({pendingStudents.length})
              </Button>
            </Group>

            {pendingStudents.length === 0 ? (
              <Text size="sm" c="dimmed" py="md">No pending registrations requiring approval.</Text>
            ) : (
              <Table verticalSpacing="xs">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Age</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pendingStudents.slice(0, 5).map((s) => (
                    <Table.Tr key={s.id}>
                      <Table.Td><Text size="sm" fw={500}>{s.name}</Text></Table.Td>
                      <Table.Td><Text size="xs" c="dimmed">{s.email}</Text></Table.Td>
                      <Table.Td><Text size="xs">{s.age} yrs</Text></Table.Td>
                      <Table.Td style={{ textAlign: 'right' }}>
                        <Group gap={6} justify="flex-end">
                          <ActionIcon color="teal" variant="light" onClick={() => handleApprove(s.id)} title="Approve">
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon color="red" variant="light" onClick={() => handleReject(s.id)} title="Reject">
                            <IconX size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Card>
        </Grid.Col>

        {/* Recent Students Overview */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder padding="lg" radius="md">
            <Group justify="space-between" mb="md">
              <Text fw={600} size="md">Top Students</Text>
              <Button variant="subtle" size="xs" rightSection={<IconArrowRight size={14} />} onClick={() => navigate('/teacher/students')}>
                All Students
              </Button>
            </Group>

            <Stack gap="xs">
              {activeStudents.slice(0, 5).map((s) => (
                <Paper key={s.id} withBorder p="xs" radius="sm">
                  <Group justify="space-between">
                    <div>
                      <Text size="sm" fw={600}>{s.name}</Text>
                      <Text size="xs" c="dimmed">Progress: {s.overallProgress}%</Text>
                    </div>
                    <Badge color="teal" variant="light">{s.assessmentAverage}% Avg</Badge>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
