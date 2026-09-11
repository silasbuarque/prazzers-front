import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
      <span className="text-[10px] uppercase tracking-[0.32em] text-gold">404</span>
      <h1 className="font-display text-4xl font-light">Esta página não existe.</h1>
      <Link to="/" className="text-gold">
        Voltar para o início
      </Link>
    </div>
  )
}
