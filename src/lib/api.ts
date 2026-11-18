const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080'

// Mirrors com.prazzers.auth.dto.response.ErrorResponse.
interface ErrorBody {
  status: number
  error: string
  message: string
  details?: { field: string; message: string }[]
}

export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string>

  constructor(status: number, message: string, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, token }: { method?: string; body?: unknown; token?: string } = {},
): Promise<T> {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Tente novamente.')
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as ErrorBody | null
    const fieldErrors = Object.fromEntries((err?.details ?? []).map((d) => [d.field, d.message]))
    throw new ApiError(res.status, err?.message ?? `Erro inesperado (${res.status}).`, fieldErrors)
  }

  return (await res.json()) as T
}
