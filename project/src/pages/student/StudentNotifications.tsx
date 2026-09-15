import { useState, useEffect } from 'react'
import { Card, Text, Group, Badge, Stack, Button, ActionIcon, Paper, Skeleton } from '@mantine/core'
import { IconBell, IconCheck, IconTrash, IconInfoCircle, IconAlertCircle, IconChecklist } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { AppNotification } from '../../types'

export default function StudentNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    mockApi.getNotifications(user.id).then((res) => {
      setNotifications(res)
      setLoading(false)
    })
  }, [user])

  const handleMarkAsRead = async (id: string) => {
    await mockApi.markNotificationAsRead(id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllRead = async () => {
    if (!user) return
    await mockApi.markAllNotificationsAsRead(user.id)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return <IconChecklist size={20} color="#2563eb" />
      case 'health':
        return <IconAlertCircle size={20} color="#e11d48" />
      case 'assignment':
        return <IconInfoCircle size={20} color="#059669" />
      default:
        return <IconBell size={20} color="#4f46e5" />
    }
  }

  if (loading) {
    return (
      <Stack gap="md">
        <Skeleton height={40} width={250} />
        <Skeleton height={80} />
        <Skeleton height={80} />
      </Stack>
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on your learning, health checks, and assignments"
        action={
          unreadCount > 0 && (
            <Button
              variant="light"
              color="navy"
              size="xs"
              leftSection={<IconCheck size={16} />}
              onClick={handleMarkAllRead}
            >
              Mark all as read
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <Paper p="xl" radius="md" style={{ textAlign: 'center' }} withBorder>
          <IconBell size={48} color="#94a3b8" style={{ marginBottom: 12 }} />
          <Text fw={600} size="lg">No notifications</Text>
          <Text size="sm" c="dimmed">You are all caught up!</Text>
        </Paper>
      ) : (
        <Stack gap="sm">
          {notifications.map((n) => (
            <Card
              key={n.id}
              withBorder
              padding="md"
              radius="md"
              style={{
                backgroundColor: n.read ? '#ffffff' : '#f8fafc',
                borderColor: n.read ? '#e2e8f0' : '#cbd5e1',
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Group align="flex-start" wrap="nowrap">
                  {getNotificationIcon(n.type)}
                  <div>
                    <Group gap="xs" align="center" mb={4}>
                      <Text fw={600} size="sm">{n.title}</Text>
                      {!n.read && <Badge size="xs" color="blue">New</Badge>}
                    </Group>
                    <Text size="sm" c="dimmed" mb={4}>{n.body}</Text>
                    <Text size="xs" c="dimmed">{new Date(n.createdAt).toLocaleString()}</Text>
                  </div>
                </Group>
                {!n.read && (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => handleMarkAsRead(n.id)}
                    title="Mark as read"
                  >
                    <IconCheck size={16} />
                  </ActionIcon>
                )}
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </div>
  )
}
