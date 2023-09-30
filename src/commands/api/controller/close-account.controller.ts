import { Body, Controller, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CloseAccountCommand } from '../commands/close-account-command';
import { CloseAccountDto } from '../dto/close-account-dto';

@Controller('close-account')
export class CloseAccountController {
    constructor(private commandBus: CommandBus) { }

    @Delete()
    async openAccount(@Body() closeAccount: CloseAccountDto, @Res() res: Response) {
        try {
            await this.commandBus.execute(
                new CloseAccountCommand(
                    closeAccount.accountNumber

                )
            )
            res.status(HttpStatus.OK).json("Cuenta clausurada con éxito")
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
