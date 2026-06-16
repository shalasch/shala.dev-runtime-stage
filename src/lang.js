import { COPY } from './i18n'
export const lang = window.location.pathname.startsWith('/pt') ? 'pt' : 'en'
export const t = COPY[lang]
