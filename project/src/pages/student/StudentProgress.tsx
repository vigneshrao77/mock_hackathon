import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, SimpleGrid, Divider, List, Timeline, Progress } from '@mantine/core'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import {
  IconTrendingUp, IconClipboardCheck, IconClipboardList, IconActivity,
  IconBook2, IconCheck, IconAward, IconChartBar, IconCalendar, IconBulb,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Student } from '../../types'

const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#22c55e', '#ef4444', '#a855f7']

const eventIcons: Record<string, typeof IconCheck> = {
  content_completed: IconCheck,
  assessment_submitted: IconClipboardCheck,
  assignment_submitted: IconClipboardList,
  module_completed: IconBook2,
  login: IconActivity,
}

const eventColors: Record<string, string> = {
  content_completed: 'teal',
  assessment_submitted: 'orange',
  assignment_submitted: 'blue',
  module_completed: 'navy',
  login: 'gray',
}

export default function StudentProgress() {
  const { user } = useAuth()
  const student = user as Student

  const { data: subjects, loading: subjectsLoading, error, refetch } = useAsync(() => mockApi.getSubjects(), [])
  const { data: progress } = useAsync(() => user ? mockApi.getProgress(user.id) : Promise.resolve([]), [user?.id])
  const { data: events } = useAsync(() => user ? mockApi.getProgressEvents(user.id) : Promise.resolve([]), [user?.id])
  const { data: assessments } = useAsync(() => mockApi.getAssessments(), [])
  const { data: submissions } = useAsync(() => user ? mockApi.getAssessmentSubmissions(user.id) : Promise.resolve([]), [user?.id])
  const { data: assignments } = useAsync(() => user ? mockApi.getAssignmentsByStudent(user.id) : Promise.resolve([]), [user?.id])
  const { data: modules } = useAsync(() => mockApi.getModules(), [])

  if (subjectsLoading) return <LoadingState message="Loading progress data..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const publishedSubjects = (subjects || []).filter((s) => s.status === 'PUBLISHED')
  const allModules = modules || []

  // Subject progress data
  const subjectProgressData = publishedSubjects.map((s) => {
    const subjProgress = (progress || []).filter((p) => p.subjectId === s.id)
    const avg = subjProgress.length > 0
      ? Math.round(subjProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / subjProgress.length)
      : 0
    return { subject: s.name.length > 15 ? s.name.slice(0, 12) + '...' : s.name, score: avg, fullName: s.name }
  })

  // Assessment performance
  const assessmentPerformanceData = publishedSubjects.map((s) => {
    const subjSubs = (submissions || []).filter((sub) => {
      const assessment = (assessments || []).find((a) => a.id === sub.assessmentId)
      return assessment?.subjectId === s.id
    })
    const avg = subjSubs.length > 0
      ? Math.round(subjSubs.reduce((sum, sub) => sum + sub.percentage, 0) / subjSubs.length)
      : 0
    return { subject: s.name.length > 15 ? s.name.slice(0, 12) + '...' : s.name, score: avg, fullName: s.name }
  })

  // Assignment performance
  const gradedAssignments = (assignments || []).filter((a) => a.status === 'GRADED')
  const assignmentCompletionData = [
    { name: 'Completed', value: (assignments || []).filter((a) => ['SUBMITTED', 'LATE', 'GRADED'].includes(a.status)).length, color: '#22c55e' },
    { name: 'Pending', value: (assignments || []).filter((a) => ['NEW', 'IN_PROGRESS'].includes(a.status)).length, color: '#f59e0b' },
    { name: 'Overdue', value: (assignments || []).filter((a) => a.status === 'OVERDUE').length, color: '#ef4444' },
  ]

  // Completion stats
  const totalContent = allModules.reduce((sum, m) => sum + m.contentIds.length, 0)
  const completedContent = (progress || []).reduce((sum, p) => sum + p.completedContentIds.length, 0)
  const completedModules = (progress || []).filter((p) => p.completionPercentage === 100).length
  const totalModules = allModules.filter((m) => m.status === 'PUBLISHED').length
  const completedAssessments = (submissions || []).length
  const passedAssessments = (submissions || []).filter((s) => s.passed).length

  // Activity data for line chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(6 - i, 'day')
    const dayEvents = (events || []).filter((e) => dayjs(e.timestamp).isSame(date, 'day'))
    return { day: date.format('ddd'), activities: dayEvents.length }
  })

  return (
    <div>
      <PageHeader
        title="My Progress"
        subtitle="Track your learning journey and performance"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Progress' }]}
      />

      {/* Overview stats */}
      <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} spacing="md" mb="lg">
        <StatCard label="Overall Progress" value={`${student.overallProgress}%`} icon={IconTrendingUp} color="navy" />
        <StatCard label="Assessment Avg" value={`${student.assessmentAverage}%`} icon={IconClipboardCheck} color="orange" />
        <StatCard label="Assignment Avg" value={`${student.assignmentAverage}%`} icon={IconClipboardList} color="blue" />
        <StatCard label="Discipline Score" value={`${student.disciplineScore}`} icon={IconAward} color="yellow" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg" mb="lg">
        {/* Subject Progress Bars */}
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Group gap="sm">
              <ThemeIcon size={36} radius="md" color="navy" variant="light">
                <IconBook2 size={18} />
              </ThemeIcon>
              <Text fw={600}>Subject Progress</Text>
            </Group>
          </Group>
          {publishedSubjects.length === 0 ? (
            <EmptyState title="No subjects" message="No subject data available" />
          ) : (
            <Stack gap="md">
              {publishedSubjects.map((s) => {
                const subjProgress = (progress || []).filter((p) => p.subjectId === s.id)
                const avg = subjProgress.length > 0
                  ? Math.round(subjProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / subjProgress.length)
                  : 0
                return <ProgressBar key={s.id} value={avg} label={s.name} size="md" />
              })}
            </Stack>
          )}
        </Card>

        {/* Assessment Performance Chart */}
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group gap="sm" mb="md">
            <ThemeIcon size={36} radius="md" color="orange" variant="light">
              <IconClipboardCheck size={18} />
            </ThemeIcon>
            <Text fw={600}>Assessment Performance</Text>
          </Group>
          {assessmentPerformanceData.every((d) => d.score === 0) ? (
            <EmptyState title="No data yet" message="Complete assessments to see performance" />
          ) : (
            <Box style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={assessmentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
                    formatter={(value: number) => [`${value}%`, 'Score']}
                  />
                  <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg" mb="lg">
        {/* Assignment Completion Pie */}
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group gap="sm" mb="md">
            <ThemeIcon size={36} radius="md" color="blue" variant="light">
              <IconClipboardList size={18} />
            </ThemeIcon>
            <Text fw={600}>Assignment Status</Text>
          </Group>
          {assignmentCompletionData.every((d) => d.value === 0) ? (
            <EmptyState title="No assignments" message="No assignment data available" />
          ) : (
            <Box style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={assignmentCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {assignmentCompletionData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Card>

        {/* Activity Line Chart */}
        <Card withBorder shadow="sm" padding="lg" radius="md">
          <Group gap="sm" mb="md">
            <ThemeIcon size={36} radius="md" color="teal" variant="light">
              <IconActivity size={18} />
            </ThemeIcon>
            <Text fw={600}>Weekly Activity</Text>
          </Group>
          <Box style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={last7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="activities" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </SimpleGrid>

      {/* Completion Stats */}
      <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="sm" mb="lg">
        {[
          { label: 'Content Completed', value: `${completedContent}/${totalContent}`, color: 'navy' },
          { label: 'Modules Done', value: `${completedModules}/${totalModules}`, color: 'blue' },
          { label: 'Assessments Done', value: `${completedAssessments}`, color: 'orange' },
          { label: 'Assessments Passed', value: `${passedAssessments}`, color: 'teal' },
          { label: 'Assignments Graded', value: `${gradedAssignments.length}`, color: 'grape' },
          { label: 'Overall Rank', value: `#${student.leaderboardRank}`, color: 'yellow' },
        ].map((stat) => (
          <Card key={stat.label} withBorder padding="md" radius="md">
            <Stack gap={4} align="center">
              <Text size="xs" c="dimmed" ta="center">{stat.label}</Text>
              <Text fw={700} size="lg" c={stat.color as any}>{stat.value}</Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Activity Timeline */}
      <Card withBorder shadow="sm" padding="lg" radius="md">
        <Group gap="sm" mb="md">
          <ThemeIcon size={36} radius="md" color="navy" variant="light">
            <IconChartBar size={18} />
          </ThemeIcon>
          <Text fw={600}>Activity Timeline</Text>
        </Group>
        {(!events || events.length === 0) ? (
          <EmptyState icon={IconActivity} title="No activity yet" message="Your learning activities will appear here" />
        ) : (
          <Timeline active={0} bulletSize={28} lineWidth={2}>
            {(events || []).slice(0, 12).map((event) => {
              const Icon = eventIcons[event.type] || IconActivity
              return (
                <Timeline.Item
                  key={event.id}
                  bullet={<Icon size={14} />}
                  title={<Text size="sm" fw={500}>{event.description}</Text>}
                >
                  <Group gap="xs">
                    <Badge variant="light" size="xs" color={eventColors[event.type] || 'gray'} tt="capitalize">
                      {event.type.replace(/_/g, ' ')}
                    </Badge>
                    <Text size="xs" c="dimmed">{dayjs(event.timestamp).format('MMM D, h:mm A')}</Text>
                  </Group>
                </Timeline.Item>
              )
            })}
          </Timeline>
        )}
      </Card>
    </div>
  )
}
