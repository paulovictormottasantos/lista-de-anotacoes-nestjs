import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
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

  @Get('/find/:accountId')
  async findNotes(@Param('accountId') accountId: string) {
    return await this.notesService.findNotes(accountId);
  }

  @Patch('/update/:noteId')
  @ApiBody({
    type: UpdateNoteDto,
  })
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() note: UpdateNoteDto,
  ) {
    return await this.notesService.updateNote(noteId, note);
  }
}
