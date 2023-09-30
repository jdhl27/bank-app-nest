import { AccountType } from "src/common/dto/account-type"

export class OpenAccountDto {
    accountHolder: string
    accountType: AccountType
    openingBalance: number
}
