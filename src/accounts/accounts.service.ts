import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(account: CreateAccountDto): Promise<HttpException> {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        email: account.email,
      },
    });

    if (foundAccount) {
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    }

    const passwordHashed = await bcrypt.hash(account.password, 10);

    const createdAccount = await this.prismaService.account.create({
      data: {
        name: account.name,
        email: account.email,
        password: passwordHashed,
      },
    });

    if (!createdAccount) {
      throw new HttpException(
        'Account not created.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException(
      'Account successfully created.',
      HttpStatus.CREATED,
    );
  }

  async findAccount(email: string): Promise<Account> {
    const foundAccount = await this.prismaService.account.findUnique({
      where: {
        email,
      },
    });

    return foundAccount;
  }
}
