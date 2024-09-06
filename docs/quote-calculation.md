# Quote calculation

When a new delivery quote request comes into the system, we need to calculate a quote for the partner that requested it.

Since we don't know yet to which courier the delivery will be matched to. We need to create a quote range with `quoteFrom` and `quoteTo`.

The delivery calculations service offers a method `calculateDeliveryQuoteAmount` which takes `IDeliveryCalculationsInput` as input.

```TS
interface IDeliveryCalculationsInput {
	pickupLocation: { latitude: number; longitude: number }
	dropoffLocation: { latitude: number; longitude: number }
	orderTotalValue: number
	pickupReadyAt: Date
	timeOfDay: Date
}
```

and returns `DeliveryQuoteAmountResultWithFeePercentage` as output.

```TS
interface DeliveryQuoteAmountResultWithFeePercentage {
	quoteRangeFrom: number;
	quoteRangeTo: number;
	feePercentage: number;
}
```

These values are input into the delivery quote creation.

To be able to calculate the quote, the system offers a quote calculation module. `apps\backend\src\services\quote-calculation`.

The `QuoteCalculationModule` is imported into the `DeliveryCalculationModule`.

## Quote calculation module

Location: `apps\backend\src\services\quote-calculation`

This is the quote calculation service module where the quote range is calculated.

It offers a method `calculateDeliveryQuote`

```TS
async calculateDeliveryQuote(
	input: IQuoteCalculationInput
): Promise<DeliveryQuoteAmountResult>;
```

```
Input: IQuoteCalculationInput
pickupLocation: The pickup location of the delivery.
dropoffLocation: The dropoff location of the delivery.
pickupReadyAt: The timestamp when the delivery will be ready for pickup.

Output: DeliveryQuoteAmountResult
quoteRangeFrom: The from range.
quoteRangeTo: The to range.
feePercentage: The fee percentage that was applied.
```

### Switch implementation

The module offers a default implementation, but the implementation can be changed on runtime.

The implementation type can be set on the config table, key: `quoteCalculationType`.
Use the `ConfigDomainService.instanceConfig.setInstanceConfigSettings` method to set the quoteCalculationType.

The default quoteCalculationType if the config settings key doesn't exist is under the .env file: `DEFAULT_QUOTE_CALCULATION_TYPE`

If you have the admin-web setup:

- Go to `Instance configuration`
- Change the `Quote calculation type`

### Implementations:

Currently we have 3 implementations:

- `CustomQuoteCalculationService` -> `EnumQuoteCalculationType.CUSTOM`
  (This is mostly used in development and for testing)
  - It chooses a random distance.
  - Multiplies it by `DELIVERY_QUOTE_PER_MILE` that is set in the .env.
  - Returns the amount.
- `SimpleQuoteCalculationService` -> `EnumQuoteCalculationType.BY_DISTANCE`
  - Calculates the distance between the pickup and dropoff locations.
  - Multiplies the distance by the `DELIVERY_QUOTE_PER_MILE` that is set in the .env
  - Returns the amount.
- `SurgeQuoteCalculationService` -> `EnumQuoteCalculationType.SURGE`
  - Calculates the distance between the pickup and dropoff locations.
  - Multiplies the distance by the `DELIVERY_QUOTE_PER_MILE` that is set in the .env
  - Based on the time of day it changes readjusts the amount.
    - From 10PM to 6AM it multiplies the amount by 1.5 (50% more).
  - Returns the amount.

### Adding a new implementation

- Create a new class in `apps\backend\src\services\quote-calculation` that implements the `ICourierMatcherService` interface.
- Add the new implementation into `EnumQuoteCalculationType` -> `packages\shared-types\src\quote-calculation.ts`
- Add a human readable value in `QUOTE_CALCULATION_TYPE_TO_HUMAN` -> `packages\shared-types\src\quote-calculation.ts`
- Add the new implementation into the providers array in `QuoteCalculationModule` -> `apps\backend\src\services\quote-calculation\quote-calculation.module.ts`
- Set the new implementation on the config table. Check ([Switch implementation](#switch-implementation) section)
- Update the `quote-calculation.md` and add the implementation under [Implementations](#implementations)
