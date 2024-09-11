import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { NewDeliveryCourierDto } from './new-delivery.courier.dto'
import { NewDeliveryCourier } from '../types/new-delivery.courier.type'

export class NewDeliveriesCourierPaginatedDto {
  @ApiProperty({
    required: true,
    type: () => [NewDeliveryCourierDto],
  })
  @ValidateNested({ each: true })
  @Type(() => NewDeliveryCourierDto)
  @Expose()
  data: NewDeliveryCourierDto[]

  @ApiProperty({
    required: false,
    type: () => PaginationDto,
  })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  @Expose()
  pagination?: PaginationDto

  constructor(data: { data: NewDeliveryCourier[]; pagination?: PaginationDto }) {
    this.data = data.data.map((order) => new NewDeliveryCourierDto(order))
    this.pagination = data.pagination
  }
}
