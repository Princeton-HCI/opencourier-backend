import { Partner } from '@prisma/types'

export class PartnerEntity implements Partner {
  id: string
  name: string
  logo: string | null
  phoneNumber: string | null
  webhookUrl: string | null

  userId: string | null

  createdAt: Date
  updatedAt: Date

  constructor(data: Partner) {
    this.id = data.id

    this.name = data.name
    this.logo = data.logo
    this.phoneNumber = data.phoneNumber
    this.webhookUrl = data.webhookUrl

    this.userId = data.userId

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
