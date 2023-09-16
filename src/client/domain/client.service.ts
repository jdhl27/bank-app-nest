import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../api/dtos/create-client-dto';
import { Client } from './client';
import { ClientRepositoryImpl } from '../infrastructure/client.repositoryimpl';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async create(createClientDto: CreateClientDto) {
    const clientOld = await this.clientRepository.findClientByDni(
      createClientDto.dni,
    );

    if (clientOld) throw new Error('Ya existe el docmuento');

    const client = new Client();
    client.firstName = createClientDto.firstName;
    client.lastName = createClientDto.lastName;
    client.email = createClientDto.email;
    client.phone = createClientDto.phone;
    client.dni = createClientDto.dni;

    await this.clientRepository.createClient(client);
  }

  async findAll(): Promise<CreateClientDto[]> {
    return await this.clientRepository.findAllClients();
  }
}
