import type { HealthSheet } from '../types'
import { FICHES_H01_H08 } from './fiches-h01-h08'
import { FICHES_H09_H16 } from './fiches-h09-h16'
import { FICHES_H17_H24 } from './fiches-h17-h24'

export const HEALTH_SHEETS: HealthSheet[] = [...FICHES_H01_H08, ...FICHES_H09_H16, ...FICHES_H17_H24]
