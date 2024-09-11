import { DeliveryQuoteAmountResult } from 'src/services/quote-calculation/types/delivery-quote-amount-result.type'
import { IDeliveryCalculationsInput } from './IDeliveryCalculationsInput'
import { IDeliveryAmountsCalculationsInput } from './IDeliveryAmountsCalculationsInput'
import { IDeliveryAmountsCalculationsResult } from './IDeliveryAmountsCalculationsResult'

export interface IDeliveryCalculationService {
  calculateDeliveryQuoteAmount(input: IDeliveryCalculationsInput): Promise<DeliveryQuoteAmountResult>
  calculateDeliveryQuoteDistance(input: IDeliveryCalculationsInput): Promise<number>
  calculateDeliveryQuoteExpiration(input: IDeliveryCalculationsInput): Promise<Date>
  calculateDeliveryQuoteDeliveryDuration(input: IDeliveryCalculationsInput): Promise<number>
  calculateDeliveryQuoteDeliveryPickupDuration(input: IDeliveryCalculationsInput): Promise<number>
  calculateDropoffEta(input: IDeliveryCalculationsInput): Promise<Date | null>
  calculateDeliveryAmountsForMatchedCourier(
    input: IDeliveryAmountsCalculationsInput
  ): Promise<IDeliveryAmountsCalculationsResult>
}
