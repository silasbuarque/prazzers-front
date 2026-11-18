import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Placeholder } from '../components/Placeholder'
import { Button } from '../components/ui/Button'
import { CheckField, TextField } from '../components/ui/Field'
import { ApiError } from '../lib/api'
import { useAuth } from '../lib/auth'

export function Cadastro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    nationality: '',
    region: '',
    password: '',
  })
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!accepted) return
    setError(null)
    setFieldErrors({})
    setSubmitting(true)
    try {
      await register(form, form.password)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.fieldErrors)
      } else {
        setError('Não foi possível concluir o cadastro. Tente novamente.')
      }
      return
    } finally {
      setSubmitting(false)
    }
    navigate('/meu-perfil')
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
          <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-gold">Cadastro</div>
          <h2 className="mb-2 font-display text-4xl font-light">Crie o seu perfil</h2>
          <p className="mb-6 text-[14px] text-cream/55">Leva dois minutos. Você escolhe o que fica visível.</p>

          <div className="flex flex-col gap-5">
            <TextField
              label="Pseudônimo"
              id="reg-nome"
              placeholder="Como você quer ser chamada(o)"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
            />
            <TextField
              label="E-mail"
              id="reg-email"
              type="email"
              placeholder="voce@email.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Idade"
                id="reg-idade"
                type="number"
                min={18}
                placeholder="18+"
                value={form.age}
                onChange={(e) => set('age', e.target.value)}
                required
              />
              <TextField
                label="Nacionalidade"
                id="reg-nac"
                placeholder="Brasileira"
                value={form.nationality}
                onChange={(e) => set('nationality', e.target.value)}
              />
            </div>
            <TextField
              label="Região"
              id="reg-regiao"
              placeholder="São Paulo — Jardins"
              value={form.region}
              onChange={(e) => set('region', e.target.value)}
            />
            <TextField
              label="Senha"
              id="reg-senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              minLength={8}
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              required
            />
            <CheckField checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required>
              Declaro ter 18 anos ou mais e aceito os termos de uso e a política de privacidade.
            </CheckField>
            {error && (
              <div role="alert" className="text-[13px] text-red">
                <p>{error}</p>
                {Object.values(fieldErrors).length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {Object.entries(fieldErrors).map(([field, msg]) => (
                      <li key={field}>{msg}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <Button type="submit" variant="primary" className="w-full" disabled={!accepted || submitting}>
              {submitting ? 'Criando conta…' : 'Criar conta'}
            </Button>
          </div>

          <hr className="mt-6 border-line" />
          <div className="mt-6 text-[14px] text-cream/55">
            Já tem conta? <Link to="/entrar">Entrar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
