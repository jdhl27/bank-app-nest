import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventModel } from 'src/core/events/event-model';
import { EventStore } from 'src/core/infrastructure/event-store';
import { EventStoreRepository } from '../domain/eventstore-repository';

@Injectable()
export class AccountEventStoreService implements EventStore {

    constructor(
        @Inject("EventStoreRepository")
        private readonly eventStoreRepository: EventStoreRepository
    ) { }

    async saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number): Promise<void> {


        const eventStream = await this.eventStoreRepository.findByAggregateIdentifier(aggregateId)

        if (expectedVersion != -1 && eventStream[eventStream.length - 1].version !== expectedVersion) {
            throw new Error("Error de Concurrencia")
        }

        events.forEach((event: BaseEvent) => {

            const { constructor }: any = Object.getPrototypeOf(event)

            expectedVersion++

            event.version = expectedVersion

            const eventModel: EventModel = new EventModel()
            eventModel.aggregateIdentifier = aggregateId
            eventModel.aggregateType = "Account"
            eventModel.eventType = constructor.name
            eventModel.version = expectedVersion
            eventModel.eventData = event
            eventModel.timeStamp = new Date()

            this.eventStoreRepository.save(eventModel)
        })

    }

    async getEvents(aggregateId: string): Promise<BaseEvent[]> {

        const eventStream = await this.eventStoreRepository.findByAggregateIdentifier(aggregateId)

        if (!eventStream || !eventStream.length) {
            throw new HttpException("El número de cuenta proporcionado es incorrecto", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return eventStream.map((aggregate: EventModel) => {
            (aggregate.eventData as any).constructor = { name: aggregate.eventType }
            aggregate.eventData = Object.assign(Object.create(aggregate.eventData), aggregate.eventData)

        })
    }
}
