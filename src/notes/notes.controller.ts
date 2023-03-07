import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dtos/create-note.dto';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/create/:accountId')
  @ApiBody({
    type: CreateNoteDto,
  })
  async createNote(
    @Param('accountId') accountId: string,
    @Body() note: CreateNoteDto,
  ) {
    return await this.notesService.createNote(accountId, note);
  }
}
