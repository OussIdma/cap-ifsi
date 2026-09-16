import { describe, expect, it } from 'vitest'
import { evaluateExam, formatCountdown, remainingMs } from './exam'
import { addDays, applyAttempt, daysBetween, softenBacklog, toDay } from './mastery'
import { emptySkillProgress, type SkillProgress } from '@/store/schema'

describe('seuils de l’article 12', () => {
  it('français 6/10, maths 1/10, oral 18/20 : écrit éliminatoire', () => {
    const r = evaluateExam({ writing: 6, maths: 1, oral: 18 })
    expect(r.written).toBe(7)
    expect(r.total).toBe(25)
    expect(r.status).toBe('ecrit-eliminatoire')
    expect(r.writtenEliminatory).toBe(true)
  })

  it('français 8/10, maths 9/10, oral 7/20 : oral éliminatoire', () => {
    const r = evaluateExam({ writing: 8, maths: 9, oral: 7 })
    expect(r.written).toBe(17)
    expect(r.total).toBe(24)
    expect(r.status).toBe('oral-eliminatoire')
    expect(r.oralEliminatory).toBe(true)
  })

  it('français 2/10, maths 6/10, oral 12/20 : seuils atteints, admission non garantie', () => {
    const r = evaluateExam({ writing: 2, maths: 6, oral: 12 })
    expect(r.written).toBe(8)
    expect(r.total).toBe(20)
    expect(r.status).toBe('seuils-atteints')
    expect(r.message).toMatch(/n’est pas garantie/)
  })

  it('français 5/10, maths 5/10, oral 9/20 : total insuffisant', () => {
    const r = evaluateExam({ writing: 5, maths: 5, oral: 9 })
    expect(r.written).toBe(10)
    expect(r.total).toBe(19)
    expect(r.status).toBe('total-insuffisant')
  })

  it('ne calcule aucun total définitif si une note manque', () => {
    const r = evaluateExam({ writing: 8, maths: 9 })
    expect(r.incomplete).toBe(true)
    expect(r.total).toBeUndefined()
    expect(r.missing).toContain('la note d’entretien')
  })

  it('n’annonce jamais une admission', () => {
    for (const marks of [
      { writing: 10, maths: 10, oral: 20 },
      { writing: 9, maths: 9, oral: 18 },
    ]) {
      const r = evaluateExam(marks)
      expect(r.message).not.toMatch(/admission garantie|vous serez admise|réussite assurée/i)
    }
  })

  it('applique un seuil à 8 strictement inférieur', () => {
    expect(evaluateExam({ writing: 4, maths: 4, oral: 12 }).status).toBe('seuils-atteints')
    expect(evaluateExam({ writing: 4, maths: 3, oral: 13 }).status).toBe('ecrit-eliminatoire')
    expect(evaluateExam({ writing: 6, maths: 6, oral: 8 }).status).toBe('seuils-atteints')
  })

  it('n’applique aucun seuil autonome de 4/10 par sous-épreuve', () => {
    // Maths 1/10 mais écrit total 9/20 et oral 12/20 : les seuils sont atteints.
    const r = evaluateExam({ writing: 8, maths: 1, oral: 12 })
    expect(r.written).toBe(9)
    expect(r.status).toBe('seuils-atteints')
  })
})

describe('minuteur d’examen', () => {
  it('survit à un rechargement en ne stockant qu’une échéance', () => {
    const end = 1_000_000
    expect(remainingMs(end, 900_000)).toBe(100_000)
    expect(remainingMs(end, 1_100_000)).toBe(0)
    expect(remainingMs(undefined, 0)).toBe(0)
  })
  it('affiche un compte à rebours lisible', () => {
    expect(formatCountdown(95_000)).toBe('01:35')
    expect(formatCountdown(0)).toBe('00:00')
    expect(formatCountdown(30 * 60 * 1000)).toBe('30:00')
  })
})

describe('progression', () => {
  const day = '2026-09-16'

  it('deux échecs de suite ramènent la compétence à « à reprendre »', () => {
    let p: SkillProgress = emptySkillProgress()
    p = applyAttempt(p, { correct: false, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    expect(p.state).toBe('a-consolider')
    p = applyAttempt(p, { correct: false, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    expect(p.state).toBe('fragile')
    expect(p.nextReview).toBe(addDays(day, 1))
  })

  it('une réussite avec indice ne vaut jamais « consolidée »', () => {
    let p: SkillProgress = emptySkillProgress()
    for (let i = 0; i < 5; i++) {
      p = applyAttempt(p, { correct: true, hintsUsed: 1, usedAlternative: false, structure: `s${i}` }, addDays(day, i))
    }
    expect(p.state).toBe('a-consolider')
    expect(p.successesAided).toBe(5)
    expect(p.successesUnaided).toBe(0)
  })

  it('une explication alternative compte comme une aide', () => {
    let p: SkillProgress = emptySkillProgress()
    p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: true, structure: 'a' }, day)
    expect(p.state).toBe('a-consolider')
    expect(p.successesAided).toBe(1)
  })

  it('exige plusieurs structures ET plusieurs jours pour consolider', () => {
    let p: SkillProgress = emptySkillProgress()
    // Deux structures le même jour : pas encore consolidée.
    p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'b' }, day)
    expect(p.state).toBe('a-consolider')
    // Un autre jour : consolidée.
    p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'b' }, addDays(day, 3))
    expect(p.state).toBe('consolidee')
  })

  it('espace les révisions J+1, J+3, J+7, J+14 après des réussites autonomes', () => {
    let p: SkillProgress = emptySkillProgress()
    const steps = [1, 3, 7, 14, 14]
    let d = day
    for (const expected of steps) {
      p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'a' }, d)
      expect(daysBetween(d, p.nextReview!)).toBe(expected)
      d = p.nextReview!
    }
  })

  it('ramène la révision à J+1 après un échec', () => {
    let p: SkillProgress = emptySkillProgress()
    for (let i = 0; i < 3; i++) {
      p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    }
    p = applyAttempt(p, { correct: false, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    expect(p.nextReview).toBe(addDays(day, 1))
    expect(p.reviewStep).toBe(0)
  })

  it('n’impose pas toute la dette de révision après une absence', () => {
    const skills: Record<string, SkillProgress> = {}
    for (let i = 0; i < 9; i++) {
      skills[`S${i}`] = { ...emptySkillProgress(), nextReview: addDays(day, -i - 1) }
    }
    const softened = softenBacklog(skills, day, 2)
    const dueToday = Object.values(softened).filter((p) => p.nextReview! <= day).length
    expect(dueToday).toBe(2)
    // Aucune compétence n'est perdue : toutes conservent une date.
    expect(Object.values(softened).every((p) => !!p.nextReview)).toBe(true)
  })

  it('ne repasse jamais une compétence travaillée à « non évaluée »', () => {
    let p: SkillProgress = emptySkillProgress()
    p = applyAttempt(p, { correct: true, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    p = applyAttempt(p, { correct: false, hintsUsed: 0, usedAlternative: false, structure: 'a' }, day)
    expect(p.state).not.toBe('non-evaluee')
  })

  it('calcule les dates sans décalage de fuseau', () => {
    expect(toDay(new Date(2027, 0, 1))).toBe('2027-01-01')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2027-03-01', -1)).toBe('2027-02-28')
    expect(daysBetween('2027-01-01', '2027-01-15')).toBe(14)
  })
})
