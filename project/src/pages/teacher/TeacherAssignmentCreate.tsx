import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, TextInput, Textarea, NumberInput, Button, Group, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconChevronLeft, IconCheck } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'

export default function TeacherAssignmentCreate() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    maxMarks: 100,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
  })

  const handleSubmit = async () => {
    if (!user) return
    if (!formData.title) {
      notifications.show({ title: 'Error', message: 'Please enter assignment title', color: 'red' })
      return
    }
    setLoading(true)
    try {
      await mockApi.createAssignment({
        title: formData.title,
        instructions: formData.instructions,
        maxMarks: Number(formData.maxMarks),
        dueDate: formData.dueDate,
        attachments: [],
        status: 'PUBLISHED',
        teacherId: user.id,
        studentId: 'all',
      })
      notifications.show({ title: 'Success', message: 'Assignment created successfully', color: 'green', icon: <IconCheck size={16} /> })
      navigate('/teacher/assignments')
    } catch {
      notifications.show({ title: 'Error', message: 'Failed to create assignment', color: 'red' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/assignments')}
        mb="sm"
      >
        Back to Assignments
      </Button>

      <PageHeader title="Create New Assignment" subtitle="Assign coursework and deadline for students" />

      <Card withBorder padding="lg" radius="md">
        <Stack gap="md">
          <TextInput
            label="Assignment Title"
            placeholder="e.g., Essay on Photosynthesis"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            label="Instructions & Requirements"
            placeholder="Describe what students need to accomplish..."
            rows={4}
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          />

          <Group grow>
            <NumberInput
              label="Maximum Marks"
              value={formData.maxMarks}
              onChange={(val) => setFormData({ ...formData, maxMarks: Number(val) || 100 })}
            />

            <TextInput
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </Group>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => navigate('/teacher/assignments')}>
              Cancel
            </Button>
            <Button color="navy" loading={loading} onClick={handleSubmit}>
              Create Assignment
            </Button>
          </Group>
        </Stack>
      </Card>
    </div>
  )
}
