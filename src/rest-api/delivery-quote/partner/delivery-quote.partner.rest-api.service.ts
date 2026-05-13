import { Injectable, Logger } from '@nestjs/common'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import { NotFoundException } from 'src/errors'
import { CourierMatcherService } from 'src/services/courier-matcher/courier-matcher.service'
import { DeliverQuoteCreatePartnerInput } from './queries/delivery-quote-create.partner.input'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { GeoPosition } from 'src/shared-types'
import { normalizeRegionForPostGIS } from 'src/utils/geoJsonUtils'

export enum DeliveryQuoteCreationFailureReason {
  NO_AVAILABLE_COURIERS = 'NO_AVAILABLE_COURIERS',
  OUTSIDE_SERVICE_AREA = 'OUTSIDE_SERVICE_AREA',
}

type DeliveryQuoteCreationResult = {
  deliveryQuote: Awaited<ReturnType<DeliveryQuoteDomainService['create']>> | null
  failureReason?: DeliveryQuoteCreationFailureReason
}

@Injectable()
export class DeliveryQuotePartnerRestApiService {
  private readonly logger = new Logger(DeliveryQuotePartnerRestApiService.name)
  constructor(
    private deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private partnerDomainService: PartnerDomainService,
    private locationDomainService: LocationDomainService,
    private courierMatcherService: CourierMatcherService,
    private configDomainService: ConfigDomainService
  ) {}

  async getByIdOrThrow(deliveryQuoteId: string) {
    const deliveryQuote = await this.deliveryQuoteDomainService.getByIdOrThrow(deliveryQuoteId)

    return deliveryQuote
  }

  async create(partnerId: string, input: DeliverQuoteCreatePartnerInput): Promise<DeliveryQuoteCreationResult> {
    const partner = await this.partnerDomainService.getById(partnerId)

    if (!partner) {
      throw new NotFoundException('Partner not found')
    }

    const pickupLocation = await this.locationDomainService.findOrCreate({
      ...input.pickupAddress,
      latitude: input.pickupLatitude,
      longitude: input.pickupLongitude,
    })
    const dropoffLocation = await this.locationDomainService.findOrCreate({
      ...input.dropoffAddress,
      latitude: input.dropoffLatitude,
      longitude: input.dropoffLongitude,
    })

    const [pickupInServiceArea, dropoffInServiceArea] = await Promise.all([
      this.isInsideConfiguredServiceArea({
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      }),
      this.isInsideConfiguredServiceArea({
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      }),
    ])

    if (!pickupInServiceArea || !dropoffInServiceArea) {
      return {
        deliveryQuote: null,
        failureReason: DeliveryQuoteCreationFailureReason.OUTSIDE_SERVICE_AREA,
      }
    }

    const result = await this.courierMatcherService.findCourierForDelivery({
      pickupLocation: {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      },
      dropoffLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
      rejectedCourierIds: [],
    })

    if (!result) {
      return {
        deliveryQuote: null,
        failureReason: DeliveryQuoteCreationFailureReason.NO_AVAILABLE_COURIERS,
      }
    }

    const deliveryQuote = await this.deliveryQuoteDomainService.create(pickupLocation, dropoffLocation, partner, {
      pickupPhoneNumber: input.pickupPhoneNumber,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffDeadlineAt: input.dropoffDeadlineAt,
      orderTotalValue: input.orderTotalValue,
    })

    return {
      deliveryQuote,
    }
  }

  private async isInsideConfiguredServiceArea(position: GeoPosition): Promise<boolean> {
    const details = await this.configDomainService.instanceConfig.getDetails()
    const normalizedRegion = normalizeRegionForPostGIS(details.region)

    if (!normalizedRegion) {
      return true
    }

    if (normalizedRegion.type === 'Polygon') {
      return this.isPointInPolygon(position, normalizedRegion.coordinates)
    }

    if (normalizedRegion.type === 'MultiPolygon') {
      return normalizedRegion.coordinates.some((polygonCoordinates: number[][][]) =>
        this.isPointInPolygon(position, polygonCoordinates)
      )
    }

    this.logger.warn(`Unsupported region type in instance config: ${normalizedRegion.type as string}`)
    return true
  }

  private isPointInPolygon(position: GeoPosition, polygonCoordinates: number[][][]): boolean {
    const [outerRing, ...holes] = polygonCoordinates
    if (!outerRing) {
      return false
    }
    const isInOuterRing = this.isPointInRing(position, outerRing)

    if (!isInOuterRing) {
      return false
    }

    return !holes.some((hole) => this.isPointInRing(position, hole))
  }

  private isPointInRing(position: GeoPosition, ring: number[][]): boolean {
    if (ring.length < 3) {
      return false
    }

    const pointX = position.longitude
    const pointY = position.latitude
    let inside = false

    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const vertexI = ring[i]
      const vertexJ = ring[j]
      if (!vertexI || !vertexJ) {
        continue
      }

      const vertexIX = vertexI[0]
      const vertexIY = vertexI[1]
      const vertexJX = vertexJ[0]
      const vertexJY = vertexJ[1]
      if (
        vertexIX === undefined ||
        vertexIY === undefined ||
        vertexJX === undefined ||
        vertexJY === undefined
      ) {
        continue
      }

      const intersects =
        vertexIY > pointY !== vertexJY > pointY &&
        pointX < ((vertexJX - vertexIX) * (pointY - vertexIY)) / (vertexJY - vertexIY) + vertexIX

      if (intersects) {
        inside = !inside
      }
    }

    return inside
  }
}
