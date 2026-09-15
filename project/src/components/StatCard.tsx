import { Card, Text, Group, ThemeIcon, Box, type MantineColor } from '@mantine/core'
import { type IconNode } from '@tabler/icons-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: IconNode
  color?: string
  trend?: { value: string; positive: boolean }
  subtitle?: string
}

export function StatCard({ label, value, icon: Icon, color = 'navy', trend, subtitle }: StatCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="flex-start">
        <Box>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: '0.04em' }}>{label}</Text>
          <Text size="xl" fw={700} mt={4}>{value}</Text>
          {subtitle && <Text size="xs" c="dimmed" mt={2}>{subtitle}</Text>}
          {trend && (
            <Text size="xs" c={trend.positive ? 'teal' : 'red'} fw={600} mt={4}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </Text>
          )}
        </Box>
        <ThemeIcon size={44} radius="md" color={color as MantineColor} variant="light">
          <Icon size={22} />
        </ThemeIcon>
      </Group>
    </Card>
  )
}
