import { ApiProperty } from '@nestjs/swagger'
import { EnumCountryCode } from '@prisma/types'
import { LocationEntity } from 'src/domains/location/entities/location.entity'

export class LocationCourierDto implements Partial<LocationEntity> {
  @ApiProperty({ type: String })
  id!: string
	
	@ApiProperty({ type: String, nullable: true })
	addressLine1: string | null
	
	@ApiProperty({ type: String, nullable: true })
	addressLine2: string | null
	
	@ApiProperty({ type: String, nullable: true })
	city: string | null
	
	@ApiProperty({ type: String, nullable: true })
	state: string | null
	
	@ApiProperty({ type: String, nullable: true })
	street: string | null
	
	@ApiProperty({ type: String, nullable: true })
	zipCode: string | null
	
	@ApiProperty({ enum: EnumCountryCode, nullable: true })
	countryCode: EnumCountryCode
	
	@ApiProperty({ type: String, nullable: true })
	stateCode: string | null
	
	@ApiProperty({ type: String, nullable: true })
	houseNumber: string | null
	
	@ApiProperty({ type: Number })
	longitude: number
	
	@ApiProperty({ type: Number })
	latitude: number

	@ApiProperty({ type: String, nullable: true })
	formattedAddress: string | null

	@ApiProperty({ type: Date })
	createdAt: Date

	constructor(data: LocationEntity) {
		this.id = data.id;

		this.addressLine1 = data.addressLine1;
		this.addressLine2 = data.addressLine2;
		this.city = data.city;
		this.state = data.state;
		this.street = data.street;
		this.zipCode = data.zipCode;
		this.countryCode = data.countryCode;
		this.stateCode = data.stateCode;
		this.houseNumber = data.houseNumber;
		this.longitude = data.longitude;
		this.latitude = data.latitude;
		this.formattedAddress = data.formattedAddress;

		this.createdAt = data.createdAt;
  }
}
