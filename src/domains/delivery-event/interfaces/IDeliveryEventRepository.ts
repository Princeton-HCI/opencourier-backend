import { IDeliveryEventCreateInput } from "./IDeliveryEventCreateInput";
import { DeliveryEventEntity } from "../entities/delivery-event.entity";

export interface IDeliveryEventRepository {
	create(data: IDeliveryEventCreateInput): Promise<DeliveryEventEntity>
}
