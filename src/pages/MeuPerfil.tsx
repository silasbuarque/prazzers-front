import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { Placeholder } from '../components/Placeholder'
import { Button } from '../components/ui/Button'
import { Pill } from '../components/ui/Pill'
import { SelectField, TextAreaField, TextField } from '../components/ui/Field'
import { LANGUAGES, PROFILES } from '../lib/mockData'

const seed = PROFILES[0]
const GALLERY_SLOTS = Array.from({ length: 5 }, (_, i) => i + 2)

interface Toggle {
  key: string
  label: string
  hint: string
  on: boolean
}

export function MeuPerfil() {
  const [name, setName] = useState(seed.name)
  const [age, setAge] = useState(String(seed.age))
  const [nationality, setNationality] = useState(seed.nationality)
  const [city, setCity] = useState(seed.city)
  const [region, setRegion] = useState(seed.region)
  const [about, setAbout] = useState(seed.about)
  const [languages, setLanguages] = useState<string[]>(seed.languages)
  const [toggles, setToggles] = useState<Toggle[]>([
    { key: 'show', label: 'Exibir na vitrine', hint: 'Seu perfil aparece na busca pública.', on: true },
    { key: 'region', label: 'Mostrar região exata', hint: 'Desligado, exibe apenas a cidade.', on: true },
    { key: 'online', label: 'Status online', hint: 'Mostra quando você está ativa.', on: false },
  ])
  const [saved, setSaved] = useState(false)

  function toggleLanguage(lang: string) {
    setLanguages((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]))
  }

  function toggleSwitch(key: string) {
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, on: !t.on } : t)))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12 pb-20 md:px-8">
        <div className="mb-8">
          <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-gold">Meu perfil</div>
          <h1 className="mb-1 font-display text-4xl font-light md:text-5xl">Fotos e exibição</h1>
          <p className="text-[14px] text-cream/50">
            Arraste imagens para os espaços abaixo. O que você editar aqui é o que aparece na vitrine.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="border border-line bg-surface p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-light">Galeria</h3>
              <span className="text-[12px] text-cream/45">6 de 12 fotos</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative aspect-[3/4] ring-1 ring-red">
                <Placeholder label="Foto de capa" className="absolute inset-0" />
                <span className="absolute top-2 left-2 border border-gold bg-ink/70 px-2 py-1 text-[9px] tracking-[0.2em] text-gold uppercase">
                  Capa
                </span>
              </div>
              {GALLERY_SLOTS.map((n) => (
                <div key={n} className="relative aspect-[3/4]">
                  <Placeholder label={`Foto ${n}`} className="absolute inset-0" />
                </div>
              ))}
              <button
                type="button"
                className="flex aspect-[3/4] flex-col items-center justify-center gap-2 border border-dashed border-line-strong text-[13px] text-cream/45 hover:text-cream/70"
              >
                <span className="text-2xl leading-none">+</span>
                <span>Adicionar</span>
              </button>
            </div>

            <p className="mt-6 text-[12px] text-cream/35">
              Até 12 fotos. Rostos podem ser desfocados automaticamente — ajuste em Privacidade.
            </p>
          </section>

          <section className="border border-line bg-surface p-6">
            <h3 className="mb-6 font-display text-xl font-light">Informações de exibição</h3>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <TextField label="Pseudônimo" id="p-nome" value={name} onChange={(e) => setName(e.target.value)} />

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Idade"
                  id="p-idade"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <SelectField
                  label="Nacionalidade"
                  id="p-nac"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  {['Brasileira', 'Portuguesa', 'Argentina', 'Italiana', 'Colombiana', 'Espanhola', 'Francesa'].map(
                    (n) => (
                      <option key={n}>{n}</option>
                    ),
                  )}
                </SelectField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField label="Cidade" id="p-cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                <TextField label="Região" id="p-regiao" value={region} onChange={(e) => setRegion(e.target.value)} />
              </div>

              <TextAreaField
                label="Sobre você"
                id="p-sobre"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <div>
                <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-cream/50">Idiomas</span>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => (
                    <Pill key={l} label={l} active={languages.includes(l)} onClick={() => toggleLanguage(l)} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {toggles.map((t) => (
                  <label
                    key={t.key}
                    className="flex cursor-pointer items-start justify-between gap-4 bg-ink px-4 py-3"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13.5px]">{t.label}</span>
                      <span className="text-[12px] text-cream/45">{t.hint}</span>
                    </span>
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={t.on}
                      onChange={() => toggleSwitch(t.key)}
                    />
                    <span
                      onClick={() => toggleSwitch(t.key)}
                      className={`mt-0.5 h-4 w-4 flex-none rounded-full border transition-colors ${
                        t.on ? 'border-red bg-red' : 'border-line-strong'
                      }`}
                    />
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" variant="primary" className="flex-1">
                  {saved ? 'Salvo!' : 'Salvar e publicar'}
                </Button>
                <Button type="button" variant="secondary">
                  Pré-visualizar
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
