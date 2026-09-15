import { Group, Text, Avatar, Menu, Indicator, Box, SegmentedControl } from '@mantine/core'
import { IconBell, IconSettings, IconLogout, IconUser, IconMenu2, IconChevronDown } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { mockApi } from '../services/mockApi'
import type { AppNotification } from '../types'
import type { UserRole } from '../types'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, role, logout, switchRole } = useAuth()
  const navigate = useNavigate()
  const [notifs, setNotifs] = useState<AppNotification[]>([])

  useEffect(() => {
    if (user) mockApi.getNotifications(user.id).then(setNotifs)
  }, [user])
  const unread = notifs.filter((n) => !n.read).length

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <Group h={60} px="md" justify="space-between" style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }} wrap="nowrap">
      <Group gap="sm" wrap="nowrap">
        <Box style={{ display: 'none', cursor: 'pointer' }} className="menu-toggle" onClick={onMenuClick}>
          <IconMenu2 size={20} />
        </Box>
        <Text fw={700} size="md" c="navy.9" className="header-title">{roleLabel} Portal</Text>
      </Group>
      <Group gap="sm" align="center" wrap="nowrap">
        <SegmentedControl
          size="xs"
          value={role}
          onChange={(v) => switchRole(v as UserRole)}
          data={[
            { label: 'Student', value: 'student' },
            { label: 'Teacher', value: 'teacher' },
            { label: 'Admin', value: 'admin' },
          ]}
          className="role-switcher"
        />
        <Indicator label={unread > 0 ? String(unread) : undefined} size={16} color="red">
          <Menu width={320} position="bottom-end" shadow="md">
            <Menu.Target>
              <Box style={{ cursor: 'pointer', padding: 8, borderRadius: 8 }}>
                <IconBell size={20} color="#64748b" />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Notifications</Menu.Label>
              {notifs.length === 0 ? (
                <Text size="xs" c="dimmed" p="sm">No notifications</Text>
              ) : (
                notifs.slice(0, 5).map((n) => (
                  <Menu.Item key={n.id} onClick={() => navigate(n.link || '#')}>
                    <Text size="xs" fw={n.read ? 400 : 600}>{n.title}</Text>
                    <Text size="xs" c="dimmed">{n.body}</Text>
                  </Menu.Item>
                ))
              )}
              <Menu.Divider />
              <Menu.Item onClick={() => navigate(`/${role}/notifications`)}>
                <Text size="xs" ta="center">View all</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Indicator>
        <Menu width={200} position="bottom-end" shadow="md">
          <Menu.Target>
            <Group gap="sm" style={{ cursor: 'pointer' }} wrap="nowrap">
              <Avatar size={32} color="navy" radius="xl">{user?.avatar || 'U'}</Avatar>
              <Box className="header-user-info">
                <Text size="xs" fw={600}>{user?.name}</Text>
                <Text size="xs" c="dimmed">{roleLabel}</Text>
              </Box>
              <IconChevronDown size={14} color="#94a3b8" className="header-user-info" />
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser size={14} />} onClick={() => navigate(`/${role}/profile`)}>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<IconLogout size={14} />} onClick={logout} color="red">
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  )
}
