import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  text?: string;
}
