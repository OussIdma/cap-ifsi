import { describe, expect, it } from 'vitest'
import {
  formatMinutesAsHM,
  grade,
  parseDurationMinutes,
  parseQuantity,
  type NumericSpec,
} from './answer'
import { addR, ceilR, divR, eqR, mulR, rat, roundR, subR, toFrench } from './rational'
import { convert, unitBySymbol } from './units'

const g = (s: string) => unitBySymbol(s)!

describe('arithmétique exacte', () => {
  it('additionne des décimaux sans erreur de flottant', () => {
    // 18,75 + 6,8 = 25,55 — en flottants JS, 18.75 + 6.8 = 25.549999999999997
    const r = addR(rat(1875n, 100n), rat(68n, 10n))
    expect(toFrench(r)).toBe('25,55')
  })

  it('calcule 3/4 × 240 = 180', () => {
    expect(toFrench(mulR(rat(3n, 4n), rat(240n)))).toBe('180')
  })

  it('calcule 15 % de 240 = 36', () => {
    expect(toFrench(mulR(rat(15n, 100n), rat(240n)))).toBe('36')
  })

  it('arrondit en s\'éloignant de zéro', () => {
    expect(toFrench(roundR(rat(125n, 100n), 1))).toBe('1,3')
    expect(toFrench(roundR(rat(-125n, 100n), 1))).toBe('−1,3')
    expect(toFrench(roundR(rat(2n, 3n), 2))).toBe('0,67')
  })

  it('50 objets en boîtes de 12 : 5 boîtes, pas 4,17', () => {
    const exact = divR(rat(50n), rat(12n))
    expect(toFrench(exact, 2)).toBe('4,17')
    expect(ceilR(exact)).toBe(5n)
  })

  it('1,5 L par jour pendant 7 jours = 10,5 L, soit 14 bouteilles de 0,75 L', () => {
    const total = mulR(rat(15n, 10n), rat(7n))
    expect(toFrench(total)).toBe('10,5')
    expect(ceilR(divR(total, rat(75n, 100n)))).toBe(14n)
  })
})

describe('conversions d\'unités', () => {
  it('0,075 g = 75 mg', () => {
    expect(eqR(convert(rat(75n, 1000n), g('g'), g('mg')), rat(75n))).toBe(true)
  })
  it('1,5 L + 250 mL = 1 750 mL', () => {
    const total = addR(convert(rat(15n, 10n), g('L'), g('mL')), rat(250n))
    expect(toFrench(total)).toBe('1 750')
  })
  it('1,75 h = 105 min = 1 h 45', () => {
    expect(formatMinutesAsHM(convert(rat(175n, 100n), g('h'), g('min')))).toBe('1 h 45')
  })
})

describe('lecture des nombres saisis', () => {
  it('accepte la virgule et le point', () => {
    expect(eqR(parseQuantity('1,5').value, parseQuantity('1.5').value)).toBe(true)
  })
  it('accepte les espaces de milliers', () => {
    expect(toFrench(parseQuantity('1 750 mL').value)).toBe('1 750')
    expect(parseQuantity('1 750 mL').unit?.symbol).toBe('mL')
  })
  it('refuse une écriture ambiguë mêlant virgule et point', () => {
    expect(() => parseQuantity('1,750.5')).toThrow(/ambiguë/)
  })
  it('refuse deux virgules', () => {
    expect(() => parseQuantity('1,750,000')).toThrow(/ambiguë/)
  })
  it('lit une fraction', () => {
    const p = parseQuantity('3/4')
    expect(p.writtenAsFraction).toBe(true)
    expect(eqR(p.value, rat(3n, 4n))).toBe(true)
  })
})

describe('durées', () => {
  it('lit 1h30, 1 h 30 et 90 min comme 90 minutes', () => {
    for (const s of ['1h30', '1 h 30', '1 h 30 min', '90 min']) {
      expect(eqR(parseDurationMinutes(s, 'min').minutes, rat(90n))).toBe(true)
    }
  })
  it('lit 1,5 h comme 90 minutes', () => {
    expect(eqR(parseDurationMinutes('1,5 h', 'h').minutes, rat(90n))).toBe(true)
  })
  it('refuse 1 h 75 (minutes hors intervalle)', () => {
    expect(() => parseDurationMinutes('1 h 75', 'min')).toThrow(/0 et 59/)
  })
  it('de 22 h 40 à 0 h 15 : 1 h 35', () => {
    const start = 22 * 60 + 40
    const end = 24 * 60 + 15
    expect(formatMinutesAsHM(rat(BigInt(end - start)))).toBe('1 h 35')
  })
})

describe('correction numérique', () => {
  const spec75mg: NumericSpec = { kind: 'numeric', value: rat(75n), unit: 'mg' }

  it('accepte 75 mg', () => {
    expect(grade(spec75mg, '75 mg').correct).toBe(true)
  })

  it('accepte 0,075 g comme équivalent quand l\'unité est libre', () => {
    const v = grade(spec75mg, '0,075 g')
    expect(v.correct).toBe(true)
    expect(v.status).toBe('juste-autre-unite')
  })

  it('refuse 0,075 g quand la consigne impose les mg', () => {
    const v = grade({ ...spec75mg, unitPolicy: 'required' }, '0,075 g')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('unite')
  })

  it('détecte 75 g comme erreur d\'unité', () => {
    const v = grade(spec75mg, '75 g')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('unite')
    expect(v.message).toMatch(/nombre est juste/)
  })

  it('détecte une erreur de virgule (résultat 10 fois trop grand)', () => {
    const v = grade(spec75mg, '750 mg')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('virgule')
    expect(v.message).toMatch(/10 fois trop grand/)
  })

  it('refuse une unité d\'une autre grandeur', () => {
    const v = grade(spec75mg, '75 mL')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('consigne')
  })

  it('exige l\'unité quand la consigne le demande', () => {
    const v = grade({ ...spec75mg, unitPolicy: 'required' }, '75')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('unite')
  })

  it('signale un arrondi non demandé', () => {
    const spec: NumericSpec = { kind: 'numeric', value: rat(2555n, 100n) }
    const v = grade(spec, '25,6')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('arrondi')
  })

  it('refuse trop de décimales quand un arrondi est demandé', () => {
    const spec: NumericSpec = {
      kind: 'numeric',
      value: rat(417n, 100n),
      rounding: { places: 2, label: 'un arrondi au centième' },
    }
    expect(grade(spec, '4,17').correct).toBe(true)
    const v = grade(spec, '4,1700')
    expect(v.correct).toBe(true) // 4,1700 s'écrit avec 4 décimales mais vaut 4,17
  })

  it('utilise le piège déclaré par l\'auteur', () => {
    const spec: NumericSpec = {
      kind: 'numeric',
      value: rat(5n),
      unit: undefined,
      pitfalls: [
        {
          answer: '4,17',
          tag: 'raisonnement',
          why: 'On ne peut pas acheter 4,17 boîtes : il faut arrondir au-dessus.',
        },
      ],
    }
    const v = grade(spec, '4,17')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('raisonnement')
  })

  it('donne une liste d\'étapes quand la cause est inconnue', () => {
    const v = grade({ kind: 'numeric', value: rat(36n) }, '19')
    expect(v.tag).toBe('inconnu')
    expect(v.checklist?.length).toBeGreaterThan(0)
  })
})

describe('correction des durées', () => {
  it('1 h 30 en heures décimales vaut 1,5 h', () => {
    const spec = { kind: 'duration', minutes: rat(90n), display: 'decimal-h' } as const
    expect(grade(spec, '1,5').correct).toBe(true)
    expect(grade(spec, '1,5 h').correct).toBe(true)
  })

  it('refuse 1,30 h et explique la confusion minutes / décimales', () => {
    const spec = { kind: 'duration', minutes: rat(90n), display: 'decimal-h' } as const
    const v = grade(spec, '1,30')
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('virgule')
    expect(v.message).toMatch(/fraction d'heure/)
  })

  it('accepte 1 h 45 pour 1,75 h en écriture heures-minutes', () => {
    const spec = { kind: 'duration', minutes: rat(105n), display: 'hm' } as const
    expect(grade(spec, '1h45').correct).toBe(true)
    expect(grade(spec, '105 min').correct).toBe(true)
  })

  it('signale une erreur d\'une heure exactement', () => {
    const spec = { kind: 'duration', minutes: rat(95n), display: 'hm' } as const
    const v = grade(spec, '2 h 35')
    expect(v.tag).toBe('operation')
  })
})

describe('correction des heures', () => {
  it('accepte 0 h 15', () => {
    expect(grade({ kind: 'clock', minutesOfDay: 15 }, '0 h 15').correct).toBe(true)
  })
  it('signale un décalage de 12 heures', () => {
    const v = grade({ kind: 'clock', minutesOfDay: 8 * 60 }, '20 h 00')
    expect(v.tag).toBe('raisonnement')
  })
})

describe('QCM et remise en ordre', () => {
  it('rend le retour associé à la mauvaise option', () => {
    const v = grade(
      {
        kind: 'choice',
        options: [
          { id: 'a', label: 'Citer' },
          { id: 'b', label: 'Expliquer', feedback: 'Expliquer demande de développer le pourquoi.', tag: 'consigne' },
        ],
        correct: ['a'],
      },
      ['b'],
    )
    expect(v.correct).toBe(false)
    expect(v.tag).toBe('consigne')
  })

  it('indique la première position fautive d\'un classement', () => {
    const v = grade(
      {
        kind: 'order',
        items: [
          { id: '1', label: 'Lire' },
          { id: '2', label: 'Calculer' },
          { id: '3', label: 'Vérifier' },
        ],
        correct: ['1', '2', '3'],
      },
      ['2', '1', '3'],
    )
    expect(v.correct).toBe(false)
    expect(v.message).toMatch(/position 1/)
  })
})

describe('non-régression : aucune division par zéro tolérée', () => {
  it('lève une erreur explicite', () => {
    expect(() => divR(rat(1n), rat(0n))).toThrow()
    expect(() => subR(rat(1n), rat(0n))).not.toThrow()
  })
})
