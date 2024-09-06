import { IDeliveryAddressDriftCalculationInput } from './IDeliveryAddressDriftCalculationInput'

export interface IQuoteToDeliveryConversionService {
  isValidDeliveryLocationDrift(input: IDeliveryAddressDriftCalculationInput): Promise<boolean>
}
