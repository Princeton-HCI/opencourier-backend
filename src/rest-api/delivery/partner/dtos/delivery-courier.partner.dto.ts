import { ApiProperty } from '@nestjs/swagger'
import { EnumSettingVehicleType } from '@prisma/types'
import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

export class DeliveryCourierPartnerDto implements Partial<CourierEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ type: String })
  firstName: string

  @ApiProperty({ type: String })
  lastName: string

  @ApiProperty({ enum: EnumSettingVehicleType, nullable: true })
  vehicleType: EnumSettingVehicleType | null

  @ApiProperty({ type: String, nullable: true })
  phoneNumber: string | null

  constructor(delivery: DeliveryEntity, courier: CourierEntity, courierSettings: CourierSettingEntity) {
    this.id = courier.id
    this.firstName = courier.firstName
    this.lastName = courier.lastName
    this.phoneNumber = courier.phoneNumber

    this.vehicleType = courierSettings.vehicleType
  }
}
