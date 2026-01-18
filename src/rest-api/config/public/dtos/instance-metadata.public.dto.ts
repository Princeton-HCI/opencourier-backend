import { InstanceMetadata } from 'src/shared-types/index'
import { ApiProperty } from '@nestjs/swagger'

// Public DTO for instance metadata
export class InstanceMetadataPublicDto {
  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  link: string

  @ApiProperty({ type: String })
  websocketLink: string

  @ApiProperty({ type: Object, nullable: true })
  region: any

  @ApiProperty({ type: String })
  imageUrl: string

  @ApiProperty({ type: String, nullable: true })
  rulesUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  descriptionUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  termsOfServiceUrl: string | null

  @ApiProperty({ type: String, nullable: true })
  privacyPolicyUrl: string | null

  constructor(metadata: InstanceMetadata) {
    this.name = metadata.name
    this.link = metadata.link
    this.websocketLink = metadata.websocketLink
    this.region = metadata.region
    this.imageUrl = metadata.imageUrl
    this.rulesUrl = metadata.rulesUrl
    this.descriptionUrl = metadata.descriptionUrl
    this.termsOfServiceUrl = metadata.termsOfServiceUrl
    this.privacyPolicyUrl = metadata.privacyPolicyUrl
  }
}
