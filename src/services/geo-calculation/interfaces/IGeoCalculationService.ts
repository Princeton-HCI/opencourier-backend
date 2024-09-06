import { IGeoCalculationInput } from './IGeoCalculationInput'

export interface IGeoCalculationService {
  calculateDistance(input: IGeoCalculationInput): Promise<number>
}
