import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { Placeholder } from '../components/Placeholder'
import { ProfileCard } from '../components/ProfileCard'
import { Button } from '../components/ui/Button'
import { useAuth } from '../lib/auth'
import { PROFILES, CATEGORIES } from '../lib/mockData'

export function Home() {
  const { user } = useAuth()
  const featured = PROFILES.slice(0, 4)

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <section className="relative overflow-hidden border-b border-line px-6 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute -top-1/3 -right-1/4 h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] rounded-full bg-[radial-gradient(circle,rgba(122,12,22,0.55)_0%,rgba(122,12,22,0.16)_45%,transparent_70%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.32em] text-gold">Somente por convite</span>
            <h1 className="font-display text-5xl leading-[1.05] font-light md:text-7xl">
              A noite tem
              <br />
              um endereço.
            </h1>
            <p className="max-w-[34ch] text-[15px] leading-relaxed font-light text-cream/65">
              Perfis verificados, discrição absoluta e uma curadoria que respeita o seu tempo.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to={user ? '/vitrine' : '/entrar'}>
                <Button variant="primary">Explorar a vitrine</Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="ghost">Candidatar-se</Button>
              </Link>
            </div>
          </div>

          <Placeholder label="Editorial de capa" className="relative aspect-[4/3] w-full border border-line" />
        </div>
      </section>

      <section className="border-b border-line px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl font-light">Em destaque</h2>
            <Link to={user ? '/vitrine' : '/entrar'} className="text-[10px] uppercase tracking-[0.24em] text-gold">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {featured.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-display text-3xl font-light">Categorias</h2>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((c, i) => (
              <span
                key={c}
                className={`inline-flex items-center border px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] ${
                  i === 0 ? 'border-red text-cream' : 'border-line-strong text-cream/65'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
