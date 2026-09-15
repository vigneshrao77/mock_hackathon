import { useState, useEffect } from 'react'
import { Card, Text, Group, Badge, Stack, Button, ActionIcon, Paper, Skeleton } from '@mantine/core'
import { IconBell, IconCheck } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { AppNotification } from '../../types'

export default function TeacherNotifications() {
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

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Teacher Notifications" subtitle="Updates on submissions, health alerts, and registrations" />
      <Stack gap="sm">
        {notifications.length === 0 ? (
          <Paper p="xl" style={{ textAlign: 'center' }} withBorder>
            <IconBell size={48} color="#94a3b8" style={{ marginBottom: 12 }} />
            <Text fw={600} size="lg">No notifications</Text>
          </Paper>
        ) : (
          notifications.map((n) => (
            <Card key={n.id} withBorder padding="md" radius="md" style={{ backgroundColor: n.read ? '#ffffff' : '#f8fafc' }}>
              <Group justify="space-between">
                <div>
                  <Text fw={600} size="sm">{n.title}</Text>
                  <Text size="sm" c="dimmed">{n.body}</Text>
                </div>
                {!n.read && (
                  <ActionIcon variant="subtle" onClick={() => handleMarkAsRead(n.id)}>
                    <IconCheck size={16} />
                  </ActionIcon>
                )}
              </Group>
            </Card>
          ))
        )}
      </Stack>
    </div>
  )
}
