import { useState } from 'react'
import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Divider, Title, Grid } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { VideoPlayer, AudioPlayer } from '../../components/MediaPlayers'
import { notifications } from '@mantine/notifications'
import {
  IconVideo, IconFileText, IconMusic, IconLink, IconTextRecognition,
  IconClipboardCheck, IconArrowLeft, IconArrowRight, IconCheck, IconExternalLink,
  IconClock, IconChevronLeft,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { ContentItem, ContentType } from '../../types'

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
  return `${mins}m ${secs}s`
}

export default function StudentContentViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [marking, setMarking] = useState(false)

  const { data: content, loading, error, refetch } = useAsync(
    () => mockApi.getContentItem(id!), [id]
  )
  const { data: module } = useAsync(
    () => content ? mockApi.getModule(content.moduleId) : Promise.resolve(null),
    [content?.moduleId]
  )
  const { data: subject } = useAsync(
    () => module ? mockApi.getSubject(module.subjectId) : Promise.resolve(null),
    [module?.subjectId]
  )
  const { data: moduleContent } = useAsync(
    () => content ? mockApi.getContentByModule(content.moduleId) : Promise.resolve([] as ContentItem[]),
    [content?.moduleId]
  )
  const { data: assessments } = useAsync(
    () => content ? mockApi.getAssessmentsByModule(content.moduleId) : Promise.resolve([]),
    [content?.moduleId]
  )
  const { data: progress } = useAsync(() => mockApi.getProgress(user!.id), [user?.id])

  if (loading) return <LoadingState message="Loading content..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (!content) {
    return (
      <div>
        <PageHeader title="Content Not Found" />
        <EmptyState
          icon={IconFileText}
          title="Content not found"
          message="This resource may have been removed."
          action={<Button variant="light" onClick={() => navigate('/student/subjects')}>Back to subjects</Button>}
        />
      </div>
    )
  }

  const Icon = contentIcons[content.type]
  const moduleProgress = (progress || []).find((p) => p.moduleId === content.moduleId)
  const isComplete = moduleProgress?.completedContentIds.includes(content.id) || false

  const publishedContent = (moduleContent || []).filter((c) => c.status === 'PUBLISHED')
  const currentIndex = publishedContent.findIndex((c) => c.id === content.id)
  const prevContent = currentIndex > 0 ? publishedContent[currentIndex - 1] : null
  const nextContent = currentIndex >= 0 && currentIndex < publishedContent.length - 1 ? publishedContent[currentIndex + 1] : null
  const moduleAssessments = (assessments || []).filter((a) => a.status === 'PUBLISHED')

  const handleMarkComplete = async () => {
    setMarking(true)
    try {
      await mockApi.markContentComplete(user!.id, content.id, content.moduleId, subject?.id || '')
      notifications.show({ message: 'Content marked as complete!', color: 'green', size: 'sm' })
      refetch()
    } catch {
      notifications.show({ message: 'Failed to mark complete', color: 'red', size: 'sm' })
    } finally {
      setMarking(false)
    }
  }

  const renderContent = () => {
    switch (content.type) {
      case 'video':
        return <VideoPlayer url={content.url} title={content.title} />
      case 'audio':
        return <AudioPlayer url={content.url} title={content.title} />
      case 'document':
        return content.url ? (
          <Stack gap="sm">
            <Box
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                height: 500,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack align="center" gap="md">
                <IconFileText size={64} color="#94a3b8" />
                <Text size="sm" c="dimmed">Document preview not available</Text>
                <Button
                  component="a"
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconExternalLink size={14} />}
                >
                  Open document
                </Button>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <EmptyState icon={IconFileText} title="No document attached" />
        )
      case 'link':
        return content.url ? (
          <Stack gap="sm">
            <Box
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                height: 500,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack align="center" gap="md">
                <IconLink size={64} color="#94a3b8" />
                <Text size="sm" c="dimmed">External resource</Text>
                <Button
                  component="a"
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconExternalLink size={14} />}
                >
                  Open link in new tab
                </Button>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <EmptyState icon={IconLink} title="No link attached" />
        )
      case 'text':
        return (
          <Card withBorder padding="lg" radius="md">
            <Title order={4} mb="md">{content.title}</Title>
            <Text size="sm" style={{ lineHeight: 1.7 }}>
              {content.description || 'No text content available for this resource.'}
            </Text>
          </Card>
        )
      default:
        return <EmptyState icon={IconFileText} title="Unsupported content type" />
    }
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => module ? navigate(`/student/modules/${module.id}`) : navigate('/student/subjects')}
        mb="sm"
      >
        Back to {module ? module.title : 'Module'}
      </Button>

      <PageHeader
        title={content.title}
        subtitle={content.description}
        breadcrumbs={[
          { label: 'Subjects', href: '/student/subjects' },
          subject ? { label: subject.name, href: `/student/subjects/${subject.id}` } : { label: 'Subject' },
          module ? { label: module.title, href: `/student/modules/${module.id}` } : { label: 'Module' },
          { label: content.title },
        ]}
        action={
          <Badge variant="light" color={contentColors[content.type]} size="lg" tt="capitalize" leftSection={<Icon size={14} />}>
            {content.type}
          </Badge>
        }
      />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder shadow="sm" padding="lg" radius="md" mb="md">
            {renderContent()}
          </Card>

          {/* Navigation */}
          <Group justify="space-between" align="center" mb="lg">
            <Button
              variant="default"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => prevContent && navigate(`/student/content/${prevContent.id}`)}
              disabled={!prevContent}
            >
              Previous
            </Button>
            <Group gap="sm">
              {isComplete ? (
                <Badge variant="light" color="teal" size="lg" leftSection={<IconCheck size={14} />}>
                  Completed
                </Badge>
              ) : (
                <Button
                  color="navy"
                  loading={marking}
                  onClick={handleMarkComplete}
                  leftSection={<IconCheck size={16} />}
                >
                  Mark Complete
                </Button>
              )}
            </Group>
            <Button
              variant="default"
              rightSection={<IconArrowRight size={16} />}
              onClick={() => nextContent && navigate(`/student/content/${nextContent.id}`)}
              disabled={!nextContent}
            >
              Next
            </Button>
          </Group>

          {/* Resources section */}
          {publishedContent.length > 1 && (
            <Card withBorder padding="lg" radius="md">
              <Text fw={600} mb="sm">All Resources in this Module</Text>
              <Stack gap="xs">
                {publishedContent.map((c, i) => {
                  const CIcon = contentIcons[c.type]
                  const cComplete = moduleProgress?.completedContentIds.includes(c.id)
                  const isActive = c.id === content.id
                  return (
                    <Group
                      key={c.id}
                      gap="sm"
                      align="center"
                      onClick={() => navigate(`/student/content/${c.id}`)}
                      style={{
                        cursor: 'pointer',
                        padding: '8px 12px',
                        borderRadius: 6,
                        background: isActive ? '#eef2ff' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f8fafc' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <ThemeIcon size={28} radius="sm" variant="light" color={cComplete ? 'teal' : contentColors[c.type]}>
                        {cComplete ? <IconCheck size={14} /> : <CIcon size={14} />}
                      </ThemeIcon>
                      <Text size="sm" fw={isActive ? 600 : 400} lineClamp={1} style={{ flex: 1 }}>
                        {i + 1}. {c.title}
                      </Text>
                      <Text size="xs" c="dimmed">{c.type}</Text>
                    </Group>
                  )
                })}
              </Stack>
            </Card>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box>
          <Stack gap="md">
            <Card withBorder padding="lg" radius="md">
              <Text fw={600} size="sm" mb="sm">Details</Text>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Type</Text>
                  <Badge variant="light" size="xs" color={contentColors[content.type]} tt="capitalize">{content.type}</Badge>
                </Group>
                {content.duration && (
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Duration</Text>
                    <Group gap={4}><IconClock size={12} /><Text size="xs">{formatDuration(content.duration)}</Text></Group>
                  </Group>
                )}
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Created</Text>
                  <Text size="xs">{dayjs(content.createdAt).format('MMM D, YYYY')}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Status</Text>
                  <Text size="xs" fw={600} c={isComplete ? 'teal' : 'orange'}>{isComplete ? 'Completed' : 'In progress'}</Text>
                </Group>
              </Stack>
            </Card>

            {moduleAssessments.length > 0 && (
              <Card withBorder padding="lg" radius="md" style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
                <Group gap="sm" mb="sm">
                  <ThemeIcon size={36} radius="md" color="orange" variant="light">
                    <IconClipboardCheck size={18} />
                  </ThemeIcon>
                  <Text fw={600} size="sm">Assessments</Text>
                </Group>
                <Stack gap="xs">
                  {moduleAssessments.map((a) => (
                    <Button
                      key={a.id}
                      variant="light"
                      color="orange"
                      size="sm"
                      fullWidth
                      onClick={() => navigate(`/student/assessments/${a.id}`)}
                      rightSection={<IconArrowRight size={14} />}
                    >
                      {a.title}
                    </Button>
                  ))}
                </Stack>
              </Card>
            )}
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  )
}
