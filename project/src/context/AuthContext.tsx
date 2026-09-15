import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { mockApi } from '../services/mockApi';

interface AuthContextValue {
  user: User | null;
  role: UserRole;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  setAuthUser: (authUser: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'diksha_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was authenticated via MongoDB login
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u && u.role) {
          setUser({
            id: u.id || u._id || 'usr_1',
            name: u.name || 'User',
            email: u.email || '',
            role: u.role,
          });
          setRole(u.role);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to STORAGE_KEY
      }
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { userId: string; role: UserRole };
        mockApi.getCurrentUser(parsed.userId, parsed.role).then((u) => {
          if (u) {
            setUser(u);
            setRole(parsed.role);
          }
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const setAuthUser = (authUser: User) => {
    setUser(authUser);
    setRole(authUser.role);
    localStorage.setItem('user', JSON.stringify(authUser));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: authUser.id, role: authUser.role }));
  };

  const login = async (email: string, _password: string): Promise<User> => {
    const u = await mockApi.login(email, _password);
    setUser(u);
    setRole(u.role);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: u.id, role: u.role }));
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, setAuthUser, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
