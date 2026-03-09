import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ManualRequestAddressAdminInput } from './manual-request-address.admin.input'

export enum ManualRequestPackageSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class ManualRequestQuoteAdminInput {
  @ApiProperty({ required: false, type: String, description: 'Partner ID to scope this request to. If omitted the only/first partner is used.' })
  @IsString()
  @IsOptional()
  partnerId?: string

  // ── Pickup ────────────────────────────────────────────────────────────────

  @ApiProperty({ required: true, type: String })
  @IsString()
  pickupName: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  pickupPhoneNumber: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  pickupBusinessName: string

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsString()
  @IsOptional()
  pickupNotes?: string | null

  @ApiProperty({ required: true, type: ManualRequestAddressAdminInput })
  @Type(() => ManualRequestAddressAdminInput)
  @ValidateNested()
  pickupAddress: ManualRequestAddressAdminInput

  @ApiProperty({ required: true, type: Number, description: 'Pickup latitude for distance calculation' })
  @IsNumber()
  pickupLatitude: number

  @ApiProperty({ required: true, type: Number, description: 'Pickup longitude for distance calculation' })
  @IsNumber()
  pickupLongitude: number

  @ApiProperty({ required: false, type: Date, nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  pickupReadyAt?: Date | null

  @ApiProperty({ required: false, type: Date, nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  pickupDeadlineAt?: Date | null

  // ── Dropoff ───────────────────────────────────────────────────────────────

  @ApiProperty({ required: true, type: String })
  @IsString()
  dropoffName: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  dropoffPhoneNumber: string

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsString()
  @IsOptional()
  dropoffBusinessName?: string | null

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsString()
  @IsOptional()
  dropoffNotes?: string | null

  @ApiProperty({ required: true, type: ManualRequestAddressAdminInput })
  @Type(() => ManualRequestAddressAdminInput)
  @ValidateNested()
  dropoffAddress: ManualRequestAddressAdminInput

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  dropoffLatitude: number

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  dropoffLongitude: number

  @ApiProperty({ required: false, type: Date, nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dropoffReadyAt?: Date | null

  @ApiProperty({ required: false, type: Date, nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dropoffDeadlineAt?: Date | null

  // ── Package / Order ───────────────────────────────────────────────────────

  @ApiProperty({ required: false, type: String, nullable: true, description: 'Description of the package contents' })
  @IsString()
  @IsOptional()
  packageDescription?: string | null

  @ApiProperty({ required: false, enum: ManualRequestPackageSize, nullable: true })
  @IsString()
  @IsOptional()
  packageSize?: ManualRequestPackageSize | null

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsString()
  @IsOptional()
  specialInstructions?: string | null

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsString()
  @IsOptional()
  orderReference?: string | null

  @ApiProperty({ required: false, type: Number, nullable: true, description: 'Order total value in cents' })
  @IsNumber()
  @IsOptional()
  orderTotalValue?: number | null

  @ApiProperty({ required: false, type: Object, nullable: true, description: 'Adapter-compatible metadata extension' })
  @IsOptional()
  metadata?: Record<string, unknown> | null
}
