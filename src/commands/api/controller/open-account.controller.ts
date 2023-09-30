import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';;
import { Response } from 'express';
import { OpenAccountDto } from '../dto/open-account-dto';
import { OpenAccountCommand } from '../commands/open-account-command';
import { v4 } from "uuid";
import { CommandBus } from '@nestjs/cqrs';

@Controller('open-account')
export class OpenAccountController {

    constructor(private commandBus: CommandBus) { }

    @Post()
    async openAccount(@Body() openAccount: OpenAccountDto, @Res() res: Response) {
        try {
            await this.commandBus.execute(
                new OpenAccountCommand(
                    v4(),
                    openAccount.accountHolder,
                    openAccount.accountType,
                    openAccount.openingBalance
                )
            )
            res.status(HttpStatus.CREATED).json("Cuenta abierta con éxito")
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            })
        }
    }
}
