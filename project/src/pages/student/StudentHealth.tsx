import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, SimpleGrid, Divider, Alert, Timeline } from '@mantine/core'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import {
  IconHeart, IconActivity, IconShieldCheck, IconCalendar, IconNotes,
  IconStethoscope, IconLock, IconTrendingUp, IconTrendingDown,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { HealthRecord } from '../../types'

// Reference ranges for health metrics
const ranges = {
  bmi: { min: 18.5, max: 25, label: 'Normal: 18.5–25' },
  vitaminD: { min: 30, max: 100, label: 'Normal: 30–100 ng/mL' },
  vitaminB12: { min: 200, max: 900, label: 'Normal: 200–900 pg/mL' },
  iron: { min: 60, max: 170, label: 'Normal: 60–170 µg/dL' },
  hemoglobin: { min: 12, max: 17, label: 'Normal: 12–17 g/dL' },
}

function getMetricStatus(value: number, min: number, max: number): 'normal' | 'low' | 'high' {
  if (value < min) return 'low'
  if (value > max) return 'high'
  return 'normal'
}

function MetricCard({ label, value, unit, range, icon: Icon }: {
  label: string
  value: number
  unit: string
  range: { min: number; max: number; label: string }
  icon: typeof IconHeart
}) {
  const status = getMetricStatus(value, range.min, range.max)
  const color = status === 'normal' ? 'teal' : status === 'low' ? 'orange' : 'red'
  const TrendIcon = status === 'normal' ? IconShieldCheck : status === 'low' ? IconTrendingDown : IconTrendingUp

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Group justify="space-between" align="flex-start" mb="sm">
        <ThemeIcon size={40} radius="md" color={color} variant="light">
          <Icon size={20} />
        </ThemeIcon>
        <Badge variant="light" color={color} size="sm" leftSection={<TrendIcon size={12} />}>
          {status === 'normal' ? 'Normal' : status === 'low' ? 'Low' : 'High'}
        </Badge>
      </Group>
      <Stack gap={4}>
        <Text size="xs" c="dimmed" tt="uppercase" fw={600}>{label}</Text>
        <Text fw={700} size="xl">{value} <Text component="span" size="sm" c="dimmed">{unit}</Text></Text>
        <Text size="xs" c="dimmed">{range.label}</Text>
      </Stack>
    </Card>
  )
}

export default function StudentHealth() {
  const { user } = useAuth()

  const { data: healthRecords, loading, error, refetch } = useAsync(
    () => mockApi.getHealthRecords(user!.id), [user?.id]
  )
  const { data: healthChecks } = useAsync(
    () => mockApi.getHealthChecks(user!.id), [user?.id]
  )

  if (loading) return <LoadingState message="Loading health records..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const records = healthRecords || []
  const latest = records[0]
  const checks = healthChecks || []
  const upcomingCheck = checks.find((c) => c.status === 'UPCOMING' || c.status === 'DUE' || c.status === 'OVERDUE')

  return (
    <div>
      <PageHeader
        title="Health Records"
        subtitle="View your health metrics and check-up schedule"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Health' }]}
        action={
          <Badge variant="light" color="gray" size="lg" leftSection={<IconLock size={14} />}>
            Read Only
          </Badge>
        }
      />

      <Alert icon={<IconLock size={16} />} color="gray" variant="light" mb="lg" radius="md">
        <Text size="sm">Health records are maintained by your teachers and are read-only. Please contact your teacher if you believe any information needs updating.</Text>
      </Alert>

      {records.length === 0 && !upcomingCheck ? (
        <EmptyState
          icon={IconHeart}
          title="No health records"
          message="Your health records will appear here once your teacher adds them."
        />
      ) : (
        <Stack gap="lg">
          {/* Latest metrics */}
          {latest && (
            <>
              <Group justify="space-between" align="center">
                <Group gap="sm">
                  <ThemeIcon size={36} radius="md" color="navy" variant="light">
                    <IconActivity size={18} />
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text fw={700} size="lg">Latest Health Metrics</Text>
                    <Text size="xs" c="dimmed">Recorded on {dayjs(latest.date).format('MMMM D, YYYY')}</Text>
                  </Stack>
                </Group>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                <MetricCard label="BMI" value={latest.bmi} unit="" range={ranges.bmi} icon={IconActivity} />
                <MetricCard label="Vitamin D" value={latest.vitaminD} unit="ng/mL" range={ranges.vitaminD} icon={IconHeart} />
                <MetricCard label="Vitamin B12" value={latest.vitaminB12} unit="pg/mL" range={ranges.vitaminB12} icon={IconHeart} />
                <MetricCard label="Iron" value={latest.iron} unit="µg/dL" range={ranges.iron} icon={IconHeart} />
                <MetricCard label="Hemoglobin" value={latest.hemoglobin} unit="g/dL" range={ranges.hemoglobin} icon={IconHeart} />
              </SimpleGrid>

              {latest.notes && (
                <Card withBorder shadow="sm" padding="lg" radius="md">
                  <Group gap="sm" mb="sm">
                    <ThemeIcon size={32} radius="md" color="navy" variant="light">
                      <IconNotes size={16} />
                    </ThemeIcon>
                    <Text fw={600}>Teacher's Notes</Text>
                  </Group>
                  <Text size="sm" style={{ lineHeight: 1.7 }}>{latest.notes}</Text>
                </Card>
              )}
            </>
          )}

          {/* Upcoming health check */}
          {upcomingCheck && (
            <Card withBorder shadow="sm" padding="lg" radius="md" style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
              <Group justify="space-between" align="center" wrap="wrap">
                <Group gap="md" align="center">
                  <ThemeIcon size={48} radius="md" color="blue" variant="light">
                    <IconStethoscope size={24} />
                  </ThemeIcon>
                  <Stack gap={2}>
                    <Text fw={700}>{upcomingCheck.title}</Text>
                    <Group gap="xs">
                      <IconCalendar size={14} color="#64748b" />
                      <Text size="sm" c="dimmed">
                        Next check: {dayjs(upcomingCheck.nextCheckDate).format('MMM D, YYYY')}
                      </Text>
                    </Group>
                  </Stack>
                </Group>
                <StatusBadge status={upcomingCheck.status} />
              </Group>
            </Card>
          )}

          {/* Health check schedule */}
          {checks.length > 0 && (
            <Card withBorder shadow="sm" padding="lg" radius="md">
              <Text fw={600} mb="md">Health Check Schedule</Text>
              <Stack gap="sm">
                {checks.map((check) => (
                  <Group key={check.id} justify="space-between" align="center"
                    style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 8 }}>
                    <Group gap="sm" align="center">
                      <ThemeIcon size={36} radius="md" variant="light" color="blue">
                        <IconStethoscope size={18} />
                      </ThemeIcon>
                      <Stack gap={2}>
                        <Text size="sm" fw={600}>{check.title}</Text>
                        <Text size="xs" c="dimmed">
                          Last: {dayjs(check.lastCheckDate).format('MMM D, YYYY')} · Next: {dayjs(check.nextCheckDate).format('MMM D, YYYY')}
                        </Text>
                      </Stack>
                    </Group>
                    <StatusBadge status={check.status} />
                  </Group>
                ))}
              </Stack>
            </Card>
          )}

          {/* Historical timeline */}
          {records.length > 0 && (
            <Card withBorder shadow="sm" padding="lg" radius="md">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="navy" variant="light">
                  <IconActivity size={18} />
                </ThemeIcon>
                <Text fw={600}>Health History</Text>
              </Group>
              <Timeline active={0} bulletSize={28} lineWidth={2}>
                {records.map((record) => (
                  <HealthTimelineItem key={record.id} record={record} />
                ))}
              </Timeline>
            </Card>
          )}
        </Stack>
      )}
    </div>
  )
}

function HealthTimelineItem({ record }: { record: HealthRecord }) {
  const bmiStatus = getMetricStatus(record.bmi, ranges.bmi.min, ranges.bmi.max)
  const vitDStatus = getMetricStatus(record.vitaminD, ranges.vitaminD.min, ranges.vitaminD.max)

  return (
    <Timeline.Item
      bullet={<IconHeart size={14} />}
      title={<Text size="sm" fw={600}>{dayjs(record.date).format('MMMM D, YYYY')}</Text>}
    >
      <Stack gap="xs" mt={4}>
        <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="xs">
          <Box>
            <Text size="xs" c="dimmed">BMI</Text>
            <Text size="sm" fw={600} c={bmiStatus === 'normal' ? 'teal' : bmiStatus === 'low' ? 'orange' : 'red'}>
              {record.bmi}
            </Text>
          </Box>
          <Box>
            <Text size="xs" c="dimmed">Vit D</Text>
            <Text size="sm" fw={600} c={vitDStatus === 'normal' ? 'teal' : 'orange'}>
              {record.vitaminD}
            </Text>
          </Box>
          <Box>
            <Text size="xs" c="dimmed">B12</Text>
            <Text size="sm" fw={600}>{record.vitaminB12}</Text>
          </Box>
          <Box>
            <Text size="xs" c="dimmed">Iron</Text>
            <Text size="sm" fw={600}>{record.iron}</Text>
          </Box>
          <Box>
            <Text size="xs" c="dimmed">Hgb</Text>
            <Text size="sm" fw={600}>{record.hemoglobin}</Text>
          </Box>
        </SimpleGrid>
        {record.notes && (
          <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>"{record.notes}"</Text>
        )}
      </Stack>
    </Timeline.Item>
  )
}
