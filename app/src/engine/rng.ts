/**
 * Générateur pseudo-aléatoire déterministe.
 *
 * Une graine (nombre entier) suffit à reproduire exactement un énoncé et son
 * corrigé après un rechargement de page. Aucun `Math.random` n'est utilisé dans
 * la génération des exercices.
 */

export type Rng = {
  /** Entier dans [min, max] inclus. */
  int: (min: number, max: number) => number
  /** Élément d'un tableau. */
  pick: <T>(items: readonly T[]) => T
  /** `n` éléments distincts d'un tableau (n ≤ items.length). */
  sample: <T>(items: readonly T[], n: number) => T[]
  /** Copie mélangée. */
  shuffle: <T>(items: readonly T[]) => T[]
  /** Vrai avec la probabilité p. */
  chance: (p: number) => boolean
  /** Entier multiple de `step` dans [min, max]. */
  step: (min: number, max: number, step: number) => number
  readonly seed: number
}

/** mulberry32 : rapide, suffisant pour varier des énoncés, entièrement déterministe. */
export function createRng(seed: number): Rng {
  let a = (seed >>> 0) || 0x9e3779b9
  const next = () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const int = (min: number, max: number) => {
    if (max < min) throw new Error(`Intervalle vide : [${min}, ${max}]`)
    return min + Math.floor(next() * (max - min + 1))
  }
  const shuffle = <T,>(items: readonly T[]): T[] => {
    const out = [...items]
    for (let i = out.length - 1; i > 0; i--) {
      const j = int(0, i)
      const tmp = out[i]!
      out[i] = out[j]!
      out[j] = tmp
    }
    return out
  }
  return {
    seed,
    int,
    pick: (items) => {
      if (!items.length) throw new Error('pick sur un tableau vide')
      return items[int(0, items.length - 1)]!
    },
    sample: (items, n) => shuffle(items).slice(0, n),
    shuffle,
    chance: (p) => next() < p,
    step: (min, max, s) => {
      const lo = Math.ceil(min / s)
      const hi = Math.floor(max / s)
      return int(lo, hi) * s
    },
  }
}

/** Graine reproductible à partir d'un identifiant de gabarit et d'un compteur. */
export function seedFrom(templateId: string, counter: number): number {
  let h = 2166136261
  const s = `${templateId}#${counter}`
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
