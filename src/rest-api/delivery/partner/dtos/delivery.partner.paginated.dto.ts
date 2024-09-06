import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { PaginatedResult } from 'src/core/models/Pagination'
import { DeliveryPartnerDto } from './delivery.partner.dto'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

export class DeliveryPartnerPaginatedDto implements PaginatedResult<DeliveryPartnerDto> {
	@ApiProperty({
		required: true,
		type: () => [DeliveryPartnerDto],
	})
	@ValidateNested({ each: true })
	@Type(() => DeliveryPartnerDto)
	@Expose()
	data: DeliveryPartnerDto[]

	@ApiProperty({
		required: false,
		type: () => PaginationDto,
	})
	@ValidateNested()
	@Type(() => PaginationDto)
	@IsOptional()
	@Expose()
	pagination?: PaginationDto

	constructor(data: { data: DeliveryEntity[]; pagination?: PaginationDto }) {
		this.data = data.data.map((location) => new DeliveryPartnerDto(location))
		this.pagination = data.pagination
	}
}
