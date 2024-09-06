# Courier compensation

When the delivery is matched/assigned to a courier, we need to calculate the: 
- totalCompensation (The amount that the courier will make)
- fee (The fee that the system takes)
- totalCost (The total cost for the partner)

The delivery calculations service offers a method `calculateDeliveryAmountsForMatchedCourier` which takes `IDeliveryAmountsCalculationsInput` as input.
``` TS
interface IDeliveryAmountsCalculationsInput {
	deliveryId: string;
}
```
It uses the deliveryId to fetch the delivery from the database and it uses the `matchedCourierId` field on the delivery entity as the courier that we will be calculating for.

To be able to calculate the cost of the delivery for the matched courier, the system offers a courier compensation module. `apps\backend\src\services\courier-compensation`.

The `CourierCompensationModule` is imported into the `DeliveryCalculationModule`.

## Courier compensation module

Location: `apps\backend\src\services\courier-compensation` 

This is the courier compensation service module where the compensation is calculated for the matched courier on the given delivery

It offers a method `calculateCourierCompensationForDelivery`
``` TS
async calculateCourierCompensationForDelivery(
	input: ICourierCompensationForDeliveryInput
): Promise<number>;
```

```
Input:
courierId: The courier that we want to calculate for.
deliveryId: The delivery that we want the calculation against.

Output:
amount: the compensation that the courier will need to get.
```

### Switch implementation
The module offers a default implementation, but the implementation can be changed on runtime.

The implementation type can be set on the config table, key: `courierCompensationCalculationType`.
Use the `ConfigDomainService.instanceConfig.setInstanceConfigSettings` method to set the courierCompensationCalculationType.

The default courierCompensationCalculationType if the config settings key doesn't exist is under the .env file: `DEFAULT_COURIER_COMPENSATION_CALCULATION_TYPE`

If you have the admin-web setup:
- Go to `Instance configuration`
- Change the `Courier compensation calculation type`

### Implementations:
Currently we have 1 implementation:
- `SimpleCourierCompensationService`
	- Returns the amount from the `quoteFrom` field from the deliveryQuote entity which is connected to the delivery. `delivery->deliveryQuoteId`


### Adding a new implementation

- Create a new class  in `apps\backend\src\services\courier-compensation` that implements the `ICourierMatcherService` interface.
- Add the new implementation into `EnumCourierCompensationCalculationType` -> `packages\shared-types\src\courier-compensation-calculation.ts`
- Add a human readable value in `COURIER_DELIVERY_COMPENSATION_TYPE_TO_HUMAN` ->  `packages\shared-types\src\courier-compensation-calculation.ts`
- Add the new implementation into the providers array in `CourierCompensationModule` -> `apps\backend\src\services\courier-compensation\courier-compensation.module.ts`
- Set the new implementation on the config table. Check ([Switch implementation](#switch-implementation) section)
- Update the `courier-compensation.md` and add the implementation under [Implementations](#implementations)
