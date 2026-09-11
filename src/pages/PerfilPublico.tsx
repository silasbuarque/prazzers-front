import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { Placeholder } from '../components/Placeholder'
import { Button } from '../components/ui/Button'
import { VerifiedTag } from '../components/ui/Tag'
import { getProfile } from '../lib/mockData'

export function PerfilPublico() {
  const { id } = useParams<{ id: string }>()
  const profile = id ? getProfile(id) : undefined
  const [requested, setRequested] = useState(false)

  if (!profile) {
    return (
      <div className="min-h-screen bg-ink">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-light">Perfil não encontrado</h1>
          <Link to="/vitrine" className="mt-4 inline-block text-gold">
            Voltar para a vitrine
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12 pb-20 md:px-8">
        <Link to="/vitrine" className="mb-6 inline-block text-[11px] uppercase tracking-[0.2em] text-cream/50">
          ← Voltar
        </Link>

        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] border border-line">
            <Placeholder label={`Retrato editorial de ${profile.name}`} className="absolute inset-0" />
            {profile.verified && (
              <div className="absolute top-4 left-4">
                <VerifiedTag />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-display text-4xl font-light">{profile.name}</h1>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cream/50">
                {profile.age} anos · {profile.nationality} · {profile.city} — {profile.region}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-gold to-transparent" />

            <p className="text-[14.5px] leading-relaxed font-light text-cream/70">{profile.about}</p>

            <div>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-cream/45">Idiomas</span>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <span key={l} className="border border-line-strong px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream/70">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-cream/45">Categorias</span>
              <div className="flex flex-wrap gap-2">
                {profile.categories.map((c) => (
                  <span key={c} className="border border-red/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="primary" className="mt-2 w-full" onClick={() => setRequested(true)} disabled={requested}>
              {requested ? 'Solicitação enviada' : 'Solicitar contato'}
            </Button>
            {requested && (
              <p className="text-[12px] text-cream/45">
                Mensageria chega em breve — por ora este é um mock sem envio real.
              </p>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
