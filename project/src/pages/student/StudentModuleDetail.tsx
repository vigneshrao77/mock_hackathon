import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Tabs } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { ProgressBar } from '../../components/ProgressBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import {
  IconPackage, IconVideo, IconFileText, IconMusic, IconLink, IconTextRecognition,
  IconClipboardCheck, IconClipboardList, IconArrowRight, IconChevronLeft,
  IconCheck, IconClock,
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
  const { data: progress } = useAsync(
    () => user ? mockApi.getProgress(user.id) : Promise.resolve([]), [user?.id]
  )
  // Module-scoped assignments for this student
  const { data: allAssignments } = useAsync(
    () => user ? mockApi.getAssignmentsByStudent(user.id) : Promise.resolve([]), [user?.id]
  )

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
  // Only assignments scoped to this module
  const moduleAssignments = (allAssignments || []).filter((a) => a.moduleId === module.id)

  const assignmentStatusColors: Record<string, string> = {
    NEW: 'blue', IN_PROGRESS: 'yellow', SUBMITTED: 'teal',
    LATE: 'orange', GRADED: 'green', OVERDUE: 'red',
  }

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

      {/* Module progress summary card */}
      <Card withBorder shadow="sm" padding="lg" radius="md" mb="lg">
        <Group justify="space-between" align="center" wrap="wrap">
          <Stack gap={2}>
            <Text fw={600} size="sm">Module Progress</Text>
            <Text size="xs" c="dimmed">
              {completedIds.length} of {publishedContent.length}{' '}
              {publishedContent.length === 1 ? 'resource' : 'resources'} completed
            </Text>
          </Stack>
          <Box style={{ minWidth: 240 }}>
            <ProgressBar value={pct} label="Completion" size="md" />
          </Box>
        </Group>
      </Card>

      {/* ── Tabs: Content / Assessments / Assignments ── */}
      <Tabs defaultValue="content" variant="outline" radius="md">
        <Tabs.List mb="md">
          <Tabs.Tab value="content" leftSection={<IconFileText size={16} />}>
            Content ({publishedContent.length})
          </Tabs.Tab>
          <Tabs.Tab value="assessments" leftSection={<IconClipboardCheck size={16} />}>
            Assessments ({moduleAssessments.length})
          </Tabs.Tab>
          <Tabs.Tab value="assignments" leftSection={<IconClipboardList size={16} />}>
            Assignments ({moduleAssignments.length})
          </Tabs.Tab>
        </Tabs.List>

        {/* ── Content Tab ── */}
        <Tabs.Panel value="content">
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
        </Tabs.Panel>

        {/* ── Assessments Tab ── */}
        <Tabs.Panel value="assessments">
          {moduleAssessments.length === 0 ? (
            <EmptyState
              icon={IconClipboardCheck}
              title="No assessments yet"
              message="Assessments for this module haven't been published yet."
            />
          ) : (
            <Stack gap="sm">
              {moduleAssessments.map((a) => (
                <Card
                  key={a.id}
                  withBorder
                  padding="lg"
                  radius="md"
                  style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', cursor: 'pointer' }}
                  onClick={() => navigate(`/student/assessments/${a.id}`)}
                >
                  <Group justify="space-between" align="center" wrap="wrap">
                    <Group gap="md" align="center">
                      <ThemeIcon size={48} radius="md" color="orange" variant="light">
                        <IconClipboardCheck size={24} />
                      </ThemeIcon>
                      <Stack gap={2}>
                        <Text fw={700}>{a.title}</Text>
                        <Text size="sm" c="dimmed">{a.description}</Text>
                        <Group gap="xs">
                          <Badge size="xs" variant="light" color="orange">{a.questions.length} questions</Badge>
                          <Badge size="xs" variant="light" color="blue">{a.totalMarks} marks</Badge>
                          <Badge size="xs" variant="light" color="teal">Pass: {a.passScore}</Badge>
                        </Group>
                      </Stack>
                    </Group>
                    <Button
                      variant="filled"
                      color="orange"
                      size="sm"
                      rightSection={<IconArrowRight size={14} />}
                      onClick={(e) => { e.stopPropagation(); navigate(`/student/assessments/${a.id}`) }}
                    >
                      Start
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Tabs.Panel>

        {/* ── Assignments Tab ── */}
        <Tabs.Panel value="assignments">
          {moduleAssignments.length === 0 ? (
            <EmptyState
              icon={IconClipboardList}
              title="No assignments for this module"
              message="Your teacher hasn't assigned any work for this module yet."
            />
          ) : (
            <Stack gap="sm">
              {moduleAssignments.map((a) => (
                <Card
                  key={a.id}
                  withBorder
                  padding="lg"
                  radius="md"
                  style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onClick={() => navigate(`/student/assignments/${a.id}`)}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}
                >
                  <Group justify="space-between" align="center" wrap="wrap">
                    <Group gap="md" align="center">
                      <ThemeIcon size={48} radius="md" color="indigo" variant="light">
                        <IconClipboardList size={24} />
                      </ThemeIcon>
                      <Stack gap={2}>
                        <Text fw={700}>{a.title}</Text>
                        <Text size="xs" c="dimmed" lineClamp={1}>{a.instructions}</Text>
                        <Group gap="xs">
                          <Badge size="xs" color={assignmentStatusColors[a.status] ?? 'gray'} variant="light">
                            {a.status.replace('_', ' ')}
                          </Badge>
                          <Text size="xs" c="dimmed">· Due: {dayjs(a.dueDate).format('MMM D, YYYY')}</Text>
                          <Text size="xs" c="dimmed">· {a.maxMarks} marks</Text>
                        </Group>
                      </Stack>
                    </Group>
                    <Button
                      variant="light"
                      color="indigo"
                      size="sm"
                      rightSection={<IconArrowRight size={14} />}
                    >
                      View
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
