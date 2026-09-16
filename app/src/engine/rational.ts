/**
 * Arithmétique rationnelle exacte (BigInt).
 *
 * Pourquoi : les corrections de l'application doivent être calculées, jamais
 * devinées. Les flottants IEEE754 donnent 0.1 + 0.2 = 0.30000000000000004, ce
 * qui produirait de fausses erreurs sur des exercices de décimaux. On travaille
 * donc en fractions exactes p/q avec q > 0 et pgcd(|p|, q) = 1.
 */

export type Rational = { readonly n: bigint; readonly d: bigint }

function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a
  let y = b < 0n ? -b : b
  while (y) {
    const t = x % y
    x = y
    y = t
  }
  return x
}

export function rat(n: bigint | number, d: bigint | number = 1n): Rational {
  if (typeof n === 'number' && !Number.isInteger(n)) {
    return divR(fromNumber(n), rat(d))
  }
  if (typeof d === 'number' && !Number.isInteger(d)) {
    return divR(rat(n), fromNumber(d))
  }
  let nn = typeof n === 'bigint' ? n : BigInt(n)
  let dd = typeof d === 'bigint' ? d : BigInt(d)
  if (dd === 0n) throw new Error('Division par zero interdite dans un rationnel')
  if (dd < 0n) {
    nn = -nn
    dd = -dd
  }
  const g = gcd(nn, dd) || 1n
  return { n: nn / g, d: dd / g }
}

/** Convertit un nombre JS non entier en rationnel exact via son ecriture decimale. */
function fromNumber(x: number): Rational {
  const s = String(x)
  if (!/^[+-]?\d*(\.\d+)?$/.test(s)) {
    throw new Error(`Valeur numerique non representable exactement : ${x}`)
  }
  return fromDecimalString(s)
}

export const ZERO = rat(0n)
export const ONE = rat(1n)

/** Construit un rationnel exact depuis une chaîne décimale déjà normalisée (point décimal). */
export function fromDecimalString(s: string): Rational {
  const t = s.trim()
  const m = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(t)
  if (!m || (m[2] === '' && (m[3] === undefined || m[3] === ''))) {
    throw new Error(`Nombre décimal invalide : ${s}`)
  }
  const sign = m[1] === '-' ? -1n : 1n
  const intPart = m[2] === '' ? '0' : m[2]
  const fracPart = m[3] ?? ''
  const digits = BigInt(intPart + (fracPart || ''))
  const denom = 10n ** BigInt(fracPart.length)
  return rat(sign * digits, denom)
}

export function addR(a: Rational, b: Rational): Rational {
  return rat(a.n * b.d + b.n * a.d, a.d * b.d)
}
export function subR(a: Rational, b: Rational): Rational {
  return rat(a.n * b.d - b.n * a.d, a.d * b.d)
}
export function mulR(a: Rational, b: Rational): Rational {
  return rat(a.n * b.n, a.d * b.d)
}
export function divR(a: Rational, b: Rational): Rational {
  if (b.n === 0n) throw new Error('Division par zéro')
  return rat(a.n * b.d, a.d * b.n)
}
export function negR(a: Rational): Rational {
  return { n: -a.n, d: a.d }
}
export function absR(a: Rational): Rational {
  return a.n < 0n ? negR(a) : a
}
export function cmpR(a: Rational, b: Rational): -1 | 0 | 1 {
  const l = a.n * b.d
  const r = b.n * a.d
  return l < r ? -1 : l > r ? 1 : 0
}
export function eqR(a: Rational, b: Rational): boolean {
  return a.n === b.n && a.d === b.d
}
export function isIntegerR(a: Rational): boolean {
  return a.d === 1n
}
export function signR(a: Rational): -1 | 0 | 1 {
  return a.n < 0n ? -1 : a.n > 0n ? 1 : 0
}

/** Partie entière vers zéro. */
export function truncR(a: Rational): bigint {
  return a.n / a.d
}
/** Partie entière vers moins l'infini. */
export function floorR(a: Rational): bigint {
  const q = a.n / a.d
  return a.n < 0n && q * a.d !== a.n ? q - 1n : q
}
/** Plus petit entier supérieur ou égal (utile pour « combien de boîtes acheter »). */
export function ceilR(a: Rational): bigint {
  const q = a.n / a.d
  return a.n > 0n && q * a.d !== a.n ? q + 1n : q
}

/** Arrondi commercial (0,5 s'eloigne de zero) a `places` decimales. */
export function roundR(a: Rational, places = 0): Rational {
  const p = 10n ** BigInt(places)
  const scaled = mulR(a, rat(p))
  const q = scaled.n / scaled.d
  const rem = scaled.n - q * scaled.d
  let result = q
  if (rem !== 0n) {
    const twiceRem = absR(rat(rem * 2n, scaled.d))
    if (cmpR(twiceRem, ONE) >= 0) result = a.n < 0n ? q - 1n : q + 1n
  }
  return rat(result, p)
}

/** true si le rationnel s'écrit avec un nombre fini de décimales (dénominateur 2^a·5^b). */
export function hasFiniteDecimal(a: Rational): boolean {
  let d = a.d
  while (d % 2n === 0n) d /= 2n
  while (d % 5n === 0n) d /= 5n
  return d === 1n
}

/** Nombre de décimales nécessaires pour écrire exactement le rationnel (fini seulement). */
export function decimalPlaces(a: Rational): number {
  if (!hasFiniteDecimal(a)) return -1
  let d = a.d
  let twos = 0
  let fives = 0
  while (d % 2n === 0n) {
    d /= 2n
    twos++
  }
  while (d % 5n === 0n) {
    d /= 5n
    fives++
  }
  return Math.max(twos, fives)
}

/** Écriture décimale exacte si possible, sinon arrondie à `maxPlaces`. Séparateur point. */
export function toDecimalString(a: Rational, maxPlaces = 6): string {
  const places = hasFiniteDecimal(a) ? Math.min(decimalPlaces(a), maxPlaces) : maxPlaces
  const value = places === decimalPlaces(a) ? a : roundR(a, places)
  const p = 10n ** BigInt(places)
  const scaled = (value.n * p) / value.d
  const neg = scaled < 0n
  const digits = (neg ? -scaled : scaled).toString().padStart(places + 1, '0')
  const intPart = digits.slice(0, digits.length - places) || '0'
  const frac = places > 0 ? digits.slice(digits.length - places).replace(/0+$/, '') : ''
  return (neg ? '-' : '') + intPart + (frac ? '.' + frac : '')
}

/** Écriture française : virgule décimale, espace fine insécable pour les milliers. */
export function toFrench(a: Rational, maxPlaces = 6): string {
  const s = toDecimalString(a, maxPlaces)
  const neg = s.startsWith('-')
  const body = neg ? s.slice(1) : s
  const [i, f] = body.split('.')
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return (neg ? '−' : '') + grouped + (f ? ',' + f : '')
}

/** Écriture en fraction irréductible, ou entier si dénominateur 1. */
export function toFractionString(a: Rational): string {
  return a.d === 1n ? a.n.toString() : `${a.n}/${a.d}`
}

export function toNumber(a: Rational): number {
  return Number(a.n) / Number(a.d)
}

/** Puissance entière (exposant petit). */
export function powR(a: Rational, e: number): Rational {
  if (e === 0) return ONE
  if (e < 0) return divR(ONE, powR(a, -e))
  let r = ONE
  for (let i = 0; i < e; i++) r = mulR(r, a)
  return r
}
