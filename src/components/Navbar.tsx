import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b pb-0.5 transition-colors ${
    isActive ? 'border-red text-cream' : 'border-transparent text-cream/60 hover:text-cream/85'
  }`

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/entrar')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-4 md:px-8">
        <Link to="/" className="font-display text-xl tracking-[0.16em] text-cream">
          prazzers
        </Link>

        <nav className="mr-auto flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.2em]">
          {user ? (
            <>
              <NavLink to="/vitrine" className={navLinkClass}>
                Vitrine
              </NavLink>
              <NavLink to="/meu-perfil" className={navLinkClass}>
                Meu perfil
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end className={navLinkClass}>
                Início
              </NavLink>
              <span className="text-cream/30">Categorias</span>
              <span className="text-cream/30">Como funciona</span>
            </>
          )}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden text-[13px] text-cream/50 sm:inline">{user.name}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 font-display text-[13px] tracking-[-0.1em] text-gold">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-line-strong px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:border-cream/45 hover:text-cream min-h-9"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/entrar"
            className="border border-gold px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10 min-h-9 inline-flex items-center"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
