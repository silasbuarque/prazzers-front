function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

interface PlaceholderProps {
  label: string
  className?: string
  initials?: string
}

// Stand-in for editorial photography until real assets/uploads are wired up.
// Deterministic per label so the same profile always renders the same look.
export function Placeholder({ label, className = '', initials }: PlaceholderProps) {
  const h = hash(label)
  const angle = 110 + (h % 70)
  const stop = 55 + (h % 20)

  return (
    <div
      className={`flex items-end overflow-hidden bg-surface ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, #19191d 0%, #7A0C16 ${stop}%, #19191d 100%)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(193,18,31,0.35),transparent_65%)]" />
      {initials && (
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl font-light tracking-[-0.14em] text-cream/25">
          {initials}
        </span>
      )}
      <span className="relative z-10 w-full px-3 py-2 text-[9px] font-normal tracking-[0.14em] text-cream/30 uppercase">
        {label}
      </span>
    </div>
  )
}
