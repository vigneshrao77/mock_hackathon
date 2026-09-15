import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, TextInput, Textarea, NumberInput, Button, Group, Stack,
  Select, ActionIcon, Text, Badge, Divider, Box, Title, Paper,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  IconChevronLeft, IconCheck, IconPlus, IconTrash, IconClipboardCheck,
} from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'

interface QuestionDraft {
  id: string
  type: 'mcq' | 'multiple_select' | 'true_false' | 'short_answer'
  question: string
  options: string[]
  correctAnswer: string
  marks: number
}

const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice (MCQ)' },
  { value: 'multiple_select', label: 'Multiple Select' },
  { value: 'true_false', label: 'True / False' },
  { value: 'short_answer', label: 'Short Answer (manual grade)' },
]

function newQuestion(): QuestionDraft {
  return {
    id: Math.random().toString(36).slice(2),
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 5,
  }
}

export default function TeacherAssessmentCreate() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    passScore: 60,
    maxAttempts: 3,
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
  })

  const [questions, setQuestions] = useState<QuestionDraft[]>([newQuestion()])

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0)

  /* ---- question helpers ---- */
  const updateQ = (idx: number, patch: Partial<QuestionDraft>) =>
    setQuestions((qs) => qs.map((q, i) => (i === idx ? { ...q, ...patch } : q)))

  const updateOption = (qIdx: number, oIdx: number, val: string) =>
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIdx ? { ...q, options: q.options.map((o, j) => (j === oIdx ? val : o)) } : q
      )
    )

  const removeQuestion = (idx: number) =>
    setQuestions((qs) => qs.filter((_, i) => i !== idx))

  /* ---- submit ---- */
  const handleSave = async (publishNow = false) => {
    if (!user) return
    if (!form.title.trim()) {
      notifications.show({ color: 'red', title: 'Missing title', message: 'Please enter an assessment title' })
      return
    }
    if (questions.some((q) => !q.question.trim())) {
      notifications.show({ color: 'red', title: 'Incomplete question', message: 'All questions must have text' })
      return
    }

    setLoading(true)
    try {
      const mappedQuestions = questions.map((q) => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: ['mcq', 'multiple_select'].includes(q.type) ? q.options.filter(Boolean) : undefined,
        correctAnswer: q.correctAnswer || undefined,
        marks: q.marks,
      }))

      await mockApi.createAssessment({
        title: form.title.trim(),
        description: form.description.trim(),
        questions: mappedQuestions as any,
        totalMarks,
        passScore: Math.round((form.passScore / 100) * totalMarks),
        attempts: form.maxAttempts,
        status: publishNow ? 'PUBLISHED' : form.status,
        moduleId: '',
        subjectId: '',
      })

      notifications.show({
        color: 'green',
        icon: <IconCheck size={16} />,
        title: publishNow ? 'Assessment Published!' : 'Assessment Saved',
        message: publishNow ? 'Students can now take this assessment.' : 'Saved as draft.',
      })
      navigate('/teacher/assessments')
    } catch {
      notifications.show({ color: 'red', title: 'Error', message: 'Failed to save assessment' })
    } finally {
      setLoading(false)
    }
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
        title="Create New Assessment"
        subtitle="Build a quiz or test with questions and auto-grading"
      />

      <Stack gap="lg">
        {/* ── Basic info ── */}
        <Card withBorder padding="lg" radius="md">
          <Title order={5} mb="md">Assessment Details</Title>
          <Stack gap="sm">
            <TextInput
              label="Title" placeholder="e.g., Week 3 – Algebra Quiz" required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Textarea
              label="Description" placeholder="What this assessment covers…" rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Group grow>
              <NumberInput
                label="Pass Score (%)" min={1} max={100} suffix="%"
                value={form.passScore}
                onChange={(v) => setForm({ ...form, passScore: Number(v) || 60 })}
              />
              <NumberInput
                label="Max Attempts" min={1} max={10}
                value={form.maxAttempts}
                onChange={(v) => setForm({ ...form, maxAttempts: Number(v) || 3 })}
              />
              <Box pt={4}>
                <Text size="xs" c="dimmed" mb={4}>Total Marks</Text>
                <Badge size="xl" variant="light" color="blue">{totalMarks} marks</Badge>
              </Box>
            </Group>
          </Stack>
        </Card>

        {/* ── Questions ── */}
        <Card withBorder padding="lg" radius="md">
          <Group justify="space-between" mb="md">
            <Title order={5}>Questions ({questions.length})</Title>
            <Button
              size="xs" variant="light" color="blue"
              leftSection={<IconPlus size={14} />}
              onClick={() => setQuestions((qs) => [...qs, newQuestion()])}
            >
              Add Question
            </Button>
          </Group>

          <Stack gap="md">
            {questions.map((q, idx) => (
              <Paper key={q.id} withBorder p="md" radius="md" style={{ position: 'relative' }}>
                <Group justify="space-between" mb="sm">
                  <Badge variant="filled" color="gray" size="sm">Q{idx + 1}</Badge>
                  <Group gap="xs">
                    <NumberInput
                      size="xs" w={80} min={1} max={100} suffix=" pts"
                      value={q.marks}
                      onChange={(v) => updateQ(idx, { marks: Number(v) || 1 })}
                    />
                    {questions.length > 1 && (
                      <ActionIcon color="red" variant="subtle" onClick={() => removeQuestion(idx)}>
                        <IconTrash size={14} />
                      </ActionIcon>
                    )}
                  </Group>
                </Group>

                <Select
                  label="Type" size="sm" mb="sm"
                  data={QUESTION_TYPES}
                  value={q.type}
                  onChange={(v) => updateQ(idx, { type: v as any, correctAnswer: '', options: ['', '', '', ''] })}
                />

                <Textarea
                  label="Question" size="sm" rows={2} mb="sm"
                  placeholder="Enter your question here…"
                  value={q.question}
                  onChange={(e) => updateQ(idx, { question: e.target.value })}
                />

                {/* MCQ / Multiple Select options */}
                {(q.type === 'mcq' || q.type === 'multiple_select') && (
                  <Stack gap="xs" mb="sm">
                    <Text size="xs" fw={500}>Answer Options</Text>
                    {q.options.map((opt, oi) => (
                      <Group key={oi} gap="xs">
                        <TextInput
                          size="xs" flex={1}
                          placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                          value={opt}
                          onChange={(e) => updateOption(idx, oi, e.target.value)}
                        />
                      </Group>
                    ))}
                    <TextInput
                      size="xs" label="Correct Answer"
                      placeholder={q.type === 'multiple_select' ? 'Comma-separated, e.g. A,C' : 'e.g. A'}
                      value={q.correctAnswer}
                      onChange={(e) => updateQ(idx, { correctAnswer: e.target.value })}
                    />
                  </Stack>
                )}

                {/* True/False */}
                {q.type === 'true_false' && (
                  <Select
                    size="sm" label="Correct Answer" mb="sm"
                    data={['True', 'False']}
                    value={q.correctAnswer}
                    onChange={(v) => updateQ(idx, { correctAnswer: v || '' })}
                  />
                )}

                {q.type === 'short_answer' && (
                  <Text size="xs" c="dimmed" mt="xs">
                    ✏️ Short answer — teacher grades this manually after submission.
                  </Text>
                )}
              </Paper>
            ))}
          </Stack>
        </Card>

        {/* ── Actions ── */}
        <Divider />
        <Group justify="flex-end" pb="xl">
          <Button variant="default" onClick={() => navigate('/teacher/assessments')}>
            Cancel
          </Button>
          <Button variant="outline" color="gray" loading={loading} onClick={() => handleSave(false)}>
            Save as Draft
          </Button>
          <Button
            color="teal" leftSection={<IconClipboardCheck size={16} />}
            loading={loading} onClick={() => handleSave(true)}
          >
            Save & Publish
          </Button>
        </Group>
      </Stack>
    </div>
  )
}
