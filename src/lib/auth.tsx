import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ApiError, apiRequest } from './api'
import type { AuthUser } from './types'

const STORAGE_KEY = 'prazzers:auth'
// Renew the access token this long before it expires.
const REFRESH_MARGIN_MS = 30_000

interface RegisterInput {
  name: string
  email: string
  age: string
  nationality: string
  region: string
}

interface TokenResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

interface LoginResponse extends TokenResponse {
  user: AuthUser
}

interface Session {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: AuthUser
  // true -> localStorage (survives browser restart); false -> sessionStorage.
  persistent: boolean
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string, keepSignedIn?: boolean) => Promise<void>
  register: (data: RegisterInput, password: string) => Promise<void>
  logout: () => void
  /** Authenticated request against the auth-service; logs out on 401. */
  authFetch: <T>(path: string, init?: { method?: string; body?: unknown }) => Promise<T>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadSession(): Session | null {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      const raw = storage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as Partial<Session>) : null
      // Entries without tokens are leftovers from the old mock auth.
      if (parsed?.accessToken && parsed.user) return parsed as Session
    } catch {
      // ignore unreadable storage
    }
  }
  return null
}

function saveSession(session: Session | null) {
  try {
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    if (session) (session.persistent ? localStorage : sessionStorage).setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // storage unavailable: session lives in memory only
  }
}

function withTokens(token: TokenResponse, user: AuthUser, persistent: boolean): Session {
  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    expiresAt: Date.now() + token.expiresIn * 1000,
    user,
    persistent,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(loadSession)
  const sessionRef = useRef(session)

  // Declared first so the other effects/callbacks always see the latest session.
  useEffect(() => {
    sessionRef.current = session
    saveSession(session)
  }, [session])

  const logout = useCallback(() => setSession(null), [])

  const refresh = useCallback(async (current: Session): Promise<Session | null> => {
    try {
      const token = await apiRequest<TokenResponse>('/renovar', {
        method: 'POST',
        body: { refreshToken: current.refreshToken },
      })
      const next = withTokens(token, current.user, current.persistent)
      setSession(next)
      return next
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setSession(null)
      return null
    }
  }, [])

  // Keep the access token fresh while the app is open.
  const expiresAt = session?.expiresAt
  useEffect(() => {
    if (!expiresAt) return
    const delay = Math.max(expiresAt - Date.now() - REFRESH_MARGIN_MS, 0)
    const id = setTimeout(() => {
      if (sessionRef.current) void refresh(sessionRef.current)
    }, delay)
    return () => clearTimeout(id)
  }, [expiresAt, refresh])

  const authFetch = useCallback(
    async <T,>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> => {
      let current = sessionRef.current
      if (!current) throw new ApiError(401, 'Sessão expirada, entre novamente.')
      if (current.expiresAt - Date.now() < REFRESH_MARGIN_MS) {
        current = await refresh(current)
        if (!current) throw new ApiError(401, 'Sessão expirada, entre novamente.')
      }
      try {
        return await apiRequest<T>(path, { ...init, token: current.accessToken })
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) setSession(null)
        throw err
      }
    },
    [refresh],
  )

  // Sync the stored user with the backend once on load (also drops dead sessions).
  useEffect(() => {
    if (!sessionRef.current) return
    authFetch<AuthUser>('/usuarios/me')
      .then((user) => setSession((s) => (s ? { ...s, user } : s)))
      .catch(() => {})
  }, [authFetch])

  const login = useCallback(async (email: string, password: string, keepSignedIn = false) => {
    const res = await apiRequest<LoginResponse>('/entrar', {
      method: 'POST',
      body: { email, senha: password, manterConectado: keepSignedIn },
    })
    setSession(withTokens(res, res.user, keepSignedIn))
  }, [])

  const register = useCallback(
    async (data: RegisterInput, password: string) => {
      await apiRequest<AuthUser>('/cadastro', {
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          age: Number(data.age),
          nationality: data.nationality || null,
          region: data.region || null,
          password,
          termsAccepted: true,
        },
      })
      await login(data.email, password)
    },
    [login],
  )

  const value = useMemo<AuthContextValue>(
    () => ({ user: session?.user ?? null, login, register, logout, authFetch }),
    [session?.user, login, register, logout, authFetch],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
