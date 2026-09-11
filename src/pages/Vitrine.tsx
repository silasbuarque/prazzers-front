import { useMemo, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { ProfileCard } from '../components/ProfileCard'
import { Pill } from '../components/ui/Pill'
import { PROFILES } from '../lib/mockData'

const FILTERS = ['Todos', 'São Paulo', 'Rio de Janeiro', 'Disponível hoje']

export function Vitrine() {
  const [filter, setFilter] = useState('Todos')

  const profiles = useMemo(() => {
    if (filter === 'Todos') return PROFILES
    if (filter === 'Disponível hoje') return PROFILES.filter((p) => p.online)
    return PROFILES.filter((p) => p.city === filter)
  }, [filter])

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 pb-20 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="mb-1 font-display text-4xl font-light md:text-5xl">A vitrine</h1>
            <p className="text-[14px] text-cream/50">{profiles.length} perfis em destaque · atualizados hoje</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Pill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {profiles.map((p) => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </div>

        {profiles.length === 0 && <p className="py-16 text-center text-cream/45">Nenhum perfil encontrado.</p>}
      </main>

      <SiteFooter />
    </div>
  )
}
