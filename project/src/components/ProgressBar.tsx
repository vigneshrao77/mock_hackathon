import { Progress, Text, Group } from '@mantine/core'

interface ProgressBarProps {
  value: number
  label?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showValue?: boolean
  color?: string
}

export function ProgressBar({ value, label, size = 'sm', showValue = true, color }: ProgressBarProps) {
  const progressColor = color || (value >= 75 ? 'green' : value >= 50 ? 'blue' : value >= 25 ? 'orange' : 'red')
  return (
    <div>
      {label && (
        <Group justify="space-between" mb={4}>
          <Text size="xs" c="dimmed">{label}</Text>
          {showValue && <Text size="xs" fw={600}>{value}%</Text>}
        </Group>
      )}
      <Progress value={value} size={size} color={progressColor} radius="sm" />
      {!label && showValue && (
        <Text size="xs" c="dimmed" mt={4} ta="right">{value}%</Text>
      )}
    </div>
  )
}
