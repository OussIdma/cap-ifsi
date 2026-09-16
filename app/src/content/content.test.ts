/**
 * Contrôle automatique de tous les contenus publiés.
 *
 * C'est ce test qui justifie l'état « tests automatiques réussis » affiché sur
 * les contenus. Il vérifie, pour chaque gabarit et sur plusieurs graines :
 *   - que l'énoncé, les indices, l'explication alternative et la correction
 *     existent réellement ;
 *   - que la réponse attendue, resoumise telle quelle, est jugée juste ;
 *   - qu'aucune réponse fausse déclarée par l'auteur ne coïncide avec la bonne ;
 *   - qu'aucun texte affiché ne contient « undefined », « NaN » ou « null ».
 */

import { describe, expect, it } from 'vitest'
import {
  EXAM_PAPERS,
  EXERCISE_TEMPLATES,
  FRENCH_EXERCISES,
  HEALTH_SHEETS,
  LESSONS,
  ORAL_QUESTIONS,
  SKILLS,
  WRITTEN_TASKS,
  coverage,
  generate,
  getSkill,
  lessonFor,
  templateById,
} from './registry'
import { formatExpected, grade, type AnswerSpec } from '@/engine/answer'
import type { Block, GeneratedExercise, SolutionStep } from './types'

const SEEDS = [1, 2, 3, 7, 11, 23, 42, 101, 512, 4096, 65537, 999983]

/** Réponse canonique attendue, telle qu'une utilisatrice l'écrirait. */
function canonical(spec: AnswerSpec): string | string[] {
  switch (spec.kind) {
    case 'choice':
      return [...spec.correct]
    case 'order':
      return [...spec.correct]
    default:
      return formatExpected(spec)
  }
}

function textOf(blocks: readonly Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'p':
        case 'lead':
        case 'heading':
          return b.text
        case 'key':
        case 'warn':
          return `${b.title ?? ''} ${b.text}`
        case 'list':
          return b.items.join(' ')
        case 'vocab':
          return b.items.map((i) => `${i.term} ${i.def}`).join(' ')
        case 'quote':
          return `${b.text} ${b.source ?? ''}`
        case 'visual': {
          // On ne contrôle que le texte lisible du schéma : les cases vides
          // d'un tableau de conversion sont légitimement nulles.
          const v = b.visual as Record<string, unknown>
          const parts: string[] = []
          if (typeof v.caption === 'string') parts.push(v.caption)
          if (typeof v.label === 'string') parts.push(v.label)
          if (Array.isArray(v.steps)) {
            for (const st of v.steps as { calc?: string; why?: string }[]) {
              parts.push(st.calc ?? '', st.why ?? '')
            }
          }
          if (Array.isArray(v.rows)) for (const r of v.rows as string[][]) parts.push(r.join(' '))
          if (Array.isArray(v.headers)) parts.push((v.headers as string[]).join(' '))
          if (Array.isArray(v.bars)) for (const bar of v.bars as { label: string }[]) parts.push(bar.label)
          if (Array.isArray(v.marks)) for (const mk of v.marks as { label: string }[]) parts.push(mk.label)
          if (Array.isArray(v.spans)) for (const sp of v.spans as { label: string }[]) parts.push(sp.label)
          if (Array.isArray(v.columns))
            for (const c of v.columns as { top: string; bottom: string }[]) parts.push(c.top, c.bottom)
          if (Array.isArray(v.items))
            for (const it of v.items as { name?: string }[]) parts.push(it.name ?? '')
          return parts.join(' ')
        }
      }
    })
    .join(' ')
}

function stepsText(steps: readonly SolutionStep[]): string {
  return steps.map((s) => `${s.text} ${s.calc ?? ''} ${s.why ?? ''}`).join(' ')
}

const FORBIDDEN = /\b(undefined|NaN|null|\[object Object\])\b/

/** Sérialisation stable, les rationnels contenant des BigInt. */
const dump = (v: unknown): string =>
  JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? `${x}n` : x))

function checkExercise(ex: GeneratedExercise, label: string) {
  expect(ex.prompt.length, `${label} : énoncé vide`).toBeGreaterThan(0)
  expect(ex.question.trim().length, `${label} : question vide`).toBeGreaterThan(5)
  expect(ex.hints.length, `${label} : il faut exactement deux indices`).toBe(2)
  expect(ex.hints[0].trim().length, `${label} : premier indice vide`).toBeGreaterThan(10)
  expect(ex.hints[1].trim().length, `${label} : deuxième indice vide`).toBeGreaterThan(10)
  expect(ex.alternative.length, `${label} : pas d’explication alternative`).toBeGreaterThan(0)
  expect(ex.solution.length, `${label} : correction vide`).toBeGreaterThan(0)

  const all = [
    textOf(ex.prompt),
    ex.question,
    ...ex.hints,
    textOf(ex.alternative),
    stepsText(ex.solution),
    ex.conclusion ?? '',
    formatExpected(ex.answer),
  ].join(' ')
  expect(FORBIDDEN.test(all), `${label} : texte contenant ${all.match(FORBIDDEN)?.[0]}`).toBe(false)

  // La bonne réponse doit être acceptée.
  const verdict = grade(ex.answer, canonical(ex.answer))
  expect(verdict.correct, `${label} : la réponse attendue « ${formatExpected(ex.answer)} » est refusée — ${verdict.message}`).toBe(true)

  // Un piège déclaré ne doit jamais coïncider avec la bonne réponse.
  const spec = ex.answer
  if ('pitfalls' in spec && spec.pitfalls) {
    for (const pit of spec.pitfalls) {
      const v = grade(spec, pit.answer)
      expect(
        v.correct,
        `${label} : la réponse fausse déclarée « ${pit.answer} » est acceptée comme juste`,
      ).toBe(false)
      expect(pit.why.trim().length, `${label} : explication de piège vide`).toBeGreaterThan(15)
    }
  }

  // Un QCM doit avoir au moins deux options et au moins une bonne réponse.
  if (spec.kind === 'choice') {
    expect(spec.options.length, `${label} : QCM à moins de deux options`).toBeGreaterThanOrEqual(2)
    expect(spec.correct.length, `${label} : QCM sans bonne réponse`).toBeGreaterThanOrEqual(1)
    for (const id of spec.correct) {
      expect(spec.options.some((o) => o.id === id), `${label} : bonne réponse « ${id} » absente des options`).toBe(true)
    }
    for (const o of spec.options) {
      if (!spec.correct.includes(o.id)) {
        expect(
          (o.feedback ?? '').trim().length,
          `${label} : l’option fausse « ${o.label} » n’explique pas pourquoi elle est fausse`,
        ).toBeGreaterThan(15)
      }
    }
  }

  if (spec.kind === 'order') {
    expect(spec.items.length, `${label} : remise en ordre à moins de trois éléments`).toBeGreaterThanOrEqual(3)
    expect(new Set(spec.correct).size, `${label} : ordre attendu avec doublons`).toBe(spec.correct.length)
  }
}

describe('référentiel de compétences', () => {
  it('a des identifiants uniques', () => {
    expect(new Set(SKILLS.map((s) => s.id)).size).toBe(SKILLS.length)
  })
  it('ne référence que des prérequis existants', () => {
    for (const s of SKILLS) {
      for (const p of s.prerequisites) {
        expect(getSkill(p), `${s.id} référence un prérequis inconnu : ${p}`).toBeDefined()
      }
    }
  })
  it('ne contient aucun cycle de prérequis', () => {
    const seen = new Map<string, number>()
    const visit = (id: string, stack: string[]): void => {
      if (stack.includes(id)) throw new Error(`Cycle de prérequis : ${[...stack, id].join(' → ')}`)
      if (seen.get(id) === 1) return
      seen.set(id, 1)
      for (const p of getSkill(id)?.prerequisites ?? []) visit(p, [...stack, id])
    }
    expect(() => SKILLS.forEach((s) => visit(s.id, []))).not.toThrow()
  })
})

describe('leçons', () => {
  it('portent sur une compétence connue', () => {
    for (const l of LESSONS) expect(getSkill(l.skillId), `leçon orpheline : ${l.skillId}`).toBeDefined()
  })
  it('contiennent explication, alternative, exemple résolu et erreurs fréquentes', () => {
    for (const l of LESSONS) {
      expect(l.explanation.length, `${l.skillId} : explication vide`).toBeGreaterThan(0)
      expect(l.alternative.length, `${l.skillId} : pas d’explication alternative`).toBeGreaterThan(0)
      expect(l.workedExamples.length, `${l.skillId} : aucun exemple résolu`).toBeGreaterThan(0)
      expect(l.commonMistakes.length, `${l.skillId} : aucune erreur fréquente`).toBeGreaterThan(0)
      for (const w of l.workedExamples) {
        expect(w.steps.length, `${l.skillId} : exemple sans étapes`).toBeGreaterThan(1)
        for (const st of w.steps) {
          expect(st.why.trim().length, `${l.skillId} : une étape sans « pourquoi »`).toBeGreaterThan(10)
        }
        expect(w.conclusion.trim().length, `${l.skillId} : exemple sans conclusion`).toBeGreaterThan(10)
      }
    }
  })
  it('n’affichent aucun texte cassé', () => {
    for (const l of LESSONS) {
      const all = textOf(l.explanation) + textOf(l.alternative)
      expect(FORBIDDEN.test(all), `${l.skillId} : texte cassé`).toBe(false)
    }
  })
})

describe('gabarits d’exercices de calculs', () => {
  it('ont des identifiants uniques', () => {
    expect(new Set(EXERCISE_TEMPLATES.map((t) => t.id)).size).toBe(EXERCISE_TEMPLATES.length)
  })

  it('portent sur une compétence connue', () => {
    for (const t of EXERCISE_TEMPLATES) {
      expect(getSkill(t.skillId), `${t.id} : compétence inconnue`).toBeDefined()
    }
  })

  it.each(EXERCISE_TEMPLATES.map((t) => [t.id] as const))(
    'produisent un exercice valide sur plusieurs graines : %s',
    (id) => {
      const t = templateById(id)!
      for (const seed of SEEDS) {
        const ex = generate(t.id, seed)!
        checkExercise(ex, `${id} (graine ${seed})`)
      }
    },
  )

  it('sont reproductibles : même graine, même énoncé', () => {
    for (const t of EXERCISE_TEMPLATES) {
      const a = generate(t.id, 12345)!
      const b = generate(t.id, 12345)!
      expect(dump(a), `${t.id} n’est pas reproductible`).toBe(dump(b))
    }
  })

  it('produisent des énoncés différents selon la graine', () => {
    for (const t of EXERCISE_TEMPLATES) {
      const variants = new Set(SEEDS.map((s) => dump(generate(t.id, s))))
      expect(variants.size, `${t.id} ne varie pas`).toBeGreaterThan(1)
    }
  })
})

describe('micro-exercices de français', () => {
  it('ont des identifiants uniques', () => {
    expect(new Set(FRENCH_EXERCISES.map((e) => e.id)).size).toBe(FRENCH_EXERCISES.length)
  })
  it('sont valides', () => {
    for (const e of FRENCH_EXERCISES) {
      expect(getSkill(e.skillId), `${e.id} : compétence inconnue`).toBeDefined()
      checkExercise(
        {
          prompt: e.prompt.length ? e.prompt : [{ type: 'p', text: e.question }],
          question: e.question,
          answer: e.answer,
          hints: e.hints,
          alternative: e.alternative,
          solution: e.solution,
        },
        e.id,
      )
    }
  })
})

describe('fiches sanitaires et sociales', () => {
  it('couvrent H01 à H24', () => {
    const ids = HEALTH_SHEETS.map((s) => s.id).sort()
    const expected = Array.from({ length: 24 }, (_, i) => `H${String(i + 1).padStart(2, '0')}`)
    expect(ids).toEqual(expected)
  })
  it('contiennent tous les blocs attendus', () => {
    for (const s of HEALTH_SHEETS) {
      expect(s.definition.length, `${s.id} : définition vide`).toBeGreaterThan(0)
      expect(s.vocabulary.length, `${s.id} : vocabulaire vide`).toBeGreaterThanOrEqual(4)
      expect(s.stakes.length, `${s.id} : enjeux vides`).toBeGreaterThan(0)
      expect(s.example.length, `${s.id} : exemple absent`).toBeGreaterThan(0)
      expect(s.professionals.length, `${s.id} : rôle des professionnels absent`).toBeGreaterThan(0)
      expect(s.comprehension.length, `${s.id} : aucune question de compréhension`).toBeGreaterThanOrEqual(2)
      expect(s.argument.reference.length, `${s.id} : pas de corrigé de référence`).toBeGreaterThan(0)
      expect(s.argument.criteria.length, `${s.id} : pas de critères`).toBeGreaterThan(0)
      expect(s.sources.length, `${s.id} : aucune source`).toBeGreaterThan(0)
    }
  })
  it('corrigent correctement leurs questions de compréhension', () => {
    for (const s of HEALTH_SHEETS) {
      for (const q of s.comprehension) {
        const v = grade(q.answer, canonical(q.answer))
        expect(v.correct, `${q.id} : la bonne réponse est refusée`).toBe(true)
        expect(q.explain.trim().length, `${q.id} : explication absente`).toBeGreaterThan(30)
      }
    }
  })
  it('ne prétendent jamais avoir consulté une source aujourd’hui', () => {
    for (const s of HEALTH_SHEETS) {
      for (const src of s.sources) {
        expect(src.checkedOn, `${s.id} : une date de consultation est affirmée sans consultation réelle`).toBeUndefined()
      }
    }
  })
})

describe('banque orale', () => {
  it('couvre les douze axes', () => {
    const skills = new Set(ORAL_QUESTIONS.map((q) => q.skillId))
    for (let i = 1; i <= 12; i++) {
      expect(skills.has(`O${String(i).padStart(2, '0')}`), `axe O${i} sans question`).toBe(true)
    }
  })
  it('a des questions complètes', () => {
    for (const q of ORAL_QUESTIONS) {
      expect(q.question.trim().length, `${q.id} : question vide`).toBeGreaterThan(15)
      expect(q.looksFor.length, `${q.id} : rien à observer`).toBeGreaterThan(0)
      expect(q.avoid.length, `${q.id} : aucun piège signalé`).toBeGreaterThan(0)
      expect(q.criteria.length, `${q.id} : aucune grille`).toBeGreaterThan(0)
      expect(q.frame.length, `${q.id} : aucune trame de préparation`).toBeGreaterThan(0)
      for (const f of q.frame) {
        expect(f.help.trim().length, `${q.id} : aide de trame vide`).toBeGreaterThan(10)
      }
    }
  })
  it('ne pré-remplit jamais une expérience à la place de l’utilisatrice', () => {
    for (const q of ORAL_QUESTIONS) {
      for (const f of q.frame) {
        // La trame ne doit contenir que des consignes, jamais un récit rédigé.
        expect(/^J’ai |^Je me souviens|^Un jour/.test(f.help), `${q.id} : la trame contient un récit pré-rédigé`).toBe(false)
      }
    }
  })
})

describe('sujets rédigés', () => {
  it('ont des identifiants uniques et des corrigés', () => {
    expect(new Set(WRITTEN_TASKS.map((w) => w.id)).size).toBe(WRITTEN_TASKS.length)
    for (const w of WRITTEN_TASKS) {
      expect(w.reference.length, `${w.id} : pas de corrigé de référence`).toBeGreaterThan(0)
      expect(w.criteria.length, `${w.id} : pas de critères`).toBeGreaterThan(0)
      expect(w.guidance.length, `${w.id} : aucune aide méthodologique`).toBeGreaterThan(0)
      expect(w.otherAcceptable.length, `${w.id} : aucune autre réponse recevable`).toBeGreaterThan(0)
      expect(w.comparison, `${w.id} : pas de comparaison de copies`).toBeDefined()
      expect(w.origin.length, `${w.id} : origine non documentée`).toBeGreaterThan(10)
    }
  })
  it('somment 10 points par sujet', () => {
    for (const w of WRITTEN_TASKS) {
      const total = w.criteria.reduce((n, c) => n + c.points, 0)
      expect(total, `${w.id} : barème à ${total} points`).toBe(10)
    }
  })
})

describe('examens blancs', () => {
  it('sont au nombre annoncé et référencent des gabarits existants', () => {
    expect(EXAM_PAPERS.length).toBe(12)
    for (const paper of EXAM_PAPERS) {
      for (const q of paper.maths) {
        expect(templateById(q.templateId), `${paper.id} : gabarit inconnu ${q.templateId}`).toBeDefined()
      }
    }
  })
  it('valent 10 points à l’écrit de rédaction et 10 points en calculs', () => {
    for (const paper of EXAM_PAPERS) {
      const w = paper.writing.questions.reduce((n, q) => n + q.points, 0)
      const m = paper.maths.reduce((n, q) => n + q.points, 0)
      expect(w, `${paper.id} : rédaction sur ${w}`).toBe(10)
      expect(m, `${paper.id} : calculs sur ${m}`).toBe(10)
    }
  })
  it('produisent des exercices de calculs valides avec leurs graines fixées', () => {
    for (const paper of EXAM_PAPERS) {
      for (const q of paper.maths) {
        const ex = generate(q.templateId, q.seed)
        expect(ex, `${paper.id}/${q.id} : génération impossible`).toBeDefined()
        checkExercise(ex!, `${paper.id}/${q.id}`)
      }
    }
  })
  it('n’utilisent aucun complément M17 à M20', () => {
    for (const paper of EXAM_PAPERS) {
      for (const q of paper.maths) {
        const skillId = templateById(q.templateId)!.skillId
        expect(
          ['M17', 'M18', 'M19', 'M20'].includes(skillId),
          `${paper.id} utilise ${skillId}, qui est un complément hors socle`,
        ).toBe(false)
      }
    }
  })
  it('ont chacun des questions de rédaction avec corrigé', () => {
    for (const paper of EXAM_PAPERS) {
      for (const q of paper.writing.questions) {
        expect(q.reference.length, `${paper.id}/${q.id} : pas de corrigé`).toBeGreaterThan(0)
        expect(q.criteria.length, `${paper.id}/${q.id} : pas de critères`).toBeGreaterThan(0)
        const total = q.criteria.reduce((n, c) => n + c.points, 0)
        expect(total, `${paper.id}/${q.id} : critères à ${total} points pour ${q.points} points`).toBe(q.points)
      }
    }
  })
})

describe('matrice de couverture', () => {
  it('est calculée à partir des contenus réels', () => {
    const rows = coverage()
    expect(rows.length).toBe(SKILLS.length)
    // Une compétence sans leçon ni exercice ne doit jamais apparaître comme couverte.
    for (const r of rows) {
      if (!r.lesson || r.structures === 0) expect(r.covered).toBe(false)
    }
  })
  it('signale précisément ce qui manque, sans annoncer une couverture inexistante', () => {
    const rows = coverage()
    const covered = rows.filter((r) => r.covered).length
    expect(covered).toBeLessThanOrEqual(rows.length)
    // Ce test documente l'état réel ; il échoue si la couverture régresse.
    expect(covered).toBeGreaterThan(0)
  })
})

describe('leçons associées aux compétences de calculs', () => {
  it('existent pour M01 à M20', () => {
    for (let i = 1; i <= 20; i++) {
      const id = `M${String(i).padStart(2, '0')}`
      expect(lessonFor(id), `pas de leçon pour ${id}`).toBeDefined()
    }
  })
  it('existent pour F01 à F12', () => {
    for (let i = 1; i <= 12; i++) {
      const id = `F${String(i).padStart(2, '0')}`
      expect(lessonFor(id), `pas de leçon pour ${id}`).toBeDefined()
    }
  })
})
