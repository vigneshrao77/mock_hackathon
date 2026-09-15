import { useState, useMemo } from 'react'
import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Progress, Radio, Checkbox, Textarea, Divider, Title, RingProgress, Center, Grid } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { AudioRecorder, VideoRecorder } from '../../components/MediaPlayers'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { notifications } from '@mantine/notifications'
import {
  IconClipboardCheck, IconArrowLeft, IconArrowRight, IconCheck, IconX,
  IconChevronLeft, IconRefresh, IconTrophy, IconAlertCircle,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Question } from '../../types'

interface Results {
  score: number
  percentage: number
  passed: boolean
  feedback: string
}

export default function StudentAssessmentPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: assessment, loading, error, refetch } = useAsync(
    () => mockApi.getAssessment(id!), [id]
  )
  const { data: submissions } = useAsync(
    () => mockApi.getAssessmentSubmissions(user!.id), [user?.id]
  )

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitOpen, setSubmitOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState<Results | null>(null)

  const attemptCount = (submissions || []).filter((s) => s.assessmentId === id).length
  const attemptsLeft = assessment ? assessment.attempts - attemptCount : 0

  const questions = assessment?.questions || []
  const totalQuestions = questions.length
  const answeredCount = useMemo(() => Object.keys(answers).filter((k) => {
    const v = answers[k]
    return Array.isArray(v) ? v.length > 0 : !!v
  }).length, [answers])

  if (loading) return <LoadingState message="Loading assessment..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (!assessment) {
    return (
      <div>
        <PageHeader title="Assessment Not Found" />
        <EmptyState
          icon={IconClipboardCheck}
          title="Assessment not found"
          message="This assessment may have been removed."
          action={<Button variant="light" onClick={() => navigate('/student/assessments')}>Back to assessments</Button>}
        />
      </div>
    )
  }

  if (results) {
    return (
      <div>
        <PageHeader title="Assessment Results" subtitle={assessment.title} />
        <Card withBorder shadow="sm" padding="xl" radius="md">
          <Stack align="center" gap="lg">
            <RingProgress
              size={160}
              thickness={12}
              roundCaps
              sections={[{ value: results.percentage, color: results.passed ? 'teal' : 'red' }]}
              label={
                <Center>
                  <Stack align="center" gap={0}>
                    <Text fw={700} size="xl" c={results.passed ? 'teal' : 'red'}>{results.percentage}%</Text>
                    <Text size="xs" c="dimmed">Score</Text>
                  </Stack>
                </Center>
              }
            />

            <Group gap="sm">
              <ThemeIcon size={48} radius="xl" color={results.passed ? 'teal' : 'red'} variant="light">
                {results.passed ? <IconTrophy size={24} /> : <IconAlertCircle size={24} />}
              </ThemeIcon>
              <Stack gap={2}>
                <Text fw={700} size="xl" c={results.passed ? 'teal' : 'red'}>
                  {results.passed ? 'Passed!' : 'Did not pass'}
                </Text>
                <Text size="sm" c="dimmed">
                  {results.score} / {assessment.totalMarks} marks · Pass score: {assessment.passScore}
                </Text>
              </Stack>
            </Group>

            {results.feedback && (
              <Box p="md" style={{ background: '#f8fafc', borderRadius: 8, width: '100%', maxWidth: 500 }}>
                <Text size="xs" c="dimmed" mb={4}>Feedback</Text>
                <Text size="sm">{results.feedback}</Text>
              </Box>
            )}

            <Divider w="100%" />

            <Group gap="sm">
              {attemptsLeft > 0 && (
                <Button
                  variant="light"
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => {
                    setResults(null)
                    setCurrentQ(0)
                    setAnswers({})
                  }}
                >
                  Retake ({attemptsLeft} left)
                </Button>
              )}
              <Button variant="default" onClick={() => navigate('/student/assessments')}>
                Back to Assessments
              </Button>
            </Group>
          </Stack>
        </Card>
      </div>
    )
  }

  const question = questions[currentQ]
  const progressPct = ((currentQ + 1) / totalQuestions) * 100

  const setAnswer = (qId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  const toggleMultiSelect = (qId: string, option: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[qId]) ? prev[qId] as string[] : []
      return { ...prev, [qId]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option] }
    })
  }

  const gradeQuestion = (q: Question): number => {
    const ans = answers[q.id]
    if (!ans) return 0
    if (q.type === 'mcq' || q.type === 'true_false') {
      return ans === q.correctAnswer ? q.marks : 0
    }
    if (q.type === 'multiple_select') {
      const correct = (q.correctAnswer as string[]) || []
      const selected = Array.isArray(ans) ? ans : []
      const correctSelected = selected.filter((s) => correct.includes(s))
      const wrongSelected = selected.filter((s) => !correct.includes(s))
      if (correctSelected.length === correct.length && wrongSelected.length === 0) return q.marks
      return Math.round((correctSelected.length / correct.length) * q.marks * 0.5)
    }
    // short_answer, audio_response, video_response — award full marks for completion
    return q.marks
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const score = questions.reduce((sum, q) => sum + gradeQuestion(q), 0)
      const percentage = Math.round((score / assessment.totalMarks) * 100)
      const passed = score >= assessment.passScore
      const feedback = passed
        ? `Great job! You scored ${percentage}% on this assessment.`
        : `You scored ${percentage}%. Review the material and try again.`

      await mockApi.submitAssessment({
        assessmentId: assessment.id,
        studentId: user!.id,
        answers,
        score,
        percentage,
        passed,
        feedback,
        submittedAt: new Date().toISOString(),
        status: 'graded',
      })

      setResults({ score, percentage, passed, feedback })
      notifications.show({ message: 'Assessment submitted successfully!', color: 'green', size: 'sm' })
    } catch {
      notifications.show({ message: 'Failed to submit assessment', color: 'red', size: 'sm' })
    } finally {
      setSubmitting(false)
      setSubmitOpen(false)
    }
  }

  const renderQuestion = (q: Question) => {
    const ans = answers[q.id]
    switch (q.type) {
      case 'mcq':
      case 'true_false':
        return (
          <Radio.Group value={(ans as string) || ''} onChange={(v) => setAnswer(q.id, v)}>
            <Stack gap="sm" mt="sm">
              {(q.options || []).map((opt, i) => (
                <Radio key={i} value={opt} label={opt} size="md" />
              ))}
            </Stack>
          </Radio.Group>
        )
      case 'multiple_select':
        return (
          <Stack gap="sm" mt="sm">
            {(q.options || []).map((opt, i) => (
              <Checkbox
                key={i}
                value={opt}
                label={opt}
                size="md"
                checked={Array.isArray(ans) && ans.includes(opt)}
                onChange={() => toggleMultiSelect(q.id, opt)}
              />
            ))}
          </Stack>
        )
      case 'short_answer':
        return (
          <Textarea
            placeholder="Type your answer here..."
            value={(ans as string) || ''}
            onChange={(e) => setAnswer(q.id, e.currentTarget.value)}
            minRows={4}
            mt="sm"
          />
        )
      case 'audio_response':
        return (
          <Box mt="sm">
            <AudioRecorder onSubmit={() => {
              setAnswer(q.id, 'Audio response submitted')
              notifications.show({ message: 'Audio response recorded', color: 'green', size: 'sm' })
            }} />
          </Box>
        )
      case 'video_response':
        return (
          <Box mt="sm">
            <VideoRecorder onSubmit={() => {
              setAnswer(q.id, 'Video response submitted')
              notifications.show({ message: 'Video response recorded', color: 'green', size: 'sm' })
            }} />
          </Box>
        )
      default:
        return <Text c="dimmed">Unsupported question type</Text>
    }
  }

  const hasAnswer = (qId: string) => {
    const v = answers[qId]
    return Array.isArray(v) ? v.length > 0 : !!v
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/student/assessments')}
        mb="sm"
      >
        Back to Assessments
      </Button>

      <PageHeader
        title={assessment.title}
        subtitle={assessment.description}
        action={
          <Badge variant="light" color="orange" size="lg">
            Question {currentQ + 1} of {totalQuestions}
          </Badge>
        }
      />

      {/* Progress bar */}
      <Card withBorder padding="md" radius="md" mb="lg">
        <Group justify="space-between" mb="xs">
          <Text size="sm" fw={600}>Progress</Text>
          <Text size="xs" c="dimmed">{answeredCount} of {totalQuestions} answered</Text>
        </Group>
        <Progress value={progressPct} size="md" color="navy" radius="sm" />
      </Card>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder shadow="sm" padding="lg" radius="md">
            <Group justify="space-between" align="center" mb="md">
              <Badge variant="light" size="sm" color="navy" tt="capitalize">
                {question.type.replace(/_/g, ' ')}
              </Badge>
              <Text size="xs" c="dimmed">{question.marks} {question.marks === 1 ? 'mark' : 'marks'}</Text>
            </Group>

            <Title order={4} mb="md">{question.question}</Title>
            {renderQuestion(question)}

            <Divider my="lg" />

            {/* Navigation */}
            <Group justify="space-between" align="center">
              <Button
                variant="default"
                leftSection={<IconArrowLeft size={16} />}
                onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
                disabled={currentQ === 0}
              >
                Previous
              </Button>

              {currentQ === totalQuestions - 1 ? (
                <Button
                  color="navy"
                  rightSection={<IconCheck size={16} />}
                  onClick={() => setSubmitOpen(true)}
                >
                  Submit Assessment
                </Button>
              ) : (
                <Button
                  variant="filled"
                  color="navy"
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => setCurrentQ((q) => Math.min(totalQuestions - 1, q + 1))}
                >
                  Next
                </Button>
              )}
            </Group>
          </Card>
        </Box>

        {/* Question navigator */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
        <Box style={{ width: '100%' }}>
          <Card withBorder padding="lg" radius="md" style={{ position: 'sticky', top: 16 }}>
            <Text fw={600} size="sm" mb="md">Questions</Text>
            <Stack gap="xs">
              {questions.map((q, i) => {
                const answered = hasAnswer(q.id)
                const isCurrent = i === currentQ
                return (
                  <Group
                    key={q.id}
                    gap="sm"
                    align="center"
                    onClick={() => setCurrentQ(i)}
                    style={{
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: 6,
                      background: isCurrent ? '#eef2ff' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = '#f8fafc' }}
                    onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'transparent' }}
                  >
                    <ThemeIcon size={28} radius="sm" variant="light" color={answered ? 'teal' : 'gray'}>
                      {answered ? <IconCheck size={14} /> : <Text size="xs" fw={700}>{i + 1}</Text>}
                    </ThemeIcon>
                    <Text size="xs" fw={isCurrent ? 600 : 400} lineClamp={1} style={{ flex: 1 }}>
                      Q{i + 1}
                    </Text>
                    {answered && <IconCheck size={14} color="#22c55e" />}
                  </Group>
                )
              })}
            </Stack>

            <Divider my="sm" />
            <Button
              fullWidth
              color="navy"
              variant="light"
              leftSection={<IconCheck size={16} />}
              onClick={() => setSubmitOpen(true)}
            >
              Submit
            </Button>
          </Card>
        </Box>
        </Grid.Col>
      </Grid>
    </div>
  )
}
