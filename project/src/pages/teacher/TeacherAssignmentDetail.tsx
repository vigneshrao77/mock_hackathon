import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Text, Group, Badge, Button, Stack, Skeleton } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assignment } from '../../types'

export default function TeacherAssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    mockApi.getAssignment(id).then((a) => {
      setAssignment(a)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={300} />
  if (!assignment) return <Text p="md">Assignment not found</Text>

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

      <PageHeader
        title={assignment.title}
        subtitle={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`}
        action={<Badge color="teal">{assignment.status}</Badge>}
      />

      <Card withBorder padding="lg" radius="md">
        <Text fw={600} size="md" mb="xs">Instructions</Text>
        <Text size="sm" c="dimmed" mb="md">{assignment.instructions || 'No instructions specified.'}</Text>
        <Text size="xs" fw={500}>Max Marks: {assignment.maxMarks}</Text>
      </Card>
    </div>
  )
}
