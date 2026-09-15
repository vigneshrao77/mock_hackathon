import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react'
import { Card, Text, Group, Badge, Button, Grid, Stack, Avatar, Progress, Divider, Skeleton } from '@mantine/core'
import { IconChevronLeft, IconMail, IconPhone, IconCalendar, IconHeart, IconTrophy } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { mockApi } from '../../services/mockApi'
import type { Student, HealthRecord } from '../../types'

export default function TeacherStudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState<Student | null>(null)
  const [healthRecord, setHealthRecord] = useState<HealthRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      mockApi.getStudent(id),
      mockApi.getHealthRecord(id),
    ]).then(([s, h]) => {
      setStudent(s)
      setHealthRecord(h)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={400} />
  if (!student) return <Text p="md">Student not found</Text>

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/students')}
        mb="sm"
      >
        Back to Students
      </Button>

      <PageHeader
        title={student.name}
        subtitle={`Student Profile & Academic Overview (ID: ${student.id})`}
        action={
          <Badge color={student.status === 'ACTIVE' ? 'teal' : 'orange'} size="lg">
            {student.status}
          </Badge>
        }
      />

      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Overall Progress" value={`${student.overallProgress}%`} icon={IconTrophy} color="blue" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Assessment Average" value={`${student.assessmentAverage}%`} icon={IconTrophy} color="teal" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Discipline Score" value={student.disciplineScore} icon={IconTrophy} color="purple" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Leaderboard Rank" value={`#${student.leaderboardRank}`} icon={IconTrophy} color="orange" />
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" radius="md">
            <Stack align="center" gap="xs" mb="md">
              <Avatar src={student.avatar} size={80} radius="xl" color="navy">
                {student.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Text fw={700} size="lg">{student.name}</Text>
              <Text size="xs" c="dimmed">{student.email}</Text>
            </Stack>

            <Divider my="sm" />

            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Age / DOB</Text>
                <Text size="xs" fw={500}>{student.age} yrs ({student.dob})</Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Guardian</Text>
                <Text size="xs" fw={500}>{student.profile?.guardianName || 'N/A'}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">Guardian Phone</Text>
                <Text size="xs" fw={500}>{student.profile?.guardianPhone || 'N/A'}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md" mb="md">
            <Text fw={600} size="md" mb="md">Health Record Snapshot</Text>
            {healthRecord ? (
              <Grid gutter="xs">
                <Grid.Col span={4}>
                  <Text size="xs" c="dimmed">BMI</Text>
                  <Text fw={700} size="md">{healthRecord.bmi}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" c="dimmed">Hemoglobin</Text>
                  <Text fw={700} size="md">{healthRecord.hemoglobin} g/dL</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" c="dimmed">Vitamin D</Text>
                  <Text fw={700} size="md">{healthRecord.vitaminD} ng/mL</Text>
                </Grid.Col>
              </Grid>
            ) : (
              <Text size="sm" c="dimmed">No health record on file.</Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
