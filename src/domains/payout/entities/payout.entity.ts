import { EnumPayoutStatus, Payout } from '@prisma/types'

export class PayoutEntity implements Payout {
  id: string
  amount: number
  description: string | null
  statementDescriptor: string | null
  status: EnumPayoutStatus
  paymentId: string
  courierId: string | null

  arrivalDate: Date

  constructor(data: Payout) {
    this.id = data.id

    this.amount = data.amount
    this.description = data.description
    this.statementDescriptor = data.statementDescriptor
    this.status = data.status
    this.paymentId = data.paymentId
    this.courierId = data.courierId

    this.arrivalDate = data.arrivalDate
  }
}
