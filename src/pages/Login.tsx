import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Placeholder } from '../components/Placeholder'
import { Button } from '../components/ui/Button'
import { CheckField, TextField } from '../components/ui/Field'
import { ApiError } from '../lib/api'
import { useAuth } from '../lib/auth'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password, keepSignedIn)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Não foi possível entrar. Tente novamente.')
      return
    } finally {
      setSubmitting(false)
    }
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/vitrine'
    navigate(from, { replace: true })
  }

  return (
    <div className="grid min-h-screen bg-ink md:grid-cols-2">
      <div className="relative hidden min-h-[320px] flex-col bg-surface md:flex">
        <div className="px-8 pt-8 pb-6 font-display text-2xl tracking-[0.16em] text-cream">prazzers</div>
        <Placeholder label="Imagem editorial de capa" className="relative flex-1" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="relative px-8 pb-10">
          <h1 className="max-w-[15ch] font-display text-4xl leading-tight font-light">
            Discrição, elegância e presença.
          </h1>
          <p className="mt-3 max-w-[38ch] text-[14px] text-cream/55">
            Uma vitrine curada de acompanhantes de luxo. Perfis verificados, exibição sob o seu controle.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 md:px-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-gold">Acesso</div>
          <h2 className="mb-2 font-display text-4xl font-light">Bem-vindo de volta</h2>
          <p className="mb-8 text-[14px] text-cream/55">Entre para gerenciar o seu perfil.</p>

          <div className="flex flex-col gap-5">
            <TextField
              label="E-mail"
              id="login-email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              id="login-pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex flex-wrap items-center justify-between gap-4 text-[13px]">
              <CheckField checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)}>
                Manter conectado
              </CheckField>
              <Link to="#" className="text-cream/55 hover:text-gold">
                Esqueci a senha
              </Link>
            </div>
            {error && (
              <p role="alert" className="text-[13px] text-red">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? 'Entrando…' : 'Entrar'}
            </Button>
          </div>

          <hr className="mt-8 border-line" />
          <div className="mt-6 text-[14px] text-cream/55">
            Ainda não tem conta? <Link to="/cadastro">Criar cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
