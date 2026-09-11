import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3.5 text-[11px] font-normal uppercase tracking-[0.24em] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed min-h-11'

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-red to-red-deep text-cream hover:brightness-110',
  secondary: 'border border-gold text-gold hover:bg-gold/10',
  ghost: 'border border-line-strong text-cream/70 hover:border-cream/45 hover:text-cream',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
