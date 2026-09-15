import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card, Text, Group, Badge, Button, Stack, Skeleton, Divider,
  Textarea, NumberInput, Alert, SimpleGrid, Box, ThemeIcon,
  Tabs, Paper, List,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import {
  IconChevronLeft, IconClipboardList, IconCheck, IconStar,
  IconAlertCircle, IconFileText, IconUser, IconCalendar,
  IconBook2, IconTrash, IconClipboardCheck,
} from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { Assignment, AssignmentSubmission } from '../../types'
import dayjs from 'dayjs'

export default function TeacherAssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [submission, setSubmission] = useState<AssignmentSubmission | null>(null)
  const [loading, setLoading] = useState(true)

  const [marks, setMarks] = useState<number>(0)
  const [feedback, setFeedback] = useState('')
  const [grading, setGrading] = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      mockApi.getAssignment(id),
      mockApi.getAssignmentSubmission(id),
    ]).then(([a, sub]) => {
      setAssignment(a)
      setSubmission(sub)
      if (sub?.marks !== undefined) setMarks(sub.marks)
      if (sub?.feedback) setFeedback(sub.feedback)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={400} />
  if (!assignment) return <Text p="md">Assignment not found.</Text>

  const dueDate = dayjs(assignment.dueDate)
  const isOverdue = new Date(assignment.dueDate) < new Date()
  const isGraded = assignment.status === 'GRADED'
  const hasSubmission = !!submission

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Delete Assignment',
      centered: true,
      children: <Text size="sm">Delete <strong>{assignment.title}</strong>? This cannot be undone.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        notifications.show({ color: 'green', message: 'Assignment deleted' })
        navigate('/teacher/assignments')
      },
    })
  }

  const handleGrade = async () => {
    if (!user || !assignment) return
    if (marks < 0 || marks > assignment.maxMarks) {
      notifications.show({ color: 'red', message: `Marks must be between 0 and ${assignment.maxMarks}` })
      return
    }
    setGrading(true)
    try {
      await mockApi.gradeAssignment(assignment.id, marks, feedback, {
        id: user.id, name: (user as any).name || 'Teacher', role: 'teacher',
      })
      setAssignment({ ...assignment, status: 'GRADED' })
      if (submission) setSubmission({ ...submission, marks, feedback, gradedAt: new Date().toISOString() })
      notifications.show({
        color: 'teal', icon: <IconCheck size={14} />,
        title: 'Graded!', message: `Awarded ${marks}/${assignment.maxMarks} marks.`,
      })
    } catch {
      notifications.show({ color: 'red', message: 'Failed to save grade' })
    } finally {
      setGrading(false)
    }
  }

  return (
    <div>
      <Button
        variant="subtle" size="xs" leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/assignments')} mb="sm"
      >
        Back to Assignments
      </Button>

      <PageHeader
        title={assignment.title}
        subtitle={`Due: ${dueDate.format('MMM D, YYYY')} • Max Marks: ${assignment.maxMarks}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/teacher/dashboard' },
          { label: 'Assignments', href: '/teacher/assignments' },
          { label: assignment.title },
        ]}
        action={
          <Group gap="xs">
            <StatusBadge status={assignment.status} />
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
          { label: 'Max Marks', value: assignment.maxMarks, color: 'blue' },
          { label: 'Due Date', value: dueDate.format('MMM D'), color: isOverdue ? 'red' : 'gray' },
          { label: 'Submission', value: hasSubmission ? (submission.isLate ? 'Late' : 'On time') : 'Pending', color: hasSubmission ? (submission.isLate ? 'orange' : 'teal') : 'gray' },
          { label: 'Result', value: isGraded ? `${submission?.marks ?? 0}/${assignment.maxMarks}` : '—', color: isGraded ? 'teal' : 'gray' },
        ].map((stat) => (
          <Card key={stat.label} withBorder p="md" radius="md">
            <Text size="xs" c="dimmed">{stat.label}</Text>
            <Text fw={700} size="xl" c={stat.color}>{stat.value}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Tabs defaultValue="details">
        <Tabs.List mb="md">
          <Tabs.Tab value="details" leftSection={<IconClipboardList size={14} />}>
            Assignment Details
          </Tabs.Tab>
          <Tabs.Tab value="submission" leftSection={<IconClipboardCheck size={14} />}>
            Submission {hasSubmission ? '✓' : '(pending)'}
          </Tabs.Tab>
          <Tabs.Tab value="grade" leftSection={<IconStar size={14} />}>
            Grade
          </Tabs.Tab>
        </Tabs.List>

        {/* ── Details tab ── */}
        <Tabs.Panel value="details">
          <Card withBorder padding="lg" radius="md">
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon size={32} radius="md" color="navy" variant="light">
                  <IconFileText size={16} />
                </ThemeIcon>
                <Text fw={600} size="md">Instructions</Text>
              </Group>
              <Text size="sm" c={assignment.instructions ? undefined : 'dimmed'} style={{ whiteSpace: 'pre-wrap' }}>
                {assignment.instructions || 'No instructions specified.'}
              </Text>

              <Divider />

              <Group gap="xl">
                <Group gap="xs">
                  <IconCalendar size={14} color="var(--mantine-color-gray-6)" />
                  <Text size="xs" c="dimmed">Due: {dueDate.format('MMMM D, YYYY')}</Text>
                </Group>
                {assignment.subjectId && (
                  <Group gap="xs">
                    <IconBook2 size={14} color="var(--mantine-color-gray-6)" />
                    <Text size="xs" c="dimmed">Subject: {assignment.subjectId}</Text>
                  </Group>
                )}
                <Group gap="xs">
                  <IconUser size={14} color="var(--mantine-color-gray-6)" />
                  <Text size="xs" c="dimmed">Student ID: {assignment.studentId}</Text>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* ── Submission tab ── */}
        <Tabs.Panel value="submission">
          {!hasSubmission ? (
            <Card withBorder p="xl" radius="md" ta="center">
              <IconClipboardList size={36} color="var(--mantine-color-gray-5)" />
              <Text c="dimmed" mt="sm">No submission yet.</Text>
              {isOverdue && (
                <Alert icon={<IconAlertCircle size={14} />} color="red" mt="md" radius="md">
                  The deadline has passed and the student hasn't submitted.
                </Alert>
              )}
            </Card>
          ) : (
            <Stack gap="md">
              <Card withBorder padding="lg" radius="md">
                <Group justify="space-between" mb="md">
                  <Text fw={600}>Student's Response</Text>
                  <Group gap="xs">
                    {submission.isLate && <Badge color="orange">Late submission</Badge>}
                    <Badge color="blue" variant="light">
                      Submitted {dayjs(submission.submittedAt).format('MMM D, YYYY h:mm A')}
                    </Badge>
                  </Group>
                </Group>

                {submission.textResponse ? (
                  <Paper withBorder p="md" radius="sm" style={{ background: 'var(--mantine-color-gray-0)' }}>
                    <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>{submission.textResponse}</Text>
                  </Paper>
                ) : (
                  <Text size="sm" c="dimmed">No text response provided.</Text>
                )}

                {(submission.attachments?.length ?? 0) > 0 && (
                  <>
                    <Divider my="md" />
                    <Text fw={600} size="sm" mb="xs">Attachments ({submission.attachments!.length})</Text>
                    <List spacing="xs">
                      {submission.attachments!.map((att: any, i: number) => (
                        <List.Item key={i}>
                          <Text size="xs">{att.name} ({att.size ? `${(att.size / 1024).toFixed(1)} KB` : 'unknown size'})</Text>
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </Card>
            </Stack>
          )}
        </Tabs.Panel>

        {/* ── Grade tab ── */}
        <Tabs.Panel value="grade">
          {!hasSubmission ? (
            <Alert icon={<IconAlertCircle size={16} />} color="orange" radius="md">
              Grading will be available once the student submits.
            </Alert>
          ) : (
            <Card withBorder padding="lg" radius="md">
              <Stack gap="md">
                {isGraded && submission?.gradedAt && (
                  <Alert icon={<IconCheck size={16} />} color="teal" radius="md">
                    Already graded on {dayjs(submission.gradedAt).format('MMM D, YYYY')} —
                    Score: <strong>{submission.marks}/{assignment.maxMarks}</strong>
                  </Alert>
                )}

                <NumberInput
                  label={`Marks (out of ${assignment.maxMarks})`}
                  min={0} max={assignment.maxMarks}
                  value={marks}
                  onChange={(v) => setMarks(Number(v))}
                  description={`${Math.round((marks / assignment.maxMarks) * 100)}% — ${marks >= assignment.maxMarks * 0.6 ? '✓ Pass' : '✗ Below 60%'}`}
                />

                <Textarea
                  label="Feedback for Student"
                  placeholder="Write constructive feedback…"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />

                <Group justify="flex-end">
                  <Button
                    color="teal" loading={grading}
                    leftSection={<IconStar size={16} />}
                    onClick={handleGrade}
                  >
                    {isGraded ? 'Update Grade' : 'Save Grade'}
                  </Button>
                </Group>
              </Stack>
            </Card>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
