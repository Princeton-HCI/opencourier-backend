import { Injectable, Logger } from '@nestjs/common'
import {
  Courier,
  CourierSetting,
  EnumCourierDeliverySetting,
  EnumCourierStatus,
  EnumDeliveryStatus,
  Prisma,
} from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { ICourierRepository } from '../../domains/courier/interfaces/ICourierRepository'
import { CourierEntity } from '../../domains/courier/entities/courier.entity'
import { ICourierCreate } from '../../domains/courier/interfaces/ICourierCreate'
import { Exact } from '../../types'
import { createPaginator } from '../../rest-api/Paginator'
import { ICourierUpdate } from '../../domains/courier/interfaces/ICourierUpdate'
import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'
import { ICourierUpdateLocation } from 'src/domains/courier/interfaces/ICourierUpdateLocation'
import { ICourierFindNearestArgs } from 'src/domains/courier/interfaces/ICourierFindNearestArgs'
import { ICourierFindBySeniorityArgs } from 'src/domains/courier/interfaces/ICourierFindBySeniorityArgs'
import { GeoPosition } from 'src/shared-types'

@Injectable()
export class CourierRepository extends EntityRepository implements ICourierRepository {
  private readonly logger = new Logger(CourierRepository.name)

  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async hasActiveDelivery(courierId: string): Promise<boolean> {
    const delivery = await this.prisma.delivery.findFirst({
      where: {
        courierId: courierId,
        status: {
          in: ['CREATED', 'DISPATCHED', 'PICKED_UP']
        }
      }
    })
    
    return !!delivery
  }

  async create(data: Exact<ICourierCreate>) {
    const result = await this.prisma.courier.create({
      data: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })

    return this.toDomain(result)
  }

  async updateById(courierId: string, data: ICourierUpdate) {
    const result = await this.prisma.courier.update({
      where: {
        id: courierId,
      },
      data: {
        ...data,
      },
    })

    return this.toDomain(result)
  }

  async updateCurrentLocationById(courierId: string, data: ICourierUpdateLocation) {
    const courier = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    const { latitude, longitude } = data

    const coord = `POINT(${longitude} ${latitude})`
    const queryRaw = Prisma.sql`
      UPDATE "Courier"
      SET "currentLocation" = ST_GeomFromText(${coord}, 4326)
      WHERE "id" = ${courier.id}
    `

    await this.prisma.$queryRaw(queryRaw)
  }

  async getCurrentLocation(courierId: string) {
    const queryRaw = Prisma.sql`
      SELECT ST_AsGeoJSON("currentLocation") AS "currentLocation"
      FROM "Courier"
      WHERE "id" = ${courierId}
      LIMIT 1
    `

    const results = await this.prisma.$queryRaw<Array<{ currentLocation: string }>>(queryRaw)

    if (results.length === 0 || !results[0]) {
      return null
    }

    try {
      const courierLocation = JSON.parse(results[0].currentLocation)
      const coordinates = courierLocation.coordinates

      return {
        latitude: coordinates[1],
        longitude: coordinates[0],
      }
    } catch (e) {
      console.log(e)
      this.logger.error(`Error parsing courier location: ${e}`)
      return null
    }
  }

  async updateStatus(courierId: string, status: EnumCourierStatus) {
    const courier = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    if (courier.status === status) {
      return
    }

    await this.prisma.courier.update({
      where: {
        id: courierId,
      },
      data: {
        status,
      },
    })
  }

  async updateDeliverySetting(courierId: string, deliverySetting: EnumCourierDeliverySetting) {
    const courier = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    if (courier.deliverySetting === deliverySetting) {
      return
    }

    await this.prisma.courier.update({
      where: {
        id: courierId,
      },
      data: {
        deliverySetting,
      },
    })
  }

  async findNearestAvailableCourier(args: ICourierFindNearestArgs) {
    const { location, excludeCourierIds, maxDistanceInKM } = args

    const deliveryOngoingStatuses = [
      EnumDeliveryStatus.CREATED,
      EnumDeliveryStatus.DISPATCHED,
      EnumDeliveryStatus.PICKED_UP,
    ]
    const courierActiveStatuses = [EnumCourierStatus.ONLINE, EnumCourierStatus.LAST_CALL]

    const ongoingDeliveryRawSubQuery = Prisma.sql`
      SELECT 1
      FROM "Delivery"
      WHERE "Delivery"."courierId" = "Courier"."id"
      AND "Delivery"."status"::text IN (${Prisma.join(deliveryOngoingStatuses, ',')})
    `

    const locationGeographyPointSql = Prisma.sql`ST_SetSRID(ST_MakePoint(${location.longitude}, ${location.latitude}), 4326)::geography`

    const distanceRawSubQuery = Prisma.sql`ST_Distance(
      "currentLocation"::geography,
      ${locationGeographyPointSql}
    )`

    const maxDistanceInMeters = maxDistanceInKM ? maxDistanceInKM * 1000 : null

    const query = Prisma.sql`
      SELECT 
        "id",
        ST_AsGeoJSON("currentLocation") AS "currentLocation",
        ${distanceRawSubQuery} AS distance

      FROM "Courier"
      WHERE "currentLocation" IS NOT NULL
      -- Add the condition to check if the courier is available
      AND "status"::text in (${Prisma.join(courierActiveStatuses, ',')})
      AND NOT EXISTS (${ongoingDeliveryRawSubQuery})

      -- Exclude courier ids
      ${
        excludeCourierIds && excludeCourierIds.length > 0
          ? Prisma.sql`AND "id" NOT IN(${Prisma.join(excludeCourierIds, ',')})`
          : Prisma.empty
      }

      -- Max distance condition
      ${maxDistanceInMeters ? Prisma.sql`AND ${distanceRawSubQuery} <= ${maxDistanceInMeters}` : Prisma.empty}

      -- Add bounding box for performance
      ${
        maxDistanceInMeters
          ? Prisma.sql`AND "currentLocation" && _ST_Expand(${locationGeographyPointSql}, ${maxDistanceInMeters})`
          : Prisma.empty
      }

      ORDER BY distance
      LIMIT 1
    `

    const result = await this.prisma.$queryRaw<Array<{ id: string; distance: number; currentLocation: string }>>(query)

    if (result.length === 0 || !result[0]) {
      return null
    }

    const courierId = result[0].id
    const distance = result[0].distance
    const currentLocation = JSON.parse(result[0].currentLocation)

    const courier = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    return {
      courier: this.toDomain(courier),
      distance,
      courierLocation: {
        latitude: currentLocation.coordinates[0],
        longitude: currentLocation.coordinates[1],
      },
      pickupLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    }
  }

  async findMostSeniorAvailableCourier(args: ICourierFindBySeniorityArgs) {
    const { location, excludeCourierIds, maxDistanceInKM } = args

    const deliveryOngoingStatuses = [
      EnumDeliveryStatus.CREATED,
      EnumDeliveryStatus.DISPATCHED,
      EnumDeliveryStatus.PICKED_UP,
    ]
    const courierActiveStatuses = [EnumCourierStatus.ONLINE, EnumCourierStatus.LAST_CALL]

    const ongoingDeliveryRawSubQuery = Prisma.sql`
      SELECT 1
      FROM "Delivery"
      WHERE "Delivery"."courierId" = "Courier"."id"
      AND "Delivery"."status"::text IN (${Prisma.join(deliveryOngoingStatuses, ',')})
    `

    const locationGeographyPointSql = Prisma.sql`ST_SetSRID(ST_MakePoint(${location.longitude}, ${location.latitude}), 4326)::geography`

    const distanceRawSubQuery = Prisma.sql`ST_Distance(
      "currentLocation"::geography,
      ${locationGeographyPointSql}
    )`

    const maxDistanceInMeters = maxDistanceInKM ? maxDistanceInKM * 1000 : null

    // Order the courier by seniority
    // Currently seniority is based on the created date of the courier
    const query = Prisma.sql`
      SELECT 
        "id",
        ST_AsGeoJSON("currentLocation") AS "currentLocation",
        ${distanceRawSubQuery} AS distance,
        "createdAt" as seniority

      FROM "Courier"
      WHERE "currentLocation" IS NOT NULL
      -- Add the condition to check if the courier is available
      AND "status"::text in (${Prisma.join(courierActiveStatuses, ',')})
      AND NOT EXISTS (${ongoingDeliveryRawSubQuery})

      -- Exclude courier ids
      ${
        excludeCourierIds && excludeCourierIds.length > 0
          ? Prisma.sql`AND "id" NOT IN(${Prisma.join(excludeCourierIds, ',')})`
          : Prisma.empty
      }
      
      -- Max distance condition
      ${maxDistanceInMeters ? Prisma.sql`AND ${distanceRawSubQuery} <= ${maxDistanceInMeters}` : Prisma.empty}

      -- Add bounding box for performance
      ${
        maxDistanceInMeters
          ? Prisma.sql`AND "currentLocation" && _ST_Expand(${locationGeographyPointSql}, ${maxDistanceInMeters})`
          : Prisma.empty
      }

      -- Order by seniority
      ORDER BY seniority ASC

      LIMIT 1
    `

    const result = await this.prisma.$queryRaw<Array<{ id: string; distance: number; currentLocation: string }>>(query)

    if (result.length === 0 || !result[0]) {
      return null
    }

    const courierId = result[0].id
    const distance = result[0].distance
    const currentLocation = JSON.parse(result[0].currentLocation)

    const courier = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    return {
      courier: this.toDomain(courier),
      distance,
      courierLocation: {
        latitude: currentLocation.coordinates[0],
        longitude: currentLocation.coordinates[1],
      },
      pickupLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    }
  }

  async findManyPaginated(page?: number, perPage?: number) {
    const paginator = createPaginator<Courier, Prisma.CourierFindManyArgs, Prisma.CourierDelegate>()
    const result = await paginator(this.prisma.courier, { orderBy: { createdAt: 'desc' } }, { page, perPage })

    return {
      ...result,
      data: this.toDomainMany(result.data),
    }
  }

  async findById(courierId: string) {
    const result = await this.prisma.courier.findUnique({
      where: {
        id: courierId,
      },
    })

    return result ? this.toDomain(result) : null
  }

  async findByIdOrThrow(courierId: string) {
    const result = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
    })

    return this.toDomain(result)
  }

  async findByIdWithSettings(courierId: string) {
    const result = await this.prisma.courier.findUniqueOrThrow({
      where: {
        id: courierId,
      },
      include: {
        settings: true,
      },
    })

    return {
      courier: this.toDomain(result),
      courierSettings: new CourierSettingEntity(result.settings as CourierSetting),
    }
  }

  async findByUserId(userId: string) {
    const result = await this.prisma.courier.findUniqueOrThrow({
      where: {
        userId,
      },
    })

    const courierLocation = await this.getCurrentLocation(result.id)

    return this.toDomain({
      ...result,
      currentLocation: courierLocation,
    })
  }

  private toDomain(data: Courier & { currentLocation?: GeoPosition | null }) {
    return new CourierEntity(data)
  }

  private toDomainMany(data: Courier[]) {
    return data.map((d) => this.toDomain(d))
  }
}
