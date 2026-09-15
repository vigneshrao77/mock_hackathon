import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Divider } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import {
  IconPackage, IconVideo, IconFileText, IconMusic, IconLink, IconTextRecognition,
  IconClipboardCheck, IconArrowRight, IconChevronLeft, IconCheck, IconClock,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { ContentType } from '../../types'

const contentIcons: Record<ContentType, typeof IconVideo> = {
  video: IconVideo,
  document: IconFileText,
  audio: IconMusic,
  link: IconLink,
  text: IconTextRecognition,
}

const contentColors: Record<ContentType, string> = {
  video: 'red',
  document: 'blue',
  audio: 'grape',
  link: 'cyan',
  text: 'gray',
}

function formatDuration(seconds?: number) {
  if (!seconds) return ''
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

export default function StudentModuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: module, loading: moduleLoading, error: moduleError, refetch } = useAsync(
    () => mockApi.getModule(id!), [id]
  )
  const { data: subject } = useAsync(
    () => module ? mockApi.getSubject(module.subjectId) : Promise.resolve(null),
    [module?.subjectId]
  )
  const { data: contentItems } = useAsync(
    () => mockApi.getContentByModule(id!), [id]
  )
  const { data: assessments } = useAsync(
    () => mockApi.getAssessmentsByModule(id!), [id]
  )
  const { data: progress } = useAsync(() => mockApi.getProgress(user!.id), [user?.id])

  const loading = moduleLoading

  if (loading) return <LoadingState message="Loading module..." />
  if (moduleError) return <ErrorState message={moduleError} onRetry={refetch} />
  if (!module) {
    return (
      <div>
        <PageHeader title="Module Not Found" />
        <EmptyState
          icon={IconPackage}
          title="Module not found"
          message="The module you are looking for may have been removed."
          action={<Button variant="light" onClick={() => navigate('/student/subjects')}>Back to subjects</Button>}
        />
      </div>
    )
  }

  const moduleProgress = (progress || []).find((p) => p.moduleId === module.id)
  const completedIds = moduleProgress?.completedContentIds || []
  const pct = moduleProgress?.completionPercentage || 0
  const publishedContent = (contentItems || []).filter((c) => c.status === 'PUBLISHED')
  const moduleAssessments = (assessments || []).filter((a) => a.status === 'PUBLISHED')

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => subject ? navigate(`/student/subjects/${subject.id}`) : navigate('/student/subjects')}
        mb="sm"
      >
        Back to {subject ? subject.name : 'Subject'}
      </Button>

      <PageHeader
        title={module.title}
        subtitle={module.description}
        breadcrumbs={[
          { label: 'Subjects', href: '/student/subjects' },
          subject ? { label: subject.name, href: `/student/subjects/${subject.id}` } : { label: 'Subject' },
          { label: module.title },
        ]}
      />

      <Card withBorder shadow="sm" padding="lg" radius="md" mb="lg">
        <Group justify="space-between" align="center" wrap="wrap">
          <Stack gap={2}>
            <Text fw={600} size="sm">Module Progress</Text>
            <Text size="xs" c="dimmed">
              {completedIds.length} of {publishedContent.length} {publishedContent.length === 1 ? 'resource' : 'resources'} completed
            </Text>
          </Stack>
          <Box style={{ minWidth: 240 }}>
            <ProgressBar value={pct} label="Completion" size="md" />
          </Box>
        </Group>
      </Card>

      <Text fw={700} size="lg" mb="md">Learning Resources</Text>

      {publishedContent.length === 0 ? (
        <EmptyState
          icon={IconFileText}
          title="No resources available"
          message="Content for this module has not been published yet."
        />
      ) : (
        <Stack gap="sm">
          {publishedContent.map((content, idx) => {
            const Icon = contentIcons[content.type]
            const isComplete = completedIds.includes(content.id)
            return (
              <Card
                key={content.id}
                withBorder
                padding="lg"
                radius="md"
                style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}
                onClick={() => navigate(`/student/content/${content.id}`)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Group gap="md" align="center" style={{ flex: 1, minWidth: 0 }}>
                    <ThemeIcon size={44} radius="md" variant="light" color={isComplete ? 'teal' : contentColors[content.type]}>
                      {isComplete ? <IconCheck size={22} /> : <Icon size={22} />}
                    </ThemeIcon>
                    <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                      <Group gap="sm">
                        <Text fw={600} size="sm">{idx + 1}. {content.title}</Text>
                        <Badge variant="light" size="xs" color={contentColors[content.type]} tt="capitalize">
                          {content.type}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" lineClamp={1}>{content.description}</Text>
                      <Group gap="xs">
                        {content.duration && (
                          <Group gap={4}>
                            <IconClock size={12} color="#94a3b8" />
                            <Text size="xs" c="dimmed">{formatDuration(content.duration)}</Text>
                          </Group>
                        )}
                        <Text size="xs" c="dimmed">· {dayjs(content.createdAt).format('MMM D, YYYY')}</Text>
                      </Group>
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

      {moduleAssessments.length > 0 && (
        <>
          <Divider my="lg" />
          <Card withBorder shadow="sm" padding="lg" radius="md" style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
            <Group justify="space-between" align="center" wrap="wrap">
              <Group gap="md" align="center">
                <ThemeIcon size={48} radius="md" color="orange" variant="light">
                  <IconClipboardCheck size={24} />
                </ThemeIcon>
                <Stack gap={2}>
                  <Text fw={700}>Assessments Available</Text>
                  <Text size="sm" c="dimmed">
                    {moduleAssessments.length} {moduleAssessments.length === 1 ? 'assessment' : 'assessments'} ready for this module
                  </Text>
                </Stack>
              </Group>
              <Group gap="sm">
                {moduleAssessments.map((a) => (
                  <Button
                    key={a.id}
                    variant="light"
                    color="orange"
                    onClick={() => navigate(`/student/assessments/${a.id}`)}
                    rightSection={<IconArrowRight size={14} />}
                  >
                    {a.title}
                  </Button>
                ))}
              </Group>
            </Group>
          </Card>
        </>
      )}
    </div>
  )
}
