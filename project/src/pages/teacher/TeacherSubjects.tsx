import { useState, useEffect } from 'react'
import { Card, Text, Group, Badge, Button, Grid, Stack, Skeleton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconBook, IconArrowRight } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import type { Subject, Module } from '../../types'

export default function TeacherSubjects() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      mockApi.getSubjects(),
      mockApi.getModules(),
    ]).then(([subs, mods]) => {
      setSubjects(subs)
      setModules(mods)
      setLoading(false)
    })
  }, [])

  if (loading) return <Skeleton height={300} />

  return (
    <div>
      <PageHeader
        title="Subjects & Course Modules"
        subtitle="Manage curriculum content, lessons, and module structure"
      />

      <Grid gutter="md">
        {subjects.map((sub) => {
          const subModules = modules.filter((m) => m.subjectId === sub.id)
          return (
            <Grid.Col span={{ base: 12, md: 6 }} key={sub.id}>
              <Card withBorder padding="lg" radius="md">
                <Group justify="space-between" mb="xs">
                  <Badge color="blue" variant="light">{sub.status}</Badge>
                  <Text size="xs" c="dimmed">{subModules.length} Modules</Text>
                </Group>

                <Text fw={700} size="lg" mb="xs">{sub.name}</Text>
                <Text size="sm" c="dimmed" mb="md">{sub.description}</Text>

                <Stack gap="xs" mb="md">
                  {subModules.map((m) => (
                    <Group
                      key={m.id}
                      justify="space-between"
                      p="xs"
                      style={{ borderRadius: 6, backgroundColor: '#f8fafc', cursor: 'pointer' }}
                      onClick={() => navigate(`/teacher/modules/${m.id}`)}
                    >
                      <Group gap="xs">
                        <IconBook size={16} color="#64748b" />
                        <Text size="xs" fw={600}>{m.title}</Text>
                      </Group>
                      <IconArrowRight size={14} color="#94a3b8" />
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          )
        })}
      </Grid>
    </div>
  )
}
