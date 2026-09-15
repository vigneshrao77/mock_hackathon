import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Divider } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { IconBook2, IconPackage, IconArrowRight, IconChevronLeft, IconCheck } from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Module } from '../../types'

export default function StudentSubjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: subject, loading: subjectLoading, error: subjectError, refetch } = useAsync(
    () => mockApi.getSubject(id!), [id]
  )
  const { data: modules, loading: modulesLoading } = useAsync(
    () => mockApi.getModulesBySubject(id!), [id]
  )
  const { data: progress } = useAsync(() => mockApi.getProgress(user!.id), [user?.id])

  const loading = subjectLoading || modulesLoading

  if (loading) return <LoadingState message="Loading subject..." />
  if (subjectError) return <ErrorState message={subjectError} onRetry={refetch} />
  if (!subject) {
    return (
      <div>
        <PageHeader title="Subject Not Found" />
        <EmptyState
          icon={IconBook2}
          title="Subject not found"
          message="The subject you are looking for may have been removed."
          action={<Button variant="light" onClick={() => navigate('/student/subjects')}>Back to subjects</Button>}
        />
      </div>
    )
  }

  const publishedModules = (modules || []).filter((m) => m.status === 'PUBLISHED')
  const subjectProgress = (progress || []).filter((p) => p.subjectId === subject.id)
  const overallPct = subjectProgress.length > 0
    ? Math.round(subjectProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / subjectProgress.length)
    : 0

  const getModuleProgress = (module: Module) => {
    const mp = (progress || []).find((p) => p.moduleId === module.id)
    return mp?.completionPercentage || 0
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/student/subjects')}
        mb="sm"
      >
        Back to Subjects
      </Button>

      <PageHeader
        title={subject.name}
        subtitle={subject.description}
        breadcrumbs={[
          { label: 'Dashboard', href: '/student/dashboard' },
          { label: 'Subjects', href: '/student/subjects' },
          { label: subject.name },
        ]}
      />

      <Card withBorder shadow="sm" padding="lg" radius="md" mb="lg">
        <Group justify="space-between" align="center" wrap="wrap">
          <Group gap="md" align="center">
            <ThemeIcon size={56} radius="md" color="navy" variant="light">
              <IconBook2 size={28} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text fw={600} size="sm">Subject Progress</Text>
              <Text size="xs" c="dimmed">{publishedModules.length} {publishedModules.length === 1 ? 'module' : 'modules'} available</Text>
            </Stack>
          </Group>
          <Box style={{ minWidth: 220 }}>
            <ProgressBar value={overallPct} label="Overall completion" size="md" />
          </Box>
        </Group>
      </Card>

      <Text fw={700} size="lg" mb="md">Modules</Text>

      {publishedModules.length === 0 ? (
        <EmptyState
          icon={IconPackage}
          title="No modules available"
          message="Modules for this subject have not been published yet."
        />
      ) : (
        <Stack gap="sm">
          {publishedModules.map((module, idx) => {
            const pct = getModuleProgress(module)
            const isComplete = pct === 100
            return (
              <Card
                key={module.id}
                withBorder
                padding="lg"
                radius="md"
                style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}
                onClick={() => navigate(`/student/modules/${module.id}`)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
              >
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="md" align="flex-start" style={{ flex: 1, minWidth: 0 }}>
                    <ThemeIcon size={40} radius="md" variant="light" color={isComplete ? 'teal' : 'navy'}>
                      {isComplete ? <IconCheck size={20} /> : <Text fw={700} size="sm">{idx + 1}</Text>}
                    </ThemeIcon>
                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                      <Group gap="sm">
                        <Text fw={600}>{module.title}</Text>
                        <Badge variant="light" size="xs" color="gray">
                          {module.contentIds.length} {module.contentIds.length === 1 ? 'resource' : 'resources'}
                        </Badge>
                        {module.assessmentIds.length > 0 && (
                          <Badge variant="light" size="xs" color="orange">
                            {module.assessmentIds.length} {module.assessmentIds.length === 1 ? 'assessment' : 'assessments'}
                          </Badge>
                        )}
                      </Group>
                      <Text size="sm" c="dimmed" lineClamp={2}>{module.description}</Text>
                      <Box mt={6} style={{ maxWidth: 400 }}>
                        <ProgressBar value={pct} size="xs" showValue={false} />
                      </Box>
                    </Stack>
                  </Group>
                  <ThemeIcon size={32} radius="xl" variant="subtle" color="navy">
                    <IconArrowRight size={18} />
                  </ThemeIcon>
                </Group>
              </Card>
            )
          })}
        </Stack>
      )}

      <Divider my="lg" />
      <Text size="xs" c="dimmed">Subject created on {dayjs(subject.createdAt).format('MMMM D, YYYY')}</Text>
    </div>
  )
}
