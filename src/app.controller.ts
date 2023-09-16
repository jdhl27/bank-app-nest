import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Req() request: Request, @Res() response: Response) {
    response.status(HttpStatus.OK).send();
  }
}
