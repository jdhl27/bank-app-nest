import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateClientDto } from '../dtos/create-client-dto';
import { Response } from 'express';
import { ClientService } from 'src/client/domain/client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async create(
    @Body() createClientDTO: CreateClientDto,
    @Res() response: Response,
  ) {
    try {
      await this.clientService.create(createClientDTO);
      response.status(201).send('Cliente creado con exito');
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      response.status(200).send(await this.clientService.findAll());
    } catch (error) {
      throw new HttpException(error, HttpStatus.NO_CONTENT);
    }
  }
}
