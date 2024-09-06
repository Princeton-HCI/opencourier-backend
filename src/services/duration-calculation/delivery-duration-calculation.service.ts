import { Injectable, Logger } from "@nestjs/common";
import { IDeliveryDurationCalculationInput } from "./interfaces/IDeliveryDurationCalculationInput";
import { IDeliveryDurationCalculationService } from "./interfaces/IDeliveryDurationCalculationService";
import { ModuleRef } from "@nestjs/core";
import { ConfigDomainService } from "src/domains/config/config.domain.service";
import { EnumDeliveryDurationCalculationType } from "./enums/delivery-duration-calculation-type.enum";

@Injectable()
export class DeliveryDurationCalculationService implements IDeliveryDurationCalculationService {
	private readonly logger = new Logger(DeliveryDurationCalculationService.name)

	constructor(
		private readonly moduleRef: ModuleRef,
		private configDomainService: ConfigDomainService
	) { }

	async calculateDeliveryDuration(input: IDeliveryDurationCalculationInput, durationCalculationType?: EnumDeliveryDurationCalculationType): Promise<number> {
		const implementation = await this.resolveClass(durationCalculationType);

		return implementation.calculateDeliveryDuration(input);
	}

	private async resolveClass(durationCalculationType?: EnumDeliveryDurationCalculationType): Promise<IDeliveryDurationCalculationService> {
		if (!durationCalculationType) {
			durationCalculationType = await this.getTypeFromDb();
		}

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!durationCalculationType) {
			throw new Error("Delivery duration calculation type not set");
		}

		try {
			const implementation = await this.moduleRef.resolve(durationCalculationType);

			// check if the implementation implements IDeliveryDurationCalculationService
			if (!implementation.calculateDeliveryDuration) {
				throw new Error(`Delivery duration calculation type ${durationCalculationType} does not implement IDeliveryDurationCalculationService`);
			}

			return implementation;
		} catch (error) {
			throw new Error(`Delivery duration calculation type not found for ${durationCalculationType}. Please check DeliveryDurationCalculationModule providers`);
		}
	}


	async getTypeFromDb(): Promise<EnumDeliveryDurationCalculationType> {
		const durationCalculationType = await this.configDomainService.instanceConfig.getDeliveryDurationCalculationTypeSetting();
		
		if (Object.values(EnumDeliveryDurationCalculationType).indexOf(durationCalculationType) < 0) {
			throw new Error(`Invalid default delivery duration calculation type: ${durationCalculationType}`);
		}

		return durationCalculationType;
	}
}
