/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoRepository } from 'typeorm';
import { Client } from '../domain/client';
import { ClientRepository } from '../domain/client.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly typeOrmRepository: MongoRepository<Client>,
  ) {}

  createClient(client: Client): Promise<void> {
    return new Promise((resolve, reject) => {
      const newClient = this.typeOrmRepository.create(client);
      this.typeOrmRepository.save(newClient);
      resolve();
    });
  }

  findClientByDni(dni: string): Promise<Client> {
    return new Promise((resolve, reject) => {
      resolve(
        this.typeOrmRepository.findOne({
          where: {
            dni: dni,
          },
        }),
      );
    });
  }

  findAllClients(): Promise<Client[]> {
    return new Promise((resolve, reject) => {
      resolve(this.typeOrmRepository.find());
    });
  }
}
