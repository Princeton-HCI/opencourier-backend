import { ICourierCompensationForDeliveryInput } from './ICourierCompensationForDeliveryInput'
import { ICourierCompensationInput } from './ICourierCompensationInput'

export interface ICourierCompensationService {
  calculateCourierCompensation(input: ICourierCompensationInput): Promise<number>
  calculateCourierCompensationForDelivery(input: ICourierCompensationForDeliveryInput): Promise<number>
}
