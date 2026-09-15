import { SimpleGrid, Card, Text, Group, Stack, Progress, Box, Button, Divider, List, ThemeIcon } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { StatCard } from '../../components/StatCard'
import { PageHeader } from '../../components/PageHeader'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState } from '../../components/States'
import { IconBook, IconClipboardCheck, IconClipboardList, IconTrophy, IconActivity, IconMessage, IconHeart, IconPlayerPlay, IconClock } from '@tabler/icons-react'
import dayjs from 'dayjs'

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: subjects, loading } = useAsync(() => mockApi.getSubjects(), [])
  const { data: assignments } = useAsync(() => user ? mockApi.getAssignmentsByStudent(user.id) : Promise.resolve([]), [user?.id])
  const { data: assessments } = useAsync(() => mockApi.getAssessments(), [])
  const { data: events } = useAsync(() => user ? mockApi.getProgressEvents(user.id) : Promise.resolve([]), [user?.id])
  const { data: leaderboard } = useAsync(() => mockApi.getLeaderboard(), [])
  const { data: notifs } = useAsync(() => user ? mockApi.getNotifications(user.id) : Promise.resolve([]), [user?.id])

  if (loading) return <LoadingState />

  const pendingAssessments = assessments?.filter((a) => a.status === 'PUBLISHED') || []
  const pendingAssignments = assignments?.filter((a) => a.status === 'NEW' || a.status === 'IN_PROGRESS') || []
  const myRank = leaderboard?.find((l) => l.studentId === user?.id)
  const recentMessages = notifs?.filter((n) => n.type === 'message').slice(0, 3) || []
  const upcomingDeadlines = assignments?.filter((a) => a.status !== 'GRADED' && a.status !== 'SUBMITTED').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 3) || []

  return (
    <div>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${user?.name}`} />
      <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} spacing="md" mb="lg">
        <StatCard label="Overall Progress" value={`${user?.overallProgress || 0}%`} icon={IconBook} color="navy" />
        <StatCard label="Pending Assessments" value={pendingAssessments.length} icon={IconClipboardCheck} color="orange" />
        <StatCard label="Pending Assignments" value={pendingAssignments.length} icon={IconClipboardList} color="blue" />
        <StatCard label="Leaderboard Rank" value={`#${myRank?.rank || '-'}`} icon={IconTrophy} color="yellow" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text fw={600}>Continue Learning</Text>
            <Button variant="subtle" size="xs" onClick={() => navigate('/student/subjects')}>View all</Button>
          </Group>
          <Stack gap="md">
            {subjects?.slice(0, 3).map((s) => (
              <Card key={s.id} withBorder padding="sm" radius="sm" style={{ cursor: 'pointer' }} onClick={() => navigate(`/student/subjects/${s.id}`)}>
                <Group justify="space-between" align="center">
                  <Box>
                    <Text size="sm" fw={600}>{s.name}</Text>
                    <Text size="xs" c="dimmed">{s.description}</Text>
                  </Box>
                  <ThemeIcon size={36} radius="md" color="navy" variant="light">
                    <IconPlayerPlay size={18} />
                  </ThemeIcon>
                </Group>
                <Box mt="sm">
                  <ProgressBar value={Math.round((s.moduleIds.length / 4) * 100)} label="Progress" />
                </Box>
              </Card>
            ))}
          </Stack>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Text fw={600} mb="md">Upcoming Deadlines</Text>
          {upcomingDeadlines.length === 0 ? (
            <EmptyState title="No deadlines" message="You're all caught up!" />
          ) : (
            <Stack gap="sm">
              {upcomingDeadlines.map((a) => (
                <Group key={a.id} justify="space-between" align="center">
                  <Box>
                    <Text size="sm" fw={500}>{a.title}</Text>
                    <Group gap="xs">
                      <IconClock size={12} color="#94a3b8" />
                      <Text size="xs" c="dimmed">Due {dayjs(a.dueDate).format('MMM D')}</Text>
                    </Group>
                  </Box>
                  <Button variant="light" size="xs" onClick={() => navigate(`/student/assignments/${a.id}`)}>Open</Button>
                </Group>
              ))}
            </Stack>
          )}
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Text fw={600}>Subject Progress</Text>
            <Button variant="subtle" size="xs" onClick={() => navigate('/student/progress')}>Details</Button>
          </Group>
          <Stack gap="sm">
            {subjects?.map((s) => (
              <ProgressBar key={s.id} value={Math.round((s.moduleIds.length / 4) * 100)} label={s.name} />
            ))}
          </Stack>
        </Card>

        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Text fw={600} mb="md">Recent Activity</Text>
          {events && events.length === 0 ? (
            <EmptyState title="No activity yet" />
          ) : (
            <List spacing="xs" size="sm" icon={<ThemeIcon size={20} radius="xl" color="navy" variant="light"><IconActivity size={12} /></ThemeIcon>}>
              {events?.slice(0, 5).map((e) => (
                <List.Item key={e.id}>
                  <Text size="xs">{e.description}</Text>
                  <Text size="xs" c="dimmed">{dayjs(e.timestamp).format('MMM D, h:mm A')}</Text>
                </List.Item>
              ))}
            </List>
          )}
          <Divider my="sm" />
          <Text fw={600} size="sm" mb="xs">Recent Messages</Text>
          {recentMessages.length === 0 ? (
            <Text size="xs" c="dimmed">No messages</Text>
          ) : (
            <Stack gap="xs">
              {recentMessages.map((m) => (
                <Group key={m.id} gap="xs" onClick={() => navigate('/student/chat')} style={{ cursor: 'pointer' }}>
                  <IconMessage size={14} color="#64748b" />
                  <Text size="xs" lineClamp={1}>{m.body}</Text>
                </Group>
              ))}
            </Stack>
          )}
        </Card>
      </SimpleGrid>

      <Card withBorder shadow="sm" padding="lg" radius="md" mt="md" style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ThemeIcon size={40} radius="md" color="blue" variant="light">
              <IconHeart size={20} />
            </ThemeIcon>
            <Box>
              <Text size="sm" fw={600}>Health Check Reminder</Text>
              <Text size="xs" c="dimmed">Your next health check is scheduled. Stay healthy!</Text>
            </Box>
          </Group>
          <Button variant="light" size="sm" onClick={() => navigate('/student/health')}>View Health</Button>
        </Group>
      </Card>
    </div>
  )
}
