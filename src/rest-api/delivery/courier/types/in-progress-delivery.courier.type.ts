import { DeliveryEntity } from "src/domains/delivery/entities/delivery.entity"
import { LocationNoteWithReactionCounts } from "./location-note-with-reaction-counts.type"
import { LocationEntity } from "src/domains/location/entities/location.entity"

export type InProgressDeliveryCourier = DeliveryEntity & {
	pickupLocation: LocationEntity;
	dropoffLocation: LocationEntity;
	dropoffLocationNotes: LocationNoteWithReactionCounts[]
	pickupLocationNotes: LocationNoteWithReactionCounts[]
}
