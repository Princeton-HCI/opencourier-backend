import { IDeliveryDurationCalculationInput } from './IDeliveryDurationCalculationInput'

export interface IDeliveryDurationCalculationService {
  calculateDeliveryDuration(input: IDeliveryDurationCalculationInput): Promise<number>
}
