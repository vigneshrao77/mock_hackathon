import { SimpleGrid, Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Progress } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { IconClipboardCheck, IconCheck, IconClock, IconArrowRight, IconX } from '@tabler/icons-react'
import dayjs from 'dayjs'

export default function StudentAssessments() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: assessments, loading, error, refetch } = useAsync(() => mockApi.getAssessments(), [])
  const { data: submissions } = useAsync(
    () => user ? mockApi.getAssessmentSubmissions(user.id) : Promise.resolve([]), [user?.id]
  )

  if (loading) return <LoadingState message="Loading assessments..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const publishedAssessments = (assessments || []).filter((a) => a.status === 'PUBLISHED')

  if (publishedAssessments.length === 0) {
    return (
      <div>
        <PageHeader title="Assessments" subtitle="View and complete your assessments" />
        <EmptyState
          icon={IconClipboardCheck}
          title="No assessments available"
          message="Assessments will appear here once your teachers publish them."
        />
      </div>
    )
  }

  const getSubmission = (assessmentId: string) => {
    return (submissions || []).filter((s) => s.assessmentId === assessmentId)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0]
  }

  return (
    <div>
      <PageHeader
        title="Assessments"
        subtitle="View and complete your assessments"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Assessments' }]}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {publishedAssessments.map((assessment) => {
          const submission = getSubmission(assessment.id)
          const isCompleted = !!submission
          const attemptCount = (submissions || []).filter((s) => s.assessmentId === assessment.id).length
          const attemptsLeft = assessment.attempts - attemptCount

          return (
            <Card key={assessment.id} withBorder shadow="sm" padding="lg" radius="md">
              <Group justify="space-between" align="flex-start" mb="sm">
                <ThemeIcon size={44} radius="md" color={isCompleted ? 'teal' : 'orange'} variant="light">
                  {isCompleted ? <IconCheck size={22} /> : <IconClipboardCheck size={22} />}
                </ThemeIcon>
                {isCompleted ? (
                  <Badge variant="light" color={submission.passed ? 'green' : 'red'} size="sm">
                    {submission.passed ? 'Passed' : 'Failed'}
                  </Badge>
                ) : (
                  <Badge variant="light" color="blue" size="sm">Available</Badge>
                )}
              </Group>

              <Stack gap="xs">
                <Text fw={700} size="md">{assessment.title}</Text>
                <Text size="xs" c="dimmed" lineClamp={2}>{assessment.description}</Text>
              </Stack>

              <Stack gap="xs" mt="md">
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Total marks</Text>
                  <Text size="xs" fw={600}>{assessment.totalMarks}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Pass score</Text>
                  <Text size="xs" fw={600}>{assessment.passScore} ({Math.round((assessment.passScore / assessment.totalMarks) * 100)}%)</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Questions</Text>
                  <Text size="xs" fw={600}>{assessment.questions.length}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="dimmed">Attempts</Text>
                  <Text size="xs" fw={600}>{attemptCount}/{assessment.attempts} used</Text>
                </Group>
              </Stack>

              {isCompleted ? (
                <Box mt="md" p="sm" style={{ background: '#f0fdf4', borderRadius: 8 }}>
                  <Group justify="space-between" align="center">
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">Your score</Text>
                      <Text fw={700} size="lg" c={submission.passed ? 'teal' : 'red'}>
                        {submission.score}/{assessment.totalMarks}
                      </Text>
                    </Stack>
                    <Stack gap={2} align="flex-end">
                      <Text size="xs" c="dimmed">Percentage</Text>
                      <Text fw={700} size="lg" c={submission.passed ? 'teal' : 'red'}>
                        {submission.percentage}%
                      </Text>
                    </Stack>
                  </Group>
                  {submission.feedback && (
                    <Text size="xs" c="dimmed" mt="xs">"{submission.feedback}"</Text>
                  )}
                  <Text size="xs" c="dimmed" mt={4}>
                    Submitted {dayjs(submission.submittedAt).format('MMM D, YYYY')}
                  </Text>
                </Box>
              ) : (
                <Box mt="md" p="sm" style={{ background: '#eff6ff', borderRadius: 8 }}>
                  <Group gap="xs" align="center">
                    <IconClock size={16} color="#3b82f6" />
                    <Text size="xs" c="dimmed">{attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining</Text>
                  </Group>
                </Box>
              )}

              <Button
                fullWidth
                mt="md"
                variant={isCompleted ? 'light' : 'filled'}
                color={isCompleted ? 'gray' : 'navy'}
                rightSection={<IconArrowRight size={16} />}
                onClick={() => navigate(`/student/assessments/${assessment.id}`)}
                disabled={isCompleted && attemptsLeft <= 0}
              >
                {isCompleted ? (attemptsLeft > 0 ? 'Retake' : 'View Results') : 'Start Assessment'}
              </Button>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  )
}
