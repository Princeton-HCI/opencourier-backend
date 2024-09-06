import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { DeliveryAdminDto } from './delivery.admin.dto'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'

export class DeliveryAdminPaginatedDto {
	@ApiProperty({
		required: true,
		type: () => [DeliveryAdminDto],
	})
	@ValidateNested({ each: true })
	@Type(() => DeliveryAdminDto)
	@Expose()
	data: DeliveryAdminDto[]

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
		this.data = data.data.map((delivery) => new DeliveryAdminDto(delivery))
		this.pagination = data.pagination
	}
}
