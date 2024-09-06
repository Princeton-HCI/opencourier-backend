import { ApiProperty } from '@nestjs/swagger'
import { EnumLocationNoteReactionType } from '@prisma/types'
import { IsEnum } from 'class-validator'

export class LocationNoteReactCourierInput {
  @ApiProperty({
    required: true,
    enum: EnumLocationNoteReactionType,
  })
  @IsEnum(EnumLocationNoteReactionType)
  reaction: EnumLocationNoteReactionType
}
