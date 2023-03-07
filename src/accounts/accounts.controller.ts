import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@ApiTags('accounts')
@Controller('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/create')
  @ApiBody({
    type: CreateAccountDto,
  })
  async createAccount(@Body() account: CreateAccountDto) {
    return await this.accountsService.createAccount(account);
  }
}
