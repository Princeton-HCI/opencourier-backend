import { ApiProperty } from '@nestjs/swagger'
import { EnumCourierDeliverySetting, EnumCourierStatus } from '@prisma/types'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'

export class CourierCourierDto implements Partial<CourierEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ type: String, nullable: true })
  node_uri!: string | null

  @ApiProperty({ type: String })
  firstName: string

  @ApiProperty({ type: String })
  lastName: string

  @ApiProperty({ type: String, nullable: true })
  phoneNumber: string | null

  @ApiProperty({ type: String, enum: EnumCourierStatus })
  status: EnumCourierStatus

  @ApiProperty({ type: String, enum: EnumCourierDeliverySetting })
  deliverySetting: EnumCourierDeliverySetting

  @ApiProperty({ type: String })
  userId: string

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: CourierEntity) {
    this.id = data.id
    this.node_uri = data.node_uri
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.phoneNumber = data.phoneNumber
    this.status = data.status
    this.deliverySetting = data.deliverySetting
    this.userId = data.userId
    this.createdAt = data.createdAt
  }
}
