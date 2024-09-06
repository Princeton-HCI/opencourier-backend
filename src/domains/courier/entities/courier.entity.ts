import { Courier, EnumCourierDeliverySetting, EnumCourierStatus, EnumStripeAccountStatus } from '@prisma/types'

export class CourierEntity implements Courier {
  id: string
  node_uri: string | null
  firstName: string
  lastName: string
  phoneNumber: string | null
  status: EnumCourierStatus
  deliverySetting: EnumCourierDeliverySetting
  rejectedOffers: string[]

  stripeAccountId: string | null
  stripeAccountStatus: EnumStripeAccountStatus

  userId: string
  createdAt: Date
  updatedAt: Date

  constructor(data: Courier) {
    this.id = data.id
    this.node_uri = data.node_uri
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.phoneNumber = data.phoneNumber
    this.status = data.status
    this.deliverySetting = data.deliverySetting
    this.rejectedOffers = data.rejectedOffers
    this.stripeAccountId = data.stripeAccountId
    this.stripeAccountStatus = data.stripeAccountStatus
    this.userId = data.userId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
