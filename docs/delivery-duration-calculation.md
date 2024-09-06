# Delivery duration calculation

When a new delivery quote request comes into the system, we need to calculate the delivery duration.

Since we don't know yet to which courier the delivery will be matched to. We will calculate the duration from the pickup location to the dropoff location.

The delivery calculations service offers a method `calculateDeliveryQuoteDeliveryDuration` which takes `IDeliveryCalculationsInput` as input.
``` TS
interface IDeliveryCalculationsInput {
	pickupLocation: { latitude: number; longitude: number }
	dropoffLocation: { latitude: number; longitude: number }
	orderTotalValue: number
	pickupReadyAt: Date
	timeOfDay: Date
}
```
and returns the duration in minutes as a `number` as output.

This values is input into the delivery quote creation.

To be able to calculate the duration, the system offers a duration calculation module. `apps\backend\src\services\duration-calculation`.

The `DeliveryDurationCalculationModule` is imported into the `DeliveryCalculationModule`.

## Delivery duration calculation module

Location: `apps\backend\src\services\duration-calculation` 

This is the delivery duration calculation service module where the time to delivery from pickup to dropoff is calculated.

It offers a method `calculateDeliveryDuration`
```TS
async calculateDeliveryDuration(
	input: IDeliveryDurationCalculationInput
): Promise<number>;
```

```
Input: IDeliveryDurationCalculationInput
pickupLocation: The pickup location of the delivery.
dropoffLocation: The dropoff location of the delivery.

Output: number
The number of minutes the delivery from pickup to dropoff will approximately take.
```

### Switch implementation
The module offers a default implementation, but the implementation can be changed on runtime.

The implementation type can be set on the config table, key: `deliveryDurationCalculationType`.
Use the `ConfigDomainService.instanceConfig.setInstanceConfigSettings` method to set the deliveryDurationCalculationType.

The default deliveryDurationCalculationType if the config settings key doesn't exist is under the .env file: `DEFAULT_DELIVERY_DURATION_CALCULATION_TYPE`

If you have the admin-web setup:
- Go to `Instance configuration`
- Change the `Delivery duration calculation type`

### Implementations:
Currently we have 1 implementation:
- `SimpleDeliveryDurationCalculationService` -> `EnumDeliveryDurationCalculationType.SIMPLE`
 (This is mostly used in development and for testing)
	- It calculates the distance between pickup and dropoff location (Uses the GeoCalculationModule)
	- Multiplies it by 2 (minutes per kilometer).
	- Returns the number of minutes.

### Adding a new implementation

- Create a new class  in `apps\backend\src\services\delivery-duration` that implements the `ICourierMatcherService` interface.
- Add the new implementation into `EnumDeliveryDurationCalculationType` -> `packages\shared-types\src\delivery-duration.ts`
- Add a human readable value in `DELIVERY_DURATION_CALCULATION_TYPE_TO_HUMAN` ->  `packages\shared-types\src\delivery-duration.ts`
- Add the new implementation into the providers array in `DeliveryDurationCalculationModule` -> `apps\backend\src\services\delivery-duration\delivery-duration-calculation.module.ts`
- Set the new implementation on the config table. Check ([Switch implementation](#switch-implementation) section)
- Update the `delivery-duration.md` and add the implementation under [Implementations](#implementations)
