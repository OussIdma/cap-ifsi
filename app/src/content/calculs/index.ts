import type { ExerciseTemplate, Lesson } from '../types'
import { LESSONS_M01_M05, TEMPLATES_M01_M05 } from './m01-m05'
import { LESSONS_M06_M09, TEMPLATES_M06_M09 } from './m06-m09'
import { LESSONS_M10_M12, TEMPLATES_M10_M12 } from './m10-m12'
import { LESSONS_M13_M16, TEMPLATES_M13_M16 } from './m13-m16'
import { LESSONS_M17_M20, TEMPLATES_M17_M20 } from './m17-m20'
import { TEMPLATES_COMPLEMENTS } from './complements'

export const LESSONS_CALCULS: Lesson[] = [
  ...LESSONS_M01_M05,
  ...LESSONS_M06_M09,
  ...LESSONS_M10_M12,
  ...LESSONS_M13_M16,
  ...LESSONS_M17_M20,
]

export const TEMPLATES_CALCULS: ExerciseTemplate[] = [
  ...TEMPLATES_M01_M05,
  ...TEMPLATES_M06_M09,
  ...TEMPLATES_M10_M12,
  ...TEMPLATES_M13_M16,
  ...TEMPLATES_M17_M20,
  ...TEMPLATES_COMPLEMENTS,
]
