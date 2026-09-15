import { useState, useEffect } from 'react'
import {
  Card, Avatar, Text, Group, Stack, Badge, Grid, Button, TextInput,
  Textarea, Paper, Skeleton, Divider
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconUser, IconMail, IconPhone, IconCalendar, IconSchool, IconCheck } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import type { Student } from '../../types'

export default function StudentProfile() {
  const { user } = useAuth()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    bio: '',
    address: '',
  })

  useEffect(() => {
    if (!user) return
    mockApi.getStudent(user.id).then((s) => {
      if (s) {
        setStudent(s)
        setFormData({
          name: s.name || '',
          email: s.email || '',
          phone: s.phone || '',
          guardianName: s.profile?.guardianName || '',
          guardianPhone: s.profile?.guardianPhone || '',
          bio: s.profile?.bio || '',
          address: s.profile?.address || '',
        })
      }
      setLoading(false)
    })
  }, [user])

  const handleSave = async () => {
    if (!student) return
    setSaving(true)
    try {
      const updated = await mockApi.updateStudent(student.id, {
        name: formData.name,
        phone: formData.phone,
        profile: {
          ...student.profile,
          guardianName: formData.guardianName,
          guardianPhone: formData.guardianPhone,
          bio: formData.bio,
          address: formData.address,
        },
      })
      if (updated) setStudent(updated)
      notifications.show({
        title: 'Profile Updated',
        message: 'Your profile has been saved successfully.',
        color: 'green',
        icon: <IconCheck size={16} />,
      })
    } catch {
      notifications.show({ title: 'Error', message: 'Failed to update profile', color: 'red' })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !student) {
    return (
      <Stack gap="md">
        <Skeleton height={40} width={250} />
        <Skeleton height={200} />
      </Stack>
    )
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal details and contact information"
      />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" radius="md">
            <Stack align="center" gap="xs">
              <Avatar src={student.avatar} size={100} radius="xl" color="navy">
                {student.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Text fw={700} size="lg">{student.name}</Text>
              <Badge color={student.status === 'ACTIVE' ? 'green' : 'orange'}>
                {student.status}
              </Badge>
              <Text size="xs" c="dimmed">{student.email}</Text>
            </Stack>

            <Divider my="md" />

            <Stack gap="xs">
              <Group gap="xs">
                <IconSchool size={16} color="#64748b" />
                <Text size="xs" c="dimmed">Age: {student.age} years</Text>
              </Group>
              <Group gap="xs">
                <IconCalendar size={16} color="#64748b" />
                <Text size="xs" c="dimmed">Joined: {new Date(student.createdAt).toLocaleDateString()}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md">
            <Text fw={600} size="md" mb="md">Personal Information</Text>

            <Stack gap="sm">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    leftSection={<IconUser size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Email Address"
                    value={formData.email}
                    disabled
                    leftSection={<IconMail size={16} />}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    leftSection={<IconPhone size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Guardian Name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Guardian Phone"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </Grid.Col>
              </Grid>

              <Textarea
                label="Bio"
                placeholder="Tell us a little about yourself..."
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />

              <Group justify="flex-end" mt="md">
                <Button color="navy" loading={saving} onClick={handleSave}>
                  Save Changes
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
