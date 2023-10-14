import { EventModel } from "src/core/events/event-model";

export interface EventStoreRepository{

    save(event: EventModel): Promise<void>

    findByAggregateIdentifier(aggregateIdentifier: string): Promise<EventModel[]>

}