import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsEmail, IsEnum } from 'class-validator'
import { EnumUserRole } from '@prisma/types'
import { UserEntity } from '../../../../domains/user/entities/user.entity'

export class UserPartnerDto implements Partial<UserEntity> {
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
    this.email = data.email
    this.role = data.role
    this.id = data.id
  }
}
