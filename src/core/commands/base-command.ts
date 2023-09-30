import { Message } from "../messages/message";

export class BaseCommand extends Message {

    constructor(
        public id: string
    ) {
        super(id)
    }
}
