import { ApiProperty } from '@nestjs/swagger'
import { Barcode, DeliveryVerification, Identification, Pincode, SignatureRequirement } from 'src/shared-types/index'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator'

export class DeliverySignatureRequirementInput implements SignatureRequirement {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  enabled: boolean

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  collectSignerName: boolean

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  collectSignerRelationship: boolean
}

export class DeliveryIdentificationInput implements Identification {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  minAge: number

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  noSobrietyCheck: boolean
}

export class DeliveryVerificationBarcodeInput implements Barcode {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  value: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  type: string
}

export class DeliveryPincodeInput implements Pincode {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  enabled: boolean

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  value: string
}

export class DeliveryVerificationInput implements DeliveryVerification {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  signature: boolean

  @ApiProperty({
    required: true,
    type: DeliverySignatureRequirementInput,
  })
  @Type(() => DeliverySignatureRequirementInput)
  @ValidateNested()
  signatureRequirement: DeliverySignatureRequirementInput

  @ApiProperty({
    required: true,
    type: [DeliveryVerificationBarcodeInput],
  })
  @Type(() => DeliveryVerificationBarcodeInput)
  @ValidateNested({ each: true })
  barcodes: DeliveryVerificationBarcodeInput[]

  @ApiProperty({
    required: true,
    type: DeliveryIdentificationInput,
  })
  @Type(() => DeliveryIdentificationInput)
  @ValidateNested()
  identification: DeliveryIdentificationInput

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  picture: boolean

  @ApiProperty({
    required: false,
    type: DeliveryPincodeInput,
  })
  @Type(() => DeliveryPincodeInput)
  @ValidateNested()
  pincode?: Pincode
}
