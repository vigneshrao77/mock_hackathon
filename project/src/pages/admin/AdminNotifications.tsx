import { useState, useEffect } from 'react'
import { Card, Text, Stack, Paper, Skeleton } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { AppNotification } from '../../types'

export default function AdminNotifications() {
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

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader title="Admin Alerts & Notifications" subtitle="System notifications, warnings, and administrative alerts" />
      <Stack gap="sm">
        {notifications.length === 0 ? (
          <Paper p="xl" style={{ textAlign: 'center' }} withBorder>
            <IconBell size={48} color="#94a3b8" style={{ marginBottom: 12 }} />
            <Text fw={600} size="lg">No notifications</Text>
          </Paper>
        ) : (
          notifications.map((n) => (
            <Card key={n.id} withBorder padding="md" radius="md">
              <Text fw={600} size="sm">{n.title}</Text>
              <Text size="sm" c="dimmed">{n.body}</Text>
            </Card>
          ))
        )}
      </Stack>
    </div>
  )
}
