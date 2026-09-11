interface PillProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function Pill({ label, active, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center border px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors min-h-9 ${
        active
          ? 'border-red text-cream'
          : 'border-line-strong text-cream/60 hover:border-cream/40 hover:text-cream/85'
      }`}
    >
      {label}
    </button>
  )
}
