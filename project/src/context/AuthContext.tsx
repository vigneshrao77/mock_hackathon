import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, UserRole } from '../types'
import { mockApi } from '../services/mockApi'

interface AuthContextValue {
  user: User | null
  role: UserRole
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'diksha_auth'

const demoUsers: Record<UserRole, { email: string; password: string }> = {
  student: { email: 'aarav@student.diksha.org', password: 'demo123' },
  teacher: { email: 'anita@diksha.org', password: 'demo123' },
  admin: { email: 'admin@diksha.org', password: 'demo123' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole>('student')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { userId: string; role: UserRole }
        mockApi.getCurrentUser(parsed.userId, parsed.role).then((u) => {
          if (u) {
            setUser(u)
            setRole(parsed.role)
          }
          setLoading(false)
        })
      } catch {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, _password: string): Promise<User> => {
    const u = await mockApi.login(email, _password)
    setUser(u)
    setRole(u.role)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: u.id, role: u.role }))
    return u
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const switchRole = (newRole: UserRole) => {
    const demo = demoUsers[newRole]
    mockApi.login(demo.email, demo.password).then((u) => {
      setUser(u)
      setRole(newRole)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: u.id, role: newRole }))
    })
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
