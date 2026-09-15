import { Card, Text, Grid, Stack, Badge, Progress } from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { IconChartDots, IconUsers, IconSchool, IconChecklist } from '@tabler/icons-react'

export default function AdminAnalytics() {
  return (
    <div>
      <PageHeader title="Platform Analytics" subtitle="High-level performance stats, completion ratios, and usage trends" />

      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Active Users" value="248" icon={IconUsers} color="blue" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Avg Course Completion" value="74.2%" icon={IconChartDots} color="teal" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Submissions" value="1,420" icon={IconChecklist} color="purple" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatCard title="Teaching Staff" value="12" icon={IconSchool} color="orange" />
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder padding="lg" radius="md">
            <Text fw={600} size="md" mb="md">Subject Engagement Distribution</Text>
            <Stack gap="sm">
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs">Foundational Science</Text>
                  <Text size="xs" fw={600}>88%</Text>
                </Group>
                <Progress value={88} color="blue" />
              </div>
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs">Mathematics Core</Text>
                  <Text size="xs" fw={600}>76%</Text>
                </Group>
                <Progress value={76} color="teal" />
              </div>
              <div>
                <Group justify="space-between" mb={4}>
                  <Text size="xs">Health & Wellness</Text>
                  <Text size="xs" fw={600}>92%</Text>
                </Group>
                <Progress value={92} color="green" />
              </div>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder padding="lg" radius="md">
            <Text fw={600} size="md" mb="md">Assessment Performance Ratio</Text>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm">Pass Rate</Text>
                <Badge color="green" size="lg">91.4%</Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Average Score</Text>
                <Badge color="blue" size="lg">82.5%</Badge>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
