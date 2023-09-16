import { Module } from '@nestjs/common';
import { ClientController } from './api/controllers/client.controller';
import { ClientService } from './domain/client.service';
import { ClientRepositoryImpl } from './infrastructure/client.repositoryimpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './domain/client';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService, ClientRepositoryImpl],
})
export class ClientModule {}
