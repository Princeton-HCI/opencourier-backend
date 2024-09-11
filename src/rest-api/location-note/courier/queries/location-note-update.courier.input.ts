import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ILocationNoteUpdate } from 'src/domains/location-note/interfaces/ILocationNoteUpdate'

export class LocationNoteUpdateCourierInput implements Omit<ILocationNoteUpdate, 'actor' | 'courierId'> {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  note: string
}
