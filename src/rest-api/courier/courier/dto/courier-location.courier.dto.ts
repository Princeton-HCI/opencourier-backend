import { ApiProperty } from '@nestjs/swagger'
import { GeoPosition } from 'src/shared-types'

export class CourierLocationCourierDto {
  @ApiProperty({ type: Number })
  latitude: number

  @ApiProperty({ type: Number })
  longitude: number

  constructor(data: GeoPosition) {
    this.latitude = data.latitude
    this.longitude = data.longitude
  }
}
