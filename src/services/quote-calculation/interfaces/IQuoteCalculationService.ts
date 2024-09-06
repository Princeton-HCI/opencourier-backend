import { DeliveryQuoteAmountResult } from "../types/delivery-quote-amount-result.type";
import { IQuoteCalculationInput } from "./IQuoteCalculationInput";

export abstract class IQuoteCalculationService {
	abstract calculateDeliveryQuote(input: IQuoteCalculationInput): Promise<DeliveryQuoteAmountResult>;
}
