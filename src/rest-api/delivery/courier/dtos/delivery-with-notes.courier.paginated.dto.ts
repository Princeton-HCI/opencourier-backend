import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { PaginationDto } from '../../../../core/dtos/PaginationDto'
import { DeliveryWithNotesCourierDto } from './delivery-with-notes.courier.dto'
import { DeliveryWithNotesEntity } from '../delivery.courier.rest-api.service'

export class DeliveryWithNotesCourierPaginatedDto {
	@ApiProperty({
		required: true,
		type: () => [DeliveryWithNotesCourierDto],
	})
	@ValidateNested({ each: true })
	@Type(() => DeliveryWithNotesCourierDto)
	@Expose()
	data: DeliveryWithNotesCourierDto[]

	@ApiProperty({
		required: false,
		type: () => PaginationDto,
	})
	@ValidateNested()
	@Type(() => PaginationDto)
	@IsOptional()
	@Expose()
	pagination?: PaginationDto

	constructor(data: { data: DeliveryWithNotesEntity[]; pagination?: PaginationDto }) {
		this.data = data.data.map((order) => new DeliveryWithNotesCourierDto(order))
		this.pagination = data.pagination
	}
}
