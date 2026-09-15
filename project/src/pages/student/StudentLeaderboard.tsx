import { useState } from 'react'
import { Card, Text, Group, Stack, ThemeIcon, Box, Badge, Table, Avatar, ScrollArea, Alert, Divider } from '@mantine/core'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { SearchFilterBar } from '../../components/SearchFilterBar'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import {
  IconTrophy, IconMedal, IconAward, IconChevronUp, IconInfoCircle,
  IconChartBar, IconStar,
} from '@tabler/icons-react'
import type { LeaderboardScore } from '../../types'

const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32']
const rankIcons = [IconTrophy, IconMedal, IconAward]

export default function StudentLeaderboard() {
  const { user } = useAuth()
  const [programFilter, setProgramFilter] = useState<string | null>(null)
  const [cohortFilter, setCohortFilter] = useState<string | null>(null)

  const { data: leaderboard, loading, error, refetch } = useAsync(
    () => mockApi.getLeaderboard({ programId: programFilter || undefined, cohortId: cohortFilter || undefined }),
    [programFilter, cohortFilter]
  )
  const { data: programs } = useAsync(() => mockApi.getPrograms(), [])
  const { data: cohorts } = useAsync(() => mockApi.getCohorts(), [])

  if (loading) return <LoadingState message="Loading leaderboard..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const scores = leaderboard || []
  const myScore = scores.find((s) => s.studentId === user?.id)

  const programOptions = (programs || []).map((p) => ({ value: p.id, label: p.name }))
  const cohortOptions = (cohorts || []).filter((c) => !programFilter || c.programId === programFilter)
    .map((c) => ({ value: c.id, label: c.name }))

  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div>
      <PageHeader
        title="Leaderboard"
        subtitle="See how you rank among your peers"
        breadcrumbs={[{ label: 'Dashboard', href: '/student/dashboard' }, { label: 'Leaderboard' }]}
        action={
          myScore && (
            <Badge variant="filled" color="navy" size="lg" leftSection={<IconTrophy size={14} />}>
              Your rank: #{myScore.rank}
            </Badge>
          )
        }
      />

      {/* Formula explanation */}
      <Alert icon={<IconInfoCircle size={16} />} color="navy" variant="light" mb="lg" radius="md">
        <Text size="sm">
          <Text component="span" fw={700}>Overall Score Formula:</Text>{' '}
          Overall = (Assessment Score × 0.4) + (Assignment Score × 0.4) + (Discipline Score × 0.2).
          Rankings are based on the overall composite score.
        </Text>
      </Alert>

      {/* My stats summary */}
      {myScore && (
        <SimpleGridSummary myScore={myScore} />
      )}

      <SearchFilterBar
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder=""
        filters={[
          { value: programFilter, onChange: setProgramFilter, label: 'Program', options: programOptions },
          { value: cohortFilter, onChange: setCohortFilter, label: 'Cohort', options: cohortOptions },
        ]}
        mb="lg"
      />

      <Card withBorder shadow="sm" padding="lg" radius="md">
        {scores.length === 0 ? (
          <EmptyState icon={IconTrophy} title="No rankings available" message="Leaderboard data will appear here once available." />
        ) : (
          <ScrollArea>
            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: 70 }}>Rank</Table.Th>
                  <Table.Th>Student</Table.Th>
                  <Table.Th style={{ width: 120 }}>Overall</Table.Th>
                  <Table.Th style={{ width: 130 }}>Assessment</Table.Th>
                  <Table.Th style={{ width: 130 }}>Assignment</Table.Th>
                  <Table.Th style={{ width: 120 }}>Discipline</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {scores.map((score) => {
                  const isMe = score.studentId === user?.id
                  const isTop3 = score.rank <= 3
                  const RankIcon = score.rank <= 3 ? rankIcons[score.rank - 1] : null
                  return (
                    <Table.Tr
                      key={score.studentId}
                      style={{
                        background: isMe ? '#eef2ff' : undefined,
                        fontWeight: isMe ? 700 : undefined,
                      }}
                    >
                      <Table.Td>
                        <Group gap="sm" align="center">
                          {isTop3 && RankIcon ? (
                            <ThemeIcon size={32} radius="xl" variant="light" color={rankColors[score.rank - 1] as any}>
                              <RankIcon size={16} />
                            </ThemeIcon>
                          ) : (
                            <Box style={{ width: 32, textAlign: 'center' }}>
                              <Text fw={700} size="sm" c="dimmed">#{score.rank}</Text>
                            </Box>
                          )}
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="sm" align="center">
                          <Avatar color="navy" variant="light" radius="xl" size="md">
                            {getInitials(score.studentName)}
                          </Avatar>
                          <Stack gap={0}>
                            <Text size="sm" fw={600}>
                              {score.studentName}
                              {isMe && <Badge variant="filled" size="xs" ml={6} color="navy">You</Badge>}
                            </Text>
                          </Stack>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs" align="center">
                          <Text fw={700} size="sm" c="navy">{score.overallScore.toFixed(1)}</Text>
                          {score.rank <= 3 && <IconStar size={12} color="#f59e0b" />}
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>{score.assessmentScore}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>{score.assignmentScore}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>{score.disciplineScore}</Text>
                      </Table.Td>
                    </Table.Tr>
                  )
                })}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Card>

      {myScore && (
        <>
          <Divider my="lg" />
          <Card withBorder shadow="sm" padding="lg" radius="md" style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}>
            <Group gap="md" align="center">
              <ThemeIcon size={56} radius="md" color="navy" variant="light">
                <IconChartBar size={28} />
              </ThemeIcon>
              <Stack gap={4}>
                <Text fw={700} size="lg">Your Performance</Text>
                <Text size="sm" c="dimmed">
                  You're ranked <Text component="span" fw={700} c="navy">#{myScore.rank}</Text> with an overall score of{' '}
                  <Text component="span" fw={700} c="navy">{myScore.overallScore.toFixed(1)}</Text>.
                  Keep up the great work!
                </Text>
              </Stack>
            </Group>
          </Card>
        </>
      )}
    </div>
  )
}

function SimpleGridSummary({ myScore }: { myScore: LeaderboardScore }) {
  const stats = [
    { label: 'Overall', value: myScore.overallScore.toFixed(1), icon: IconTrophy, color: 'navy' },
    { label: 'Assessment', value: myScore.assessmentScore, icon: IconChartBar, color: 'orange' },
    { label: 'Assignment', value: myScore.assignmentScore, icon: IconAward, color: 'blue' },
    { label: 'Discipline', value: myScore.disciplineScore, icon: IconStar, color: 'yellow' },
  ]
  return (
    <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
      {stats.map((s) => (
        <Card key={s.label} withBorder padding="md" radius="md">
          <Group justify="space-between" align="center">
            <Stack gap={2}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>{s.label}</Text>
              <Text fw={700} size="xl">{s.value}</Text>
            </Stack>
            <ThemeIcon size={40} radius="md" color={s.color as any} variant="light">
              <s.icon size={20} />
            </ThemeIcon>
          </Group>
        </Card>
      ))}
    </Box>
  )
}
