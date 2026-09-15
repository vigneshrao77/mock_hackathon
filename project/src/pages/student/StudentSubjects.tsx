import { SimpleGrid, Card, Text, Group, Stack, ThemeIcon, Box, Badge } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { IconBook2, IconBooks, IconArrowRight } from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Subject } from '../../types'

export default function StudentSubjects() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: subjects, loading, error, refetch } = useAsync(() => mockApi.getSubjects(), [])
  const { data: progress } = useAsync(() => user ? mockApi.getProgress(user.id) : Promise.resolve([]), [user?.id])

  if (loading) return <LoadingState message="Loading subjects..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const publishedSubjects = (subjects || []).filter((s) => s.status === 'PUBLISHED')

  if (publishedSubjects.length === 0) {
    return (
      <div>
        <PageHeader title="My Subjects" subtitle="Browse your enrolled subjects and continue learning" />
        <EmptyState
          icon={IconBooks}
          title="No subjects available"
          message="Subjects will appear here once they are published by your teachers."
        />
      </div>
    )
  }

  const getSubjectProgress = (subject: Subject) => {
    const subjProgress = (progress || []).filter((p) => p.subjectId === subject.id)
    if (subjProgress.length === 0) return 0
    return Math.round(subjProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / subjProgress.length)
  }

  return (
    <div>
      <PageHeader
        title="My Subjects"
        subtitle="Browse your enrolled subjects and continue learning"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Subjects' }]}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {publishedSubjects.map((subject) => {
          const pct = getSubjectProgress(subject)
          return (
            <Card
              key={subject.id}
              withBorder
              shadow="sm"
              padding="lg"
              radius="md"
              style={{ cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onClick={() => navigate(`/student/subjects/${subject.id}`)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
            >
              <Group justify="space-between" align="flex-start" mb="sm">
                <ThemeIcon size={48} radius="md" color="navy" variant="light">
                  <IconBook2 size={24} />
                </ThemeIcon>
                <Badge variant="light" color="navy" size="sm">
                  {subject.moduleIds.length} {subject.moduleIds.length === 1 ? 'module' : 'modules'}
                </Badge>
              </Group>

              <Stack gap="xs">
                <Text fw={700} size="lg">{subject.name}</Text>
                <Text size="sm" c="dimmed" lineClamp={2}>{subject.description}</Text>
              </Stack>

              <Box mt="md">
                <ProgressBar value={pct} label="Your progress" />
              </Box>

              <Group justify="space-between" align="center" mt="md">
                <Text size="xs" c="dimmed">Created {dayjs(subject.createdAt).format('MMM D, YYYY')}</Text>
                <Group gap={4} c="navy">
                  <Text size="xs" fw={600}>Continue</Text>
                  <IconArrowRight size={14} />
                </Group>
              </Group>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  )
}
