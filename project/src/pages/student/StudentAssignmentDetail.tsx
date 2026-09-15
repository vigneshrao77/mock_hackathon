import { useState } from 'react'
import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Button, Textarea, Divider, SimpleGrid, FileButton } from '@mantine/core'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { FileUploader } from '../../components/FileUploader'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { notifications } from '@mantine/notifications'
import {
  IconClipboardList, IconCalendar, IconBook2, IconFileText, IconCheck,
  IconChevronLeft, IconClock, IconStar, IconMessageCircle, IconDownload,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Attachment } from '../../types'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function StudentAssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [textResponse, setTextResponse] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<Attachment[]>([])
  const [submitting, setSubmitting] = useState(false)

  const { data: assignment, loading, error, refetch } = useAsync(
    () => mockApi.getAssignment(id!), [id]
  )
  const { data: submission } = useAsync(
    () => mockApi.getAssignmentSubmission(id!), [id]
  )
  const { data: subjects } = useAsync(() => mockApi.getSubjects(), [])

  if (loading) return <LoadingState message="Loading assignment..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />
  if (!assignment) {
    return (
      <div>
        <PageHeader title="Assignment Not Found" />
        <EmptyState
          icon={IconClipboardList}
          title="Assignment not found"
          message="This assignment may have been removed."
          action={<Button variant="light" onClick={() => navigate('/student/assignments')}>Back to assignments</Button>}
        />
      </div>
    )
  }

  const subjectName = (subjects || []).find((s) => s.id === assignment.subjectId)?.name || 'General'
  const dueDate = dayjs(assignment.dueDate)
  const isOverdue = assignment.status === 'OVERDUE'
  const isGraded = assignment.status === 'GRADED'
  const isSubmitted = assignment.status === 'SUBMITTED' || assignment.status === 'LATE'
  const canSubmit = assignment.status === 'NEW' || assignment.status === 'IN_PROGRESS' || assignment.status === 'OVERDUE'

  const handleSubmit = async () => {
    if (!textResponse.trim() && uploadedFiles.length === 0) {
      notifications.show({ message: 'Please add a response or attach a file', color: 'orange', size: 'sm' })
      return
    }
    setSubmitting(true)
    try {
      await mockApi.submitAssignment(assignment.id, textResponse, uploadedFiles)
      notifications.show({ message: 'Assignment submitted successfully!', color: 'green', size: 'sm' })
      refetch()
    } catch {
      notifications.show({ message: 'Failed to submit assignment', color: 'red', size: 'sm' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/student/assignments')}
        mb="sm"
      >
        Back to Assignments
      </Button>

      <PageHeader
        title={assignment.title}
        subtitle={`${subjectName} · ${assignment.maxMarks} marks`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/student/dashboard' },
          { label: 'Assignments', href: '/student/assignments' },
          { label: assignment.title },
        ]}
        action={<StatusBadge status={assignment.status} />}
      />

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {/* Main content */}
        <Box style={{ gridColumn: 'span 2' }}>
          <Stack gap="lg">
            {/* Instructions */}
            <Card withBorder shadow="sm" padding="lg" radius="md">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="navy" variant="light">
                  <IconFileText size={18} />
                </ThemeIcon>
                <Text fw={700} size="lg">Instructions</Text>
              </Group>
              <Text size="sm" style={{ lineHeight: 1.7 }}>{assignment.instructions}</Text>

              {assignment.attachments.length > 0 && (
                <>
                  <Divider my="md" />
                  <Text fw={600} size="sm" mb="sm">Assignment Attachments</Text>
                  <Stack gap="sm">
                    {assignment.attachments.map((att) => (
                      <Group key={att.id} gap="sm" align="center"
                        style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 8 }}>
                        <ThemeIcon size={36} radius="sm" variant="light" color="blue">
                          <IconFileText size={18} />
                        </ThemeIcon>
                        <Stack gap={2} style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>{att.name}</Text>
                          <Text size="xs" c="dimmed">{formatSize(att.size)}</Text>
                        </Stack>
                        {att.url && (
                          <Button variant="subtle" size="xs" leftSection={<IconDownload size={14} />}>
                            Download
                          </Button>
                        )}
                      </Group>
                    ))}
                  </Stack>
                </>
              )}
            </Card>

            {/* Submission section */}
            {canSubmit ? (
              <Card withBorder shadow="sm" padding="lg" radius="md">
                <Text fw={700} size="lg" mb="md">Submit Your Work</Text>
                <Stack gap="md">
                  <Textarea
                    label="Your Response"
                    placeholder="Write your answer or response here..."
                    value={textResponse}
                    onChange={(e) => setTextResponse(e.currentTarget.value)}
                    minRows={6}
                  />
                  <Box>
                    <Text size="sm" fw={500} mb="xs">Upload Files</Text>
                    <FileUploader
                      onUpload={(files) => setUploadedFiles((prev) => [...prev, ...files])}
                      label="Upload assignment files"
                    />
                  </Box>
                  <Button
                    color="navy"
                    size="md"
                    loading={submitting}
                    onClick={handleSubmit}
                    leftSection={<IconCheck size={16} />}
                  >
                    Submit Assignment
                  </Button>
                </Stack>
              </Card>
            ) : isSubmitted && submission ? (
              <Card withBorder shadow="sm" padding="lg" radius="md">
                <Group gap="sm" mb="md">
                  <ThemeIcon size={36} radius="md" color="indigo" variant="light">
                    <IconCheck size={18} />
                  </ThemeIcon>
                  <Text fw={700} size="lg">Your Submission</Text>
                </Group>
                <Stack gap="md">
                  <Box p="md" style={{ background: '#f8fafc', borderRadius: 8 }}>
                    <Text size="xs" c="dimmed" mb={4}>Your Response</Text>
                    <Text size="sm" style={{ lineHeight: 1.6 }}>{submission.textResponse || '(No text response)'}</Text>
                  </Box>
                  {submission.attachments.length > 0 && (
                    <Stack gap="sm">
                      <Text size="sm" fw={500}>Attached Files</Text>
                      {submission.attachments.map((att) => (
                        <Group key={att.id} gap="sm" align="center"
                          style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 8 }}>
                          <ThemeIcon size={32} radius="sm" variant="light" color="blue">
                            <IconFileText size={16} />
                          </ThemeIcon>
                          <Stack gap={2} style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>{att.name}</Text>
                            <Text size="xs" c="dimmed">{formatSize(att.size)}</Text>
                          </Stack>
                        </Group>
                      ))}
                    </Stack>
                  )}
                  <Group gap="xs">
                    <IconClock size={14} color="#94a3b8" />
                    <Text size="xs" c="dimmed">
                      Submitted {dayjs(submission.submittedAt).format('MMM D, YYYY h:mm A')}
                      {submission.isLate && <Text component="span" c="orange" fw={600}> · Late submission</Text>}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            ) : null}

            {/* Graded feedback */}
            {isGraded && submission && (
              <Card withBorder shadow="sm" padding="lg" radius="md" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
                <Group gap="sm" mb="md">
                  <ThemeIcon size={36} radius="md" color="teal" variant="light">
                    <IconStar size={18} />
                  </ThemeIcon>
                  <Text fw={700} size="lg">Graded Result</Text>
                </Group>
                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
                  <Box p="sm" style={{ background: 'white', borderRadius: 8 }}>
                    <Text size="xs" c="dimmed">Marks</Text>
                    <Text fw={700} size="xl" c="teal">{submission.marks}/{assignment.maxMarks}</Text>
                  </Box>
                  <Box p="sm" style={{ background: 'white', borderRadius: 8 }}>
                    <Text size="xs" c="dimmed">Percentage</Text>
                    <Text fw={700} size="xl" c="teal">{Math.round(((submission.marks || 0) / assignment.maxMarks) * 100)}%</Text>
                  </Box>
                  <Box p="sm" style={{ background: 'white', borderRadius: 8 }}>
                    <Text size="xs" c="dimmed">Status</Text>
                    <Text fw={700} size="sm" c={submission.isLate ? 'orange' : 'teal'}>
                      {submission.isLate ? 'Late' : 'On time'}
                    </Text>
                  </Box>
                  <Box p="sm" style={{ background: 'white', borderRadius: 8 }}>
                    <Text size="xs" c="dimmed">Graded on</Text>
                    <Text fw={600} size="sm">{submission.gradedAt ? dayjs(submission.gradedAt).format('MMM D') : '-'}</Text>
                  </Box>
                </SimpleGrid>
                {submission.feedback && (
                  <Box mt="md" p="md" style={{ background: 'white', borderRadius: 8 }}>
                    <Group gap="xs" mb={4}>
                      <IconMessageCircle size={16} color="#64748b" />
                      <Text size="xs" c="dimmed" fw={600}>Teacher Feedback</Text>
                    </Group>
                    <Text size="sm" style={{ lineHeight: 1.6 }}>{submission.feedback}</Text>
                  </Box>
                )}
              </Card>
            )}
          </Stack>
        </Box>

        {/* Sidebar */}
        <Box>
          <Card withBorder padding="lg" radius="md" style={{ position: 'sticky', top: 16 }}>
            <Text fw={600} size="sm" mb="md">Assignment Details</Text>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Subject</Text>
                <Group gap={4}>
                  <IconBook2 size={12} />
                  <Text size="xs" fw={600}>{subjectName}</Text>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Max marks</Text>
                <Badge variant="light" color="navy" size="sm">{assignment.maxMarks}</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Due date</Text>
                <Group gap={4}>
                  <IconCalendar size={12} color="#94a3b8" />
                  <Text size="xs" fw={600} c={isOverdue ? 'red' : 'dimmed'}>{dueDate.format('MMM D, YYYY')}</Text>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Assigned</Text>
                <Text size="xs">{dayjs(assignment.createdAt).format('MMM D, YYYY')}</Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Status</Text>
                <StatusBadge status={assignment.status} />
              </Group>
            </Stack>
          </Card>
        </Box>
      </SimpleGrid>
    </div>
  )
}
