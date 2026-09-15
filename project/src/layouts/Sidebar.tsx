import { NavLink, ScrollArea, Box, Text, Stack, Group } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { navConfig } from './navConfig'
import { useAuth } from '../context/AuthContext'
import { IconSchool, IconLogout } from '@tabler/icons-react'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { role, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const items = navConfig[role]

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack gap={0} align="flex-start" px="lg" py="lg">
        <Group gap="sm" align="center">
          <Box
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg, #1e1b4b, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <IconSchool size={20} color="white" />
          </Box>
          <Box>
            <Text size="sm" fw={700} c="navy.9">Diksha</Text>
            <Text size="xs" c="dimmed">Learning Platform</Text>
          </Box>
        </Group>
      </Stack>
      <ScrollArea style={{ flex: 1 }} px="sm">
        {items.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <NavLink
              key={item.path}
              active={active}
              label={item.label}
              leftSection={<item.icon size={18} />}
              onClick={() => { navigate(item.path); onNavigate?.() }}
              style={{ borderRadius: 6, marginBottom: 2 }}
            />
          )
        })}
      </ScrollArea>
      <Box p="xs" style={{ borderTop: '1px solid #e2e8f0' }}>
        <NavLink
          label="Logout"
          leftSection={<IconLogout size={18} color="#e53e3e" />}
          onClick={logout}
          style={{ borderRadius: 6, color: '#e53e3e', fontWeight: 600 }}
        />
      </Box>
    </Box>
  )
}
