import { Box, Group, Text, ActionIcon, ScrollArea } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { navConfig } from './navConfig'
import { useAuth } from '../context/AuthContext'
import { IconSchool } from '@tabler/icons-react'

export function MobileNav() {
  const { role } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const items = navConfig[role]
  const visible = items.slice(0, 5)

  return (
    <Box
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'white', borderTop: '1px solid #e2e8f0',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      className="mobile-nav"
    >
      <Group gap={0} justify="space-around" style={{ height: 60 }}>
        {visible.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <ActionIcon
              key={item.path}
              variant="subtle"
              color={active ? 'navy' : 'gray'}
              onClick={() => navigate(item.path)}
              style={{ flexDirection: 'column', gap: 2, height: 'auto', padding: '6px 4px' }}
            >
              <item.icon size={22} />
              <Text size={9} c={active ? 'navy' : 'dimmed'} style={{ fontSize: '9px' }}>{item.label.split(' ')[0]}</Text>
            </ActionIcon>
          )
        })}
      </Group>
    </Box>
  )
}
