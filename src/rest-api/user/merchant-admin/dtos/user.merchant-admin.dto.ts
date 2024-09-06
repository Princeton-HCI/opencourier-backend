import { ApiProperty } from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/types'
import { IsEmail, IsEnum, IsInt } from 'class-validator'
import { UserEntity } from '../../../../domains/user/entities/user.entity'

export class UserMerchantAdminDto implements Partial<UserEntity> {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsInt()
  id: string

  @ApiProperty({
    required: true,
    enum: EnumUserRole,
  })
  @IsEnum(EnumUserRole)
  role: EnumUserRole[]

  @ApiProperty({
    required: true,
    nullable: true,
    type: String,
  })
  @IsEmail()
  email: string | null

  constructor(data: UserEntity) {
    this.id = data.id
    this.email = data.email
    this.role = data.role
  }
}
