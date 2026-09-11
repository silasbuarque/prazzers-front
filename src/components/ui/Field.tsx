import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const inputStyle =
  'w-full bg-transparent border-0 border-b border-line-strong px-0 py-2.5 text-[15px] font-light text-cream outline-none transition-colors focus:border-red placeholder:text-cream/35'

const labelStyle = 'text-[10px] font-normal uppercase tracking-[0.24em] text-cream/50'

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`${labelStyle} block mb-2`}>
      {children}
    </label>
  )
}

export function TextField({
  label,
  id,
  className = '',
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <input id={id} className={inputStyle} {...props} />
    </div>
  )
}

export function TextAreaField({
  label,
  id,
  className = '',
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <textarea id={id} className={`${inputStyle} resize-none`} {...props} />
    </div>
  )
}

export function SelectField({
  label,
  id,
  className = '',
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} className={`${inputStyle} appearance-none`} {...props}>
        {children}
      </select>
    </div>
  )
}

export function CheckField({
  children,
  ...props
}: { children: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-line-strong peer-checked:border-red peer-checked:bg-red transition-colors" />
      <span className="text-[13px] font-light leading-relaxed text-cream/70">{children}</span>
    </label>
  )
}
