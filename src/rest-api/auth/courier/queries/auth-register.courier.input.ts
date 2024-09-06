import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ICourierRegister } from 'src/domains/auth/interfaces/ICourierRegister'

export class AuthRegisterCourierInput implements ICourierRegister {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  email: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  firstName: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  lastName: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  password: string
}
