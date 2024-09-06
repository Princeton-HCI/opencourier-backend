import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { LocationNoteCourierDto } from './location-note.courier.dto'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'

export class LocationNoteCourierPaginatedDto {
  @ApiProperty({
    required: true,
    type: () => [LocationNoteCourierDto],
  })
  @ValidateNested({ each: true })
  @Type(() => LocationNoteCourierDto)
  @Expose()
  data: LocationNoteCourierDto[]

  @ApiProperty({
    required: false,
    type: () => PaginationDto,
  })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  @Expose()
  pagination?: PaginationDto

  constructor(data: { data: LocationNoteEntity[]; pagination?: PaginationDto }) {
    this.data = data.data.map((order) => new LocationNoteCourierDto(order))
    this.pagination = data.pagination
  }
}
