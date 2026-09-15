import { AppShell, Drawer, ScrollArea, Box } from '@mantine/core'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import type { UserRole } from '../types'

interface AppLayoutProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export function AppLayout({ children, allowedRole }: AppLayoutProps) {
  const { user, role, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isTablet = useMediaQuery('(max-width: 62em)')

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== allowedRole) return <Navigate to={`/${role}/dashboard`} replace />

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'md', collapsed: { mobile: !mobileOpen, desktop: isTablet } }}
      padding="md"
    >
      <AppShell.Header>
        <Header onMenuClick={() => setMobileOpen((o) => !o)} />
      </AppShell.Header>
      <AppShell.Navbar p="xs" style={{ background: 'white', borderRight: '1px solid #e2e8f0' }}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </AppShell.Navbar>
      {isTablet && (
        <MobileNav />
      )}
      <AppShell.Main style={{ background: '#f1f5f9' }}>
        <Box style={{ maxWidth: 1400, margin: '0 auto' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
