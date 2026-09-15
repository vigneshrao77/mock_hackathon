import { Modal, Group, Button, Text } from '@mantine/core'

interface ConfirmDialogProps {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  color?: string
  loading?: boolean
}

export function ConfirmDialog({ opened, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', color = 'red', loading }: ConfirmDialogProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="sm" centered>
      <Text size="sm" c="dimmed" mb="lg">{message}</Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
        <Button color={color} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </Group>
    </Modal>
  )
}
