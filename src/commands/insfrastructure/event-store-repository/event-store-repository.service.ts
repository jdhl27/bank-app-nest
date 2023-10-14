import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventStoreRepository } from 'src/commands/domain/eventstore-repository';
import { EventModel } from 'src/core/events/event-model';

@Injectable()
export class EventStoreRepositoryService implements EventStoreRepository {

    constructor(
        @InjectModel(EventModel.name)
        private eventModel: Model<EventModel>) { }

    async save(event: EventModel): Promise<void> {
        
        await new this.eventModel(event).save()
    }

    async findByAggregateIdentifier(aggregateIdentifier: string): Promise<EventModel[]> {
        return await this.eventModel.find({aggregateIdentifier: aggregateIdentifier}).exec()
    }
}
