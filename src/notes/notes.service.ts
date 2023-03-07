import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dtos/create-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNote(
    accountId: string,
    note: CreateNoteDto,
  ): Promise<HttpException> {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!foundAccount) {
      throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);
    }

    const createdNote = await this.prismaService.note.create({
      data: {
        title: note.title,
        text: note.text,
        accountId,
      },
    });

    if (!createdNote) {
      throw new HttpException(
        'Note not created.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException('Note successfully created.', HttpStatus.CREATED);
  }

  async findNotes(accountId: string): Promise<Note[]> {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!foundAccount) {
      throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);
    }

    const foundNotes = await this.prismaService.note.findMany({
      where: {
        accountId,
      },
    });

    return foundNotes;
  }
}
