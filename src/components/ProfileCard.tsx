import { Link } from 'react-router-dom'
import type { Profile } from '../lib/types'
import { Placeholder } from './Placeholder'
import { VerifiedTag, OnlineTag } from './ui/Tag'

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      to={`/perfil/${profile.id}`}
      className="group block border border-line bg-surface transition-colors hover:border-line-strong"
    >
      <div className="relative aspect-[3/4]">
        <Placeholder label={`Foto de ${profile.name}`} initials={profile.name[0]} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/90" />
        <div className="absolute top-3 left-3 flex gap-2">
          {profile.verified && <VerifiedTag />}
          {profile.online && <OnlineTag />}
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-xl text-cream">{profile.name}</span>
          <span className="text-[13px] text-cream/45">{profile.age} anos</span>
        </div>
        <div className="mt-1 text-[11px] tracking-[0.04em] text-cream/45">
          {profile.nationality} · {profile.city} — {profile.region}
        </div>
      </div>
    </Link>
  )
}
