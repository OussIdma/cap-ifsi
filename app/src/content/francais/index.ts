import type { FrenchExercise, Lesson } from '../types'
import { LESSONS_FRANCAIS } from './lecons'
import { EX_F01_F06 } from './exercices-f01-f06'
import { EX_F07_F12 } from './exercices-f07-f12'
import { EX_COMPLEMENTS } from './exercices-complements'

export { LESSONS_FRANCAIS }
export const FRENCH_EXERCISES: FrenchExercise[] = [...EX_F01_F06, ...EX_F07_F12, ...EX_COMPLEMENTS]
export const LESSONS_FR: Lesson[] = LESSONS_FRANCAIS
