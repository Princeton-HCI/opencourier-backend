import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsEmail, IsEnum } from 'class-validator'
import { EnumUserRole } from '@prisma/types'
import { UserEntity } from '../../../../domains/user/entities/user.entity'
import { CourierCourierDto } from 'src/rest-api/courier/courier/dto/courier.courier.dto'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { UserCourierDto } from './user.courier.dto'

export class UserWithCourierCourierDto implements UserCourierDto {
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

  @ApiProperty({
    required: true,
    type: CourierCourierDto,
  })
  courier: CourierCourierDto

  constructor(data: UserEntity, courier: CourierEntity) {
    this.id = data.id
    this.email = data.email
    this.role = data.role

    this.courier = new CourierCourierDto(courier)
  }
}
