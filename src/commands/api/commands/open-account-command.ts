import { AccountType } from "src/common/dto/account-type";
import { BaseCommand } from "src/core/commands/base-command";

export class OpenAccountCommand extends BaseCommand {

    constructor(
        id: string,
        public accountHolder: string,
        public accountType: AccountType,
        public openingBalance: number
    ){
        super(id)
    }
}
