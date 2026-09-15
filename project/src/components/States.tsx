import { Center, Text, Stack, Button, type MantineColor } from '@mantine/core'
import { type IconNode } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <Center py={60}>
      <Stack align="center" gap="sm">
        <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <Text size="sm" c="dimmed">{message}</Text>
      </Stack>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Center>
  )
}

export function EmptyState({ icon: Icon, title, message, action }: { icon?: IconNode; title: string; message?: string; action?: ReactNode }) {
  return (
    <Center py={60}>
      <Stack align="center" gap="sm">
        {Icon && <Icon size={48} stroke={1.5} color="#94a3b8" />}
        <Text fw={600} size="lg">{title}</Text>
        {message && <Text size="sm" c="dimmed" ta="center" maw={400}>{message}</Text>}
        {action}
      </Stack>
    </Center>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Center py={60}>
      <Stack align="center" gap="sm">
        <Text fw={600} size="lg" c="red">Something went wrong</Text>
        <Text size="sm" c="dimmed" ta="center" maw={400}>{message}</Text>
        {onRetry && <Button variant="light" onClick={onRetry}>Try again</Button>}
      </Stack>
    </Center>
  )
}
