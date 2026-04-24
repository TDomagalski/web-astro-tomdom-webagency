export type Locale = 'pl' | 'en'

export interface NavLink {
  href: string
  label: string
}

export const navLinks: Record<Locale, NavLink[]> = {
  pl: [
    { href: '/', label: 'Start' },
    { href: '/uslugi', label: 'Usługi' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/o-mnie', label: 'O mnie' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  en: [
    { href: '/en/', label: 'Home' },
    { href: '/en/services', label: 'Services' },
    { href: '/en/portfolio', label: 'Portfolio' },
    { href: '/en/about', label: 'About' },
    { href: '/en/contact', label: 'Contact' },
  ],
}

export const ui = {
  pl: {
    footer: { builtWith: 'Zbudowane z', and: 'i pasją do kodu' },
    langToggle: { label: 'Switch to English', short: 'EN' },
  },
  en: {
    footer: { builtWith: 'Built with', and: 'and passion for code' },
    langToggle: { label: 'Przełącz na polski', short: 'PL' },
  },
}

export function getLangCode(locale: Locale): string {
  return locale === 'pl' ? 'pl' : 'en'
}
