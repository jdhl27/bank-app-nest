import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type EventDocument = HydratedDocument<EventModel>

@Schema({collection: 'eventStore'})
export class EventModel {

    @Prop()
    public name: string

    @Prop()
    public timeStamp: Date

    @Prop()
    public aggregateIdentifier: string

    @Prop()
    public aggregateType: string

    @Prop()
    public eventType: string

    @Prop()
    public version: number

    @Prop()
    public eventData: BaseEvent
}

export const EventShema = SchemaFactory.createForClass(EventModel)