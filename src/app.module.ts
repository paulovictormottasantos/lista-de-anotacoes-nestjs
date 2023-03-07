import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsModule } from './accounts/accounts.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, AccountsModule, NotesModule]
})
export class AppModule {}
