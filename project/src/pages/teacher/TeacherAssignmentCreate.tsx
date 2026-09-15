import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, TextInput, Textarea, NumberInput, Button, Group, Stack,
  Select, Title, Divider, Text,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconChevronLeft, IconCheck, IconClipboardList } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { useAsync } from '../../hooks/useAsync'

export default function TeacherAssignmentCreate() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const { data: students } = useAsync(() => mockApi.getStudents(), [])
  const { data: subjects } = useAsync(() => mockApi.getSubjects(), [])

  const [form, setForm] = useState({
    title: '',
    instructions: '',
    maxMarks: 100,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    studentId: '',
    subjectId: '',
  })

  const handleSubmit = async () => {
    if (!user) return
    if (!form.title.trim()) {
      notifications.show({ color: 'red', title: 'Missing title', message: 'Please enter an assignment title' })
      return
    }
    if (!form.studentId) {
      notifications.show({ color: 'red', title: 'No student', message: 'Please select a student' })
      return
    }

    setLoading(true)
    try {
      await mockApi.createAssignment({
        title: form.title.trim(),
        instructions: form.instructions.trim(),
        maxMarks: Number(form.maxMarks),
        dueDate: form.dueDate,
        studentId: form.studentId,
        subjectId: form.subjectId || undefined,
        attachments: [],
        status: 'NEW',
        teacherId: user.id,
      })
      notifications.show({
        color: 'green',
        icon: <IconCheck size={16} />,
        title: 'Assignment Created!',
        message: 'The student has been notified.',
      })
      navigate('/teacher/assignments')
    } catch {
      notifications.show({ color: 'red', title: 'Error', message: 'Failed to create assignment' })
    } finally {
      setLoading(false)
    }
  }

  const studentOptions = (students || [])
    .filter((s) => s.status === 'ACTIVE')
    .map((s) => ({ value: s.id, label: `${s.name} (${s.email})` }))

  const subjectOptions = (subjects || [])
    .filter((s) => s.status === 'PUBLISHED')
    .map((s) => ({ value: s.id, label: s.name }))

  return (
    <div>
      <Button
        variant="subtle" size="xs" leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/assignments')} mb="sm"
      >
        Back to Assignments
      </Button>

      <PageHeader
        title="Create New Assignment"
        subtitle="Assign coursework to a student with instructions and a deadline"
      />

      <Card withBorder padding="lg" radius="md">
        <Stack gap="md">
          <Title order={5}>Assignment Details</Title>

          <TextInput
            label="Assignment Title" required
            placeholder="e.g., Essay on Photosynthesis"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Textarea
            label="Instructions & Requirements" rows={4}
            placeholder="Describe what the student needs to do, resources to use, format expected…"
            value={form.instructions}
            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          />

          <Group grow>
            <NumberInput
              label="Maximum Marks" min={1} max={1000}
              value={form.maxMarks}
              onChange={(v) => setForm({ ...form, maxMarks: Number(v) || 100 })}
            />
            <TextInput
              label="Due Date" type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </Group>

          <Divider label="Assign To" labelPosition="left" />

          <Select
            label="Student" required searchable clearable
            placeholder="Select a student…"
            data={studentOptions}
            value={form.studentId}
            onChange={(v) => setForm({ ...form, studentId: v || '' })}
            nothingFoundMessage={
              studentOptions.length === 0
                ? 'No active students found'
                : 'No match found'
            }
          />

          <Select
            label="Subject (optional)" searchable clearable
            placeholder="Select a subject…"
            data={subjectOptions}
            value={form.subjectId}
            onChange={(v) => setForm({ ...form, subjectId: v || '' })}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => navigate('/teacher/assignments')}>
              Cancel
            </Button>
            <Button
              color="navy" loading={loading}
              leftSection={<IconClipboardList size={16} />}
              onClick={handleSubmit}
            >
              Create Assignment
            </Button>
          </Group>
        </Stack>
      </Card>
    </div>
  )
}
