import { Module } from '@nestjs/common';
import { OpenAccountController } from './api/controller/open-account.controller';
import { CloseAccountControllerTsController } from './api/controller/close-account.controller.ts.controller';
import { DepositFundsControllerTsController } from './api/controller/deposit-funds.controller.ts.controller';
import { WhitdrawControllerTsController } from './api/controller/whitdraw.controller.ts.controller';
import { OpenAccountHandlerService } from './api/commands/open-account-handler.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CloseAccountHandlerService } from './api/commands/close-account-handler.service';

@Module({
  imports: [CqrsModule],
  controllers: [OpenAccountController, CloseAccountControllerTsController, DepositFundsControllerTsController, WhitdrawControllerTsController],
  providers: [OpenAccountHandlerService, CloseAccountHandlerService]
})
export class CommandsModule { }
