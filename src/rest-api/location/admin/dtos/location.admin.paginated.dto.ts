import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { LocationAdminDto } from './location.admin.dto'
import { PaginatedResult } from 'src/core/models/Pagination'
import { LocationEntity } from 'src/domains/location/entities/location.entity'

export class LocationAdminPaginatedDto implements PaginatedResult<LocationAdminDto> {
  @ApiProperty({
    required: true,
    type: () => [LocationAdminDto],
  })
  @ValidateNested({ each: true })
  @Type(() => LocationAdminDto)
  @Expose()
  data: LocationAdminDto[]

  @ApiProperty({
    required: false,
    type: () => PaginationDto,
  })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  @Expose()
  pagination?: PaginationDto

  constructor(data: { data: LocationEntity[]; pagination?: PaginationDto }) {
    this.data = data.data.map((location) => new LocationAdminDto(location))
    this.pagination = data.pagination
  }
}
