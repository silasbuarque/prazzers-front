import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AuthUser } from './types'

const STORAGE_KEY = 'prazzers:auth'

interface RegisterInput {
  name: string
  email: string
  age: string
  nationality: string
  region: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, _password: string) => Promise<void>
  register: (data: RegisterInput, _password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Mock auth: any credentials are accepted and persisted locally.
// Swap the bodies of login/register/logout for real API calls when the backend lands.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: async (email) => {
        setUser({ name: email.split('@')[0] || 'Membro', email })
      },
      register: async (data) => {
        setUser({ name: data.name || 'Membro', email: data.email })
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
