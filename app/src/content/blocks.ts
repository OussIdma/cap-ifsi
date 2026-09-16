/** Raccourcis d'écriture des contenus. Uniquement de la mise en forme. */

import type { Block, Visual } from './types'
import { toFrench, type Rational } from '@/engine/rational'

export const p = (text: string): Block => ({ type: 'p', text })
export const lead = (text: string): Block => ({ type: 'lead', text })
export const heading = (text: string): Block => ({ type: 'heading', text })
export const list = (items: string[], ordered = false): Block => ({ type: 'list', items, ordered })
export const key = (text: string, title = 'À retenir'): Block => ({ type: 'key', title, text })
export const warn = (text: string, title = 'Piège fréquent'): Block => ({ type: 'warn', title, text })
export const vocab = (items: { term: string; def: string }[]): Block => ({ type: 'vocab', items })
export const vis = (visual: Visual): Block => ({ type: 'visual', visual })
export const quote = (text: string, source?: string): Block => ({ type: 'quote', text, source })

/** Nombre en écriture française (virgule décimale, espaces de milliers). */
export const fr = (r: Rational, maxPlaces = 6): string => toFrench(r, maxPlaces)

/** Nombre entier en écriture française. */
export const frInt = (n: number | bigint): string =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/** Accord singulier / pluriel simple. */
export const plural = (n: number, one: string, many: string): string => (Math.abs(n) >= 2 ? many : one)

/** Le nombre tient-il dans le tableau sans déborder d'aucun côté ? */
export function fitsConversionTable(
  units: string[],
  intDigits: string,
  unitIndex: number,
  decimals: string,
): boolean {
  const intPart = intDigits.replace(/^0+(?=\d)/, '')
  return intPart.length - 1 <= unitIndex && decimals.length <= units.length - 1 - unitIndex
}

/** Tableau de conversion : place les chiffres d'une valeur sous les bonnes colonnes. */
export function conversionVisual(
  units: string[],
  valueDigits: string,
  unitIndex: number,
  caption?: string,
  decimals = '',
): Visual {
  const digits: (string | null)[] = units.map(() => null)
  // Partie entière : de droite à gauche depuis la colonne de l'unité.
  const intPart = valueDigits.replace(/^0+(?=\d)/, '')
  for (let i = 0; i < intPart.length; i++) {
    const col = unitIndex - (intPart.length - 1 - i)
    // Les chiffres qui débordent à gauche sont regroupés dans la première colonne.
    const target = Math.max(0, col)
    digits[target] = col < 0 ? (digits[target] ?? '') + intPart[i]! : intPart[i]!
  }
  // Partie décimale : à droite de la colonne de l'unité.
  for (let i = 0; i < decimals.length; i++) {
    const col = unitIndex + 1 + i
    const last = units.length - 1
    const target = Math.min(last, col)
    digits[target] = col > last ? (digits[target] ?? '') + decimals[i]! : decimals[i]!
  }
  return { type: 'conversion', units, digits, commaAfter: unitIndex, caption }
}

/** Ligne de temps sur une plage d'heures, en minutes depuis minuit. */
export function timelineVisual(
  fromMin: number,
  toMin: number,
  marks: { at: number; label: string; strong?: boolean }[],
  spans: { from: number; to: number; label: string }[],
  caption?: string,
): Visual {
  return { type: 'timeline', from: fromMin, to: toMin, marks, spans, caption }
}
