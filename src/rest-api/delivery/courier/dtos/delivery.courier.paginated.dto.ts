import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { DeliveryCourierDto } from './delivery.courier.dto'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

export class DeliveryCourierPaginatedDto {
	@ApiProperty({
		required: true,
		type: () => [DeliveryCourierDto],
	})
	@ValidateNested({ each: true })
	@Type(() => DeliveryCourierDto)
	@Expose()
	data: DeliveryCourierDto[]

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
		this.data = data.data.map((order) => new DeliveryCourierDto(order))
		this.pagination = data.pagination
	}
}
