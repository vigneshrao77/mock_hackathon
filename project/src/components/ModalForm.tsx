import { Modal, Group, Button, Stack, Title, Text } from '@mantine/core'
import type { ReactNode } from 'react'

interface ModalFormProps {
  opened: boolean
  onClose: () => void
  title: string
  description?: string
  onSubmit: () => void
  submitLabel?: string
  loading?: boolean
  size?: string
  children: ReactNode
}

export function ModalForm({ opened, onClose, title, description, onSubmit, submitLabel = 'Save', loading, size = 'md', children }: ModalFormProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={<Title order={5}>{title}</Title>} size={size} centered>
      {description && <Text size="sm" c="dimmed" mb="md">{description}</Text>}
      <Stack gap="md">
        {children}
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={onSubmit} loading={loading}>{submitLabel}</Button>
        </Group>
      </Stack>
    </Modal>
  )
}
