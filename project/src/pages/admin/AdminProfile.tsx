import { useState } from 'react'
import { Card, Avatar, Text, Group, Stack, TextInput, Button, Grid } from '@mantine/core'
import { IconUser, IconMail, IconPhone } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { useAuth } from '../../context/AuthContext'

export default function AdminProfile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 555 010 9988',
  })

  return (
    <div>
      <PageHeader title="Administrator Profile" subtitle="Account configuration and personal details" />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="lg" radius="md">
            <Stack align="center" gap="xs">
              <Avatar size={90} radius="xl" color="purple">{user?.name.slice(0, 2).toUpperCase()}</Avatar>
              <Text fw={700} size="lg">{user?.name}</Text>
              <Text size="xs" c="dimmed">{user?.email}</Text>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md">
            <Stack gap="sm">
              <TextInput label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} leftSection={<IconUser size={16} />} />
              <TextInput label="Email Address" value={formData.email} disabled leftSection={<IconMail size={16} />} />
              <TextInput label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} leftSection={<IconPhone size={16} />} />
              <Group justify="flex-end" mt="md">
                <Button color="purple">Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}
