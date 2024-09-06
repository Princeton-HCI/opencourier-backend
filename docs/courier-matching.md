# Courier-Delivery matching system

The courier-delivery matching system is a component of the courier backend server.\
It is created in a way to be easily altered and offer new implementations.

The matching service is split in to services.

- Delivery matching service
- Courier matcher service

## Delivery matching service

Location: `apps\backend\src\services\delivery-matching`

This is the delivery matching service module where the core of the delivery matching feature lives

It offers a method `matchDeliveryToCourier`

```TS
async matchDeliveryToCourier(
	deliveryId: string,
	matcherType: EnumCourierMatcherType = EnumCourierMatcherType.STATIC
): Promise<{
	courier: CourierEntity,
	distance: number
}>
```

```
Input:
deliveryId: The id of the delivery we want to match.
matcherType: The courier matcher we want to be used.

Output:
courier: The matched courier.
distance: The distance between the pickup location and the current courier location.
```

## Courier matcher service

Location: `apps\backend\src\services\courier-matcher`

The courier matching service is the service that carries the logic of matching a courier to a delivery.

It can have multiple implementations that can be swapped on runtime.

It offers an interface that requires the definition of a method:

```TS
interface ICourierMatcherService {
	matchDeliveryToCourier(
		input: ICourierMatcherInput
	): Promise<ICourierMatcherResult | null>
}
```

Each implementation that currently exists and will be created in the future needs to implement this interface.

The base matcher service that is imported into the `DeliveryMatchingService` is `CourierMatcherService` which is a switcher service that will switch the matching request to the desired matcher.

### Switch matcher

The module offers a default matcher, but the matcher can be changed on runtime.

The matcher type can be se on the config table, key: `courierMatcherType`.
Use the `ConfigDomainService.instanceConfig.setInstanceConfigSettings` method to set the courierMatcherType.

The default courierMatcherType if the config settings key doesn't exist is under the .env file: `DEFAULT_COURIER_MATCHER_TYPE`

If you have the admin-web setup:

- Go to `Instance configuration`
- Change the `Courier matcher type`

### Matchers:

Currently we have 3 matcher implementations:

- `NearestCourierMatcherService`
  - Matches the delivery to the nearest available courier
- `CourierSeniorityMatcherService`
  - Matches the delivery to the most senior available courier
    - Seniority is based on the date the courier joined.
- `StaticCourierMatcherService`
  - A static matcher that only returns a static courierId
  - Mostly used as an example and for developer purposes.

### Adding a new matcher

- Create a new class in `apps\backend\src\services\courier-matcher` that implements the `ICourierMatcherService` interface.
- Add the new matcher into `EnumCourierMatcherType` -> `packages\shared-types\src\courier-matching.ts`
- Add a human readable value in `COURIER_MATCHER_TYPE_TO_HUMAN` -> `packages\shared-types\src\courier-matching.ts`
- Add the new matcher into the providers array in `CourierMatcherModule` -> `apps\backend\src\services\courier-matcher\courier-matcher.module.ts`
- Set the new matcher on the config table. Check ([Switch matcher](#switch-matcher) section)
- Update the `courier-matching.md` and add the implementation under [Implementations](#implementations)
