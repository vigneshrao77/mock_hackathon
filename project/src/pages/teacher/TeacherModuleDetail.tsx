import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Text, Group, Badge, Button, Stack, Divider, Skeleton } from '@mantine/core'
import { IconChevronLeft, IconVideo, IconFileText, IconHeadphones, IconChecklist } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Module, ContentItem } from '../../types'

export default function TeacherModuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moduleItem, setModuleItem] = useState<Module | null>(null)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      mockApi.getModule(id),
      mockApi.getContentItemsByModule(id),
    ]).then(([m, items]) => {
      setModuleItem(m)
      setContentItems(items)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Skeleton height={300} />
  if (!moduleItem) return <Text p="md">Module not found</Text>

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <IconVideo size={18} color="#2563eb" />
      case 'audio': return <IconHeadphones size={18} color="#7c3aed" />
      default: return <IconFileText size={18} color="#059669" />
    }
  }

  return (
    <div>
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconChevronLeft size={14} />}
        onClick={() => navigate('/teacher/subjects')}
        mb="sm"
      >
        Back to Subjects
      </Button>

      <PageHeader
        title={moduleItem.title}
        subtitle={moduleItem.description}
        action={<Badge color="blue">{moduleItem.status}</Badge>}
      />

      <Card withBorder padding="lg" radius="md">
        <Text fw={600} size="md" mb="md">Learning Content Items</Text>
        <Stack gap="xs">
          {contentItems.map((c) => (
            <Group key={c.id} justify="space-between" p="sm" style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
              <Group gap="sm">
                {getIcon(c.type)}
                <div>
                  <Text size="sm" fw={600}>{c.title}</Text>
                  <Text size="xs" c="dimmed">{c.description}</Text>
                </div>
              </Group>
              <Badge variant="light">{c.type}</Badge>
            </Group>
          ))}
        </Stack>
      </Card>
    </div>
  )
}
