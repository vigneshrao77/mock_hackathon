import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card, Text, Group, Badge, Button, Stack, Tabs,
  ThemeIcon, Skeleton, ActionIcon, Tooltip,
} from '@mantine/core'
import {
  IconChevronLeft, IconVideo, IconFileText, IconHeadphones,
  IconChecklist, IconClipboardList, IconClipboardCheck, IconArrowRight,
} from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { EmptyState } from '../../components/States'
import { mockApi } from '../../services/mockApi'
import type { Module, ContentItem, Assessment, Assignment } from '../../types'

export default function TeacherModuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moduleItem, setModuleItem] = useState<Module | null>(null)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      mockApi.getModule(id),
      mockApi.getContentItemsByModule(id),
      mockApi.getAssessmentsByModule(id),
      mockApi.getAssignmentsByModule ? mockApi.getAssignmentsByModule(id) : Promise.resolve([]),
    ]).then(([m, items, asmts, asgns]) => {
      setModuleItem(m)
      setContentItems(items)
      setAssessments(asmts || [])
      setAssignments(asgns || [])
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={300} />
  if (!moduleItem) return <Text p="md">Module not found</Text>

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <IconVideo size={18} color="#2563eb" />
      case 'audio': return <IconHeadphones size={18} color="#7c3aed" />
      default: return <IconFileText size={18} color="#059669" />
    }
  }

  const statusColor = (s: string) =>
    s === 'PUBLISHED' ? 'teal' : s === 'DRAFT' ? 'gray' : 'orange'

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/subjects')}
        mb="sm"
      >
        Back to Subjects
      </Button>

      <PageHeader
        title={moduleItem.title}
        subtitle={moduleItem.description}
        action={<Badge color={statusColor(moduleItem.status)}>{moduleItem.status}</Badge>}
      />

      <Tabs defaultValue="content" variant="outline" radius="md">
        <Tabs.List mb="md">
          <Tabs.Tab value="content" leftSection={<IconFileText size={16} />}>
            Content ({contentItems.length})
          </Tabs.Tab>
          <Tabs.Tab value="assessments" leftSection={<IconClipboardCheck size={16} />}>
            Assessments ({assessments.length})
          </Tabs.Tab>
          <Tabs.Tab value="assignments" leftSection={<IconClipboardList size={16} />}>
            Assignments ({assignments.length})
          </Tabs.Tab>
        </Tabs.List>

        {/* ── Content Tab ── */}
        <Tabs.Panel value="content">
          {contentItems.length === 0 ? (
            <EmptyState
              icon={IconFileText}
              title="No content items"
              message="No content has been added to this module yet."
            />
          ) : (
            <Card withBorder padding="lg" radius="md">
              <Stack gap="xs">
                {contentItems.map((c) => (
                  <Group key={c.id} justify="space-between" p="sm" style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
                    <Group gap="sm">
                      {getIcon(c.type)}
                      <div>
                        <Text size="sm" fw={600}>{c.title}</Text>
                        <Text size="xs" c="dimmed">{c.description}</Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <Badge variant="light" size="sm">{c.type}</Badge>
                      <Badge variant="light" size="sm" color={statusColor(c.status)}>{c.status}</Badge>
                    </Group>
                  </Group>
                ))}
              </Stack>
            </Card>
          )}
        </Tabs.Panel>

        {/* ── Assessments Tab ── */}
        <Tabs.Panel value="assessments">
          {assessments.length === 0 ? (
            <EmptyState
              icon={IconClipboardCheck}
              title="No assessments"
              message="No assessments have been linked to this module yet."
            />
          ) : (
            <Stack gap="sm">
              {assessments.map((a) => (
                <Card
                  key={a.id}
                  withBorder
                  padding="md"
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/teacher/assessments/${a.id}`)}
                >
                  <Group justify="space-between" align="center">
                    <Group gap="sm" align="center">
                      <ThemeIcon size={40} radius="md" variant="light" color="orange">
                        <IconClipboardCheck size={20} />
                      </ThemeIcon>
                      <div>
                        <Text fw={600} size="sm">{a.title}</Text>
                        <Text size="xs" c="dimmed">
                          {a.questions.length} questions · {a.totalMarks} marks · Pass: {a.passScore}
                        </Text>
                      </div>
                    </Group>
                    <Group gap="xs">
                      <Badge size="sm" color={statusColor(a.status)}>{a.status}</Badge>
                      <Tooltip label="View assessment">
                        <ActionIcon variant="light" color="orange">
                          <IconArrowRight size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Tabs.Panel>

        {/* ── Assignments Tab ── */}
        <Tabs.Panel value="assignments">
          {assignments.length === 0 ? (
            <EmptyState
              icon={IconClipboardList}
              title="No assignments"
              message="No assignments have been created for this module yet."
              action={
                <Button
                  leftSection={<IconClipboardList size={16} />}
                  onClick={() => navigate('/teacher/assignments/create')}
                  variant="light"
                >
                  Create Assignment
                </Button>
              }
            />
          ) : (
            <Stack gap="sm">
              {assignments.map((a) => {
                const statusColors: Record<string, string> = {
                  NEW: 'blue', IN_PROGRESS: 'yellow', SUBMITTED: 'teal',
                  LATE: 'orange', GRADED: 'green', OVERDUE: 'red',
                }
                return (
                  <Card
                    key={a.id}
                    withBorder
                    padding="md"
                    radius="md"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/teacher/assignments/${a.id}`)}
                  >
                    <Group justify="space-between" align="center">
                      <Group gap="sm" align="center">
                        <ThemeIcon size={40} radius="md" variant="light" color="indigo">
                          <IconClipboardList size={20} />
                        </ThemeIcon>
                        <div>
                          <Text fw={600} size="sm">{a.title}</Text>
                          <Text size="xs" c="dimmed">
                            Max marks: {a.maxMarks} · Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                          </Text>
                        </div>
                      </Group>
                      <Group gap="xs">
                        <Badge size="sm" color={statusColors[a.status] ?? 'gray'}>{a.status}</Badge>
                        <Tooltip label="View assignment">
                          <ActionIcon variant="light" color="indigo">
                            <IconArrowRight size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                  </Card>
                )
              })}
            </Stack>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
