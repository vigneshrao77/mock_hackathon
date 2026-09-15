import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card, Text, Group, Badge, Button, Stack, Skeleton, Tabs,
  Table, Textarea, NumberInput, ActionIcon, Tooltip, Alert,
  ThemeIcon, SimpleGrid, Box,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals'
import {
  IconChevronLeft, IconClipboardCheck, IconUsers, IconCheck,
  IconStar, IconAlertCircle, IconTrash,
} from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assessment, AssessmentSubmission } from '../../types'

const statusColor: Record<string, string> = {
  PUBLISHED: 'teal', DRAFT: 'gray', ARCHIVED: 'orange',
}

export default function TeacherAssessmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([])
  const [loading, setLoading] = useState(true)

  // grade state: subId → { score, feedback }
  const [grading, setGrading] = useState<Record<string, { score: number; feedback: string }>>({})

  useEffect(() => {
    if (!id) return
    Promise.all([
      mockApi.getAssessment(id),
      mockApi.getAssessmentSubmissionsByAssessment(id),
    ]).then(([a, subs]) => {
      setAssessment(a)
      setSubmissions(subs)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={400} />
  if (!assessment) return <Text p="md">Assessment not found.</Text>

  const passCount = submissions.filter((s) => s.passed).length
  const avgScore = submissions.length
    ? Math.round(submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length)
    : 0

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Delete Assessment',
      centered: true,
      children: <Text size="sm">Are you sure you want to delete <strong>{assessment.title}</strong>?</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        notifications.show({ color: 'green', message: 'Assessment deleted' })
        navigate('/teacher/assessments')
      },
    })
  }

  const handleTogglePublish = async () => {
    const newStatus = assessment.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await mockApi.updateAssessment(assessment.id, { status: newStatus })
    setAssessment({ ...assessment, status: newStatus })
    notifications.show({
      color: newStatus === 'PUBLISHED' ? 'teal' : 'gray',
      message: `Assessment is now ${newStatus}`,
    })
  }

  const handleGrade = (sub: AssessmentSubmission) => {
    const g = grading[sub.id]
    if (!g || g.score === undefined) {
      notifications.show({ color: 'red', message: 'Enter a score first' })
      return
    }
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === sub.id
          ? { ...s, score: g.score, percentage: Math.round((g.score / assessment.totalMarks) * 100),
              passed: g.score >= assessment.passScore, feedback: g.feedback }
          : s
      )
    )
    notifications.show({ color: 'green', icon: <IconCheck size={14} />, message: 'Submission graded!' })
  }

  return (
    <div>
      <Button
        variant="subtle" size="xs" leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/assessments')} mb="sm"
      >
        Back to Assessments
      </Button>

      <PageHeader
        title={assessment.title}
        subtitle={assessment.description || 'Assessment details and submissions'}
        breadcrumbs={[
          { label: 'Dashboard', href: '/teacher/dashboard' },
          { label: 'Assessments', href: '/teacher/assessments' },
          { label: assessment.title },
        ]}
        action={
          <Group gap="xs">
            <Button
              size="sm" variant="outline"
              color={assessment.status === 'PUBLISHED' ? 'orange' : 'teal'}
              onClick={handleTogglePublish}
            >
              {assessment.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
            </Button>
            <Button size="sm" color="red" variant="light" leftSection={<IconTrash size={14} />}
              onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        }
      />

      {/* ── Stats row ── */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="lg">
        {[
          { label: 'Total Marks', value: assessment.totalMarks, color: 'blue' },
          { label: 'Pass Score', value: `${assessment.passScore} (${Math.round((assessment.passScore / assessment.totalMarks) * 100)}%)`, color: 'orange' },
          { label: 'Submissions', value: submissions.length, color: 'violet' },
          { label: 'Pass Rate', value: submissions.length ? `${Math.round((passCount / submissions.length) * 100)}%` : '—', color: 'teal' },
        ].map((stat) => (
          <Card key={stat.label} withBorder p="md" radius="md">
            <Text size="xs" c="dimmed">{stat.label}</Text>
            <Text fw={700} size="xl" c={stat.color}>{stat.value}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Tabs defaultValue="questions">
        <Tabs.List mb="md">
          <Tabs.Tab value="questions" leftSection={<IconClipboardCheck size={14} />}>
            Questions ({assessment.questions.length})
          </Tabs.Tab>
          <Tabs.Tab value="submissions" leftSection={<IconUsers size={14} />}>
            Submissions ({submissions.length})
          </Tabs.Tab>
        </Tabs.List>

        {/* ── Questions tab ── */}
        <Tabs.Panel value="questions">
          <Stack gap="md">
            {assessment.questions.length === 0 && (
              <Alert icon={<IconAlertCircle size={16} />} color="orange">
                This assessment has no questions yet.
              </Alert>
            )}
            {assessment.questions.map((q: any, idx: number) => (
              <Card key={q.id || idx} withBorder padding="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Group gap="xs">
                    <ThemeIcon size={28} radius="sm" color="blue" variant="light">
                      <Text size="xs" fw={700}>{idx + 1}</Text>
                    </ThemeIcon>
                    <Text fw={600} size="sm">{q.question}</Text>
                  </Group>
                  <Group gap="xs">
                    <Badge variant="light" color="gray">{q.type}</Badge>
                    <Badge variant="light" color="blue">{q.marks} pts</Badge>
                  </Group>
                </Group>
                {q.options && q.options.length > 0 && (
                  <Stack gap={4} mt="xs">
                    {q.options.map((opt: string, oi: number) => (
                      <Group key={oi} gap="xs">
                        <Badge
                          size="xs" variant="filled"
                          color={opt === q.correctAnswer ? 'teal' : 'gray'}
                        >
                          {String.fromCharCode(65 + oi)}
                        </Badge>
                        <Text size="xs">{opt}</Text>
                        {opt === q.correctAnswer && (
                          <IconCheck size={12} color="var(--mantine-color-teal-6)" />
                        )}
                      </Group>
                    ))}
                  </Stack>
                )}
                {q.correctAnswer && !q.options?.length && (
                  <Text size="xs" c="teal" mt="xs">✓ Correct: {q.correctAnswer}</Text>
                )}
              </Card>
            ))}
          </Stack>
        </Tabs.Panel>

        {/* ── Submissions tab ── */}
        <Tabs.Panel value="submissions">
          {submissions.length === 0 ? (
            <Card withBorder p="xl" radius="md" ta="center">
              <IconUsers size={36} color="var(--mantine-color-gray-5)" />
              <Text c="dimmed" mt="sm">No submissions yet.</Text>
            </Card>
          ) : (
            <>
              {submissions.length > 0 && (
                <Box mb="md" p="sm" style={{ background: 'var(--mantine-color-blue-0)', borderRadius: 8 }}>
                  <Text size="sm" c="dimmed">
                    Avg score: <strong>{avgScore}/{assessment.totalMarks}</strong> •
                    Passed: <strong>{passCount}/{submissions.length}</strong>
                  </Text>
                </Box>
              )}
              <Stack gap="md">
                {submissions.map((sub) => {
                  const g = grading[sub.id] ?? { score: sub.score, feedback: sub.feedback || '' }
                  return (
                    <Card key={sub.id} withBorder padding="md" radius="md">
                      <Group justify="space-between" mb="sm">
                        <Stack gap={2}>
                          <Text fw={600} size="sm">Student ID: {sub.studentId}</Text>
                          <Text size="xs" c="dimmed">
                            Attempt #{sub.attemptNumber ?? 1} •{' '}
                            {new Date(sub.submittedAt ?? '').toLocaleDateString()}
                          </Text>
                        </Stack>
                        <Group gap="xs">
                          <Badge color={sub.passed ? 'teal' : 'red'} variant="light">
                            {sub.passed ? 'Passed' : 'Failed'}
                          </Badge>
                          <Badge color="blue" variant="light">
                            {sub.score}/{assessment.totalMarks} ({sub.percentage}%)
                          </Badge>
                        </Group>
                      </Group>

                      {/* Manual grading form */}
                      <Stack gap="xs">
                        <Group grow>
                          <NumberInput
                            size="xs" label="Score" min={0} max={assessment.totalMarks}
                            value={g.score}
                            onChange={(v) =>
                              setGrading((prev) => ({
                                ...prev,
                                [sub.id]: { ...g, score: Number(v) },
                              }))
                            }
                          />
                          <Textarea
                            size="xs" label="Feedback" rows={2}
                            placeholder="Optional feedback for the student…"
                            value={g.feedback}
                            onChange={(e) =>
                              setGrading((prev) => ({
                                ...prev,
                                [sub.id]: { ...g, feedback: e.target.value },
                              }))
                            }
                          />
                        </Group>
                        <Group justify="flex-end">
                          <Button
                            size="xs" color="teal" variant="light"
                            leftSection={<IconStar size={12} />}
                            onClick={() => handleGrade(sub)}
                          >
                            Save Grade
                          </Button>
                        </Group>
                      </Stack>
                    </Card>
                  )
                })}
              </Stack>
            </>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
