import { Module } from '@nestjs/common';
import { OpenAccountController } from './api/controller/open-account.controller';
import { CloseAccountController } from './api/controller/close-account.controller';
import { DepositFundsController } from './api/controller/deposit-funds.controller';
import { WhitdrawController } from './api/controller/whitdraw.controller';
import { OpenAccountHandlerService } from './api/commands/open-account-handler.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CloseAccountHandlerService } from './api/commands/close-account-handler.service';
import { EventStoreRepositoryService } from './insfrastructure/event-store-repository/event-store-repository.service';
import { AccountEventStoreService } from './insfrastructure/account-event-store.service';

const EVENT_STORE_REPOSITORY = "EventStoreRepository"

@Module({
  imports: [CqrsModule],
  controllers: [OpenAccountController, CloseAccountController, DepositFundsController, WhitdrawController],
  providers: [OpenAccountHandlerService, CloseAccountHandlerService, EventStoreRepositoryService, { provide: EVENT_STORE_REPOSITORY, useClass: EventStoreRepositoryService }, AccountEventStoreService]
})
export class CommandsModule { }
