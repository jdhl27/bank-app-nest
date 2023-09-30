import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from './open-account-command';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandlerService implements ICommandHandler<OpenAccountCommand>{

    execute(command: OpenAccountCommand): Promise<any> {
        console.info("OpenAccountHandlerService/execute");
        console.info(command);
        
        
        throw new Error('Method not implemented.');
    }

}
