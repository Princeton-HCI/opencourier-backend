import { Injectable, Logger } from '@nestjs/common'
import { EnumDeliveryStatus, EnumLocationNoteActor, EnumUndeliverableAction } from '@prisma/types'
import { CantUpdateDeliveryStatusError, DeliveryNotFoundException } from 'src/errors'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'
import { DeliveryWhereArgs } from 'src/domains/delivery/types/delivery-where-args.type'
import { IDeliveryReportIssue } from 'src/domains/delivery/interfaces/IDeliveryReportIssue'
import { IDeliveryMarkAsDelivered } from 'src/domains/delivery/interfaces/IDeliveryMarkAsDelivered'
import { LocationNoteDomainService } from 'src/domains/location-note/location-note.domain.service'
import { IDeliveryMarkAsPickedUp } from 'src/domains/delivery/interfaces/IDeliveryMarkAsPickedUp'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'

export type DeliveryWithNotesEntity = DeliveryEntity & {
  dropoffLocationNotes: LocationNoteEntity[]
  pickupLocationNotes: LocationNoteEntity[]
}

@Injectable()
export class DeliveryRestApiCourierService {
  private readonly logger = new Logger(DeliveryRestApiCourierService.name)
  constructor(
    private deliveryDomainService: DeliveryDomainService,
    private locationNoteDomainService: LocationNoteDomainService
  ) {}

  async getById(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, otherFilters)

    return delivery
  }

  async getByIdOrThrow(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.deliveryDomainService.getByIdOrThrow(deliveryId, otherFilters)

    return delivery
  }

  async getMyNewDeliveries(courierId: string, page?: number, perPage?: number) {
    const args: DeliveryWhereArgs = {
      matchedCourierId: courierId,
      status: EnumDeliveryStatus.ASSIGNING_COURIER,
    }

    const deliveries = await this.deliveryDomainService.getMany(args, page, perPage)

    return deliveries
  }

  async getMyInProgressDeliveriesWithNotes(courierId: string, page?: number, perPage?: number) {
    const args: DeliveryWhereArgs = {
      courierId,
      status: {
        in: [EnumDeliveryStatus.ACCEPTED, EnumDeliveryStatus.DISPATCHED, EnumDeliveryStatus.PICKED_UP],
      },
    }

    const deliveries = await this.deliveryDomainService.getMany(args, page, perPage)

    const deliveryDropoffLocationIds = deliveries.data.map((delivery) => delivery.dropoffLocationId)
    const deliveryPickupLocationIds = deliveries.data.map((delivery) => delivery.pickupLocationId)

    const locationNotes = await this.locationNoteDomainService.getManyByLocationIds([
      ...deliveryDropoffLocationIds,
      ...deliveryPickupLocationIds,
    ])

    const deliveriesWithNotes = deliveries.data.map((delivery) => {
      const dropoffLocationNotes = locationNotes.filter((note) => note.locationId === delivery.dropoffLocationId)
      const pickupLocationNotes = locationNotes.filter((note) => note.locationId === delivery.pickupLocationId)

      return {
        ...delivery,
        dropoffLocationNotes,
        pickupLocationNotes,
      } as DeliveryWithNotesEntity
    })

    return {
      data: deliveriesWithNotes,
      pagination: deliveries.pagination,
    }
  }

  async getMyDoneDeliveries(courierId: string, page?: number, perPage?: number) {
    const args: DeliveryWhereArgs = {
      courierId,
      status: {
        notIn: [
          EnumDeliveryStatus.ASSIGNING_COURIER,
          EnumDeliveryStatus.ACCEPTED,
          EnumDeliveryStatus.DISPATCHED,
          EnumDeliveryStatus.PICKED_UP,
        ],
      },
    }

    const deliveries = await this.deliveryDomainService.getMany(args, page, perPage)

    return deliveries
  }

  async acceptDelivery(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryDomainService.acceptDelivery(deliveryId, courierId)

    return delivery
  }

  async rejectDelivery(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryDomainService.rejectDelivery(deliveryId, courierId)

    return delivery
  }

  async reportIssueWithTheDelivery(deliveryId: string, courierId: string, input: IDeliveryReportIssue) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.update(deliveryId, {
      undeliverableAction: input.undeliverableAction as EnumUndeliverableAction,
      undeliverableReason: input.undeliverableReason,
    })

    return updatedDelivery
  }

  async cancelDelivery(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    //TODO: add some check to see if the delivery can be cancelled
    if (delivery.status !== EnumDeliveryStatus.PICKED_UP) {
      throw new CantUpdateDeliveryStatusError('Delivery can not be cancelled')
    }

    const updatedDelivery = await this.deliveryDomainService.cancelDelivery(deliveryId)

    return updatedDelivery
  }

  async markAsDelivered(deliveryId: string, courierId: string, input: IDeliveryMarkAsDelivered) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.markAsDelivered(deliveryId, {
      imageData: input.imageData,
      imageName: input.imageName,
      imageType: input.imageType,
    })

    // Add the location note for the delivery
    await this.locationNoteDomainService.create({
      note: input.note,
      deliveryId,
      courierId,
      actor: EnumLocationNoteActor.COURIER,
      locationId: delivery.dropoffLocationId,
    })

    return updatedDelivery
  }

  async markAsDispatched(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.markAsDispatched(deliveryId)

    return updatedDelivery
  }

  async markAsPickedUp(deliveryId: string, courierId: string, input: IDeliveryMarkAsPickedUp) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.markAsPickedUp(deliveryId)

    // Add the location note for the delivery
    await this.locationNoteDomainService.create({
      note: input.note,
      deliveryId,
      courierId,
      actor: EnumLocationNoteActor.COURIER,
      locationId: delivery.pickupLocationId,
    })

    return updatedDelivery
  }

  async markAsOnTheWay(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryDomainService.getById(deliveryId, { courierId })

    if (!delivery) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.markAsOnTheWay(deliveryId)

    return updatedDelivery
  }
}
