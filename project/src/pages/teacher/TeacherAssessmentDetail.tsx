import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Text, Group, Badge, Button, Stack, Divider, Skeleton } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Assessment } from '../../types'

export default function TeacherAssessmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    mockApi.getAssessment(id).then((a) => {
      setAssessment(a)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={300} />
  if (!assessment) return <Text p="md">Assessment not found</Text>

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/assessments')}
        mb="sm"
      >
        Back to Assessments
      </Button>

      <PageHeader
        title={assessment.title}
        subtitle={assessment.description}
        action={<Badge color="teal">{assessment.status}</Badge>}
      />

      <Card withBorder padding="lg" radius="md" mb="md">
        <Text fw={600} size="md" mb="md">Questions Structure ({assessment.questions.length})</Text>
        <Stack gap="md">
          {assessment.questions.map((q, idx) => (
            <Card key={q.id} withBorder padding="sm" radius="sm">
              <Group justify="space-between" mb="xs">
                <Text fw={600} size="sm">Q{idx + 1}. {q.question}</Text>
                <Badge variant="light">{q.marks} marks</Badge>
              </Group>
              <Text size="xs" c="dimmed">Type: {q.type}</Text>
            </Card>
          ))}
        </Stack>
      </Card>
    </div>
  )
}
