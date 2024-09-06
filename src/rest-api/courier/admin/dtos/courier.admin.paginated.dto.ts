import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { CourierAdminDto } from './courier.admin.dto'
import { CourierEntity } from '../../../../domains/courier/entities/courier.entity'

export class CourierPaginatedAdminDto {
  @ApiProperty({
    required: true,
    type: () => [CourierAdminDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CourierAdminDto)
  @Expose()
  data: CourierAdminDto[]

  @ApiProperty({
    required: false,
    type: () => PaginationDto,
  })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  @Expose()
  pagination?: PaginationDto

  constructor(data: { data: CourierEntity[]; pagination?: PaginationDto }) {
    this.data = data.data.map((courier) => new CourierAdminDto(courier))
    this.pagination = data.pagination
  }
}
