import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Pagination } from '../models/Pagination'

export class PaginationDto implements Pagination {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  perPage: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  totalItems: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  totalPages: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  currentItems: number

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  currentPage: number

  @ApiProperty({
    required: true,
    nullable: true,
    type: Number,
  })
  @IsNumber()
  prevPage: number | null

  @ApiProperty({
    required: true,
    nullable: true,
    type: Number,
  })
  @IsNumber()
  nextPage: number | null
}
