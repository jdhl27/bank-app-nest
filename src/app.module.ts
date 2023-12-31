import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/domain/client';
import { CommandsModule } from './commands/commands.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { QuerysModule } from './querys/querys.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClientModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:21071/eventStorage"),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'bank',
      entities: [Client],
      synchronize: true,
    }),
    CommandsModule,
    CommonModule,
    CoreModule,
    QuerysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
